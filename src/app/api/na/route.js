// app/api/na/route.js
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import District from '@/models/Districts'

export async function POST(req) {
  try {
    const body = await req.json()
    const { district, naNumber, naName } = body

    if (!district || !naNumber) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 })
    }

    await dbConnect()

    // Push new NA into the district's NAs array
    const updated = await District.findOneAndUpdate(
      { name: district },
      {
        $push: {
          NAs: { naNumber, naName }
        }
      },
      { new: true }
    )

    if (!updated) {
      return NextResponse.json({ success: false, error: 'District not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: updated })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
