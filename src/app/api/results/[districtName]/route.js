import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Candidate from '@/models/Condidate'

export async function GET(req, { params }) {
  await dbConnect()
  const { districtName } = params

  const candidates = await Candidate.find({ district: districtName }).lean()

  const grouped = {}

  candidates.forEach(c => {
    if (!c.seat) return // skip if seat missing
    if (!grouped[c.seat]) grouped[c.seat] = []
    grouped[c.seat].push({
      name: c.name,
      symbol: c.imageUrl,
      votes: c.voteCount ?? 0,
    })
  })

  console.log("Grouped Results:", grouped)

  return NextResponse.json({ success: true, results: grouped })
}
