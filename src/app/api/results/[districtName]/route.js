// src/app/api/results/[districtName]/route.js
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Candidate from '@/models/Condidate'

export async function GET(req, { params }) {
  await dbConnect()
  const { districtName } = params

  const candidates = await Candidate.find({ district: districtName }).lean()

  // Group by seat (e.g., NA-1, PK-2)
  const grouped = {}

  candidates.forEach(c => {
    if (!grouped[c.seat]) grouped[c.seat] = []
    grouped[c.seat].push({
      name: c.name,
      symbol: c.picture,
      votes: c.votes,
    })
  })
  console.log(candidates);
  return NextResponse.json({ success: true, results: grouped })
}
