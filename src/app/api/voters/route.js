import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import Voter from '@/models/Voter';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const query = {};

    if (searchParams.get('name')) {
      query.name = { $regex: searchParams.get('name'), $options: 'i' };
    }
    if (searchParams.get('cnic')) {
      query.cnic = searchParams.get('cnic');
    }
    if (searchParams.get('na')) {
      query.na = searchParams.get('na');
    }
    if (searchParams.get('pk')) {
      query.pk = searchParams.get('pk');
    }

    const voters = await Voter.find(query).lean();

    return NextResponse.json({ voters });
  } catch (err) {
    console.error('Error fetching voters:', err);
    return NextResponse.json({ error: 'Failed to fetch voters' }, { status: 500 });
  }
}
