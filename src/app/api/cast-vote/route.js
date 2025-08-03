import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Candidate from '@/models/Condidate';
import Voter from '@/models/Voter';
import mongoose from 'mongoose';

export async function POST(req) {
  await dbConnect();

  try {
    const { cnic, candidateId, type } = await req.json(); // type: 'na' or 'pk'
    console.log('Received vote:', { cnic, candidateId, type });

    // Step 1: Fetch the voter
    const voter = await Voter.findOne({ cnic });
    if (!voter) return NextResponse.json({ message: 'Voter not found' }, { status: 404 });

    if (!voter.voted) voter.voted = { na: false, pk: false };

    // Step 2: Check if already voted
    if ((type === 'na' && voter.voted.na) || (type === 'pk' && voter.voted.pk)) {
      return NextResponse.json({ message: `Already voted for ${type.toUpperCase()}!` }, { status: 400 });
    }

    // Step 3: Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
      return NextResponse.json({ message: 'Invalid candidate ID' }, { status: 400 });
    }

    // Step 4: Update candidate vote count
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return NextResponse.json({ message: 'Candidate not found' }, { status: 404 });

    candidate.voteCount = (candidate.voteCount || 0) + 1;
    await candidate.save();

    // Step 5: Update voter's voted flag
    if (type === 'na') voter.voted.na = true;
    if (type === 'pk') voter.voted.pk = true;
    await voter.save();

    return NextResponse.json({ message: 'Vote casted successfully!' });

  } catch (error) {
    console.error('Cast vote error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
