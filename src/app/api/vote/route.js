// /app/api/vote/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Candidate from '@/models/Condidate';
import Voter from '@/models/Voter';

export async function POST(req) {
  await dbConnect();

  const { candidateId, cnic, type } = await req.json();

  if (!candidateId || !cnic || !type) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 });
  }

  // Step 1: Check if voter exists
  const voter = await Voter.findOne({ cnic });
  if (!voter) {
    return NextResponse.json({ error: 'Voter not found' }, { status: 404 });
  }

  // Step 2: Check if already voted for that seat type
  if ((type === 'na' && voter.hasVotedNA) || (type === 'pk' && voter.hasVotedPK)) {
    return NextResponse.json({ error: 'Already voted' }, { status: 403 });
  }

  // Step 3: Update candidate's vote count
  const candidate = await Candidate.findById(candidateId);
  if (!candidate) {
    return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
  }

  candidate.voteCount = (candidate.voteCount || 0) + 1;
  await candidate.save();

  // Step 4: Update voter to mark as voted
  if (type === 'na') voter.hasVotedNA = true;
  else voter.hasVotedPK = true;

  await voter.save();

  return NextResponse.json({ success: true });
}
