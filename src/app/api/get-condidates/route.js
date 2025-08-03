// /app/api/candidates/route.js
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Candidate from '@/models/Condidate'

export async function GET(req) {
    await dbConnect()
    const { searchParams } = new URL(req.url)

    const constituency = searchParams.get('constituency')
    console.log(constituency);
    if (!constituency) {
        return NextResponse.json({ error: 'Missing params' }, { status: 400 })
    }

    const candidates = await Candidate.find({
        seat: constituency,
    }).lean()

    console.log(candidates[0]);
    const result = candidates.map((c) => ({
        id: c._id.toString(),
        name: c.name,
        symbol: c.imageUrl
    }))

    return NextResponse.json(result)
}
