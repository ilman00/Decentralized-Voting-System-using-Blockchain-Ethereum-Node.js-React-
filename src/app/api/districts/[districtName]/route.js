// app/api/districts/[districtName]/route.js
import { NextResponse } from 'next/server'
import Districts from '@/models/Districts'
import dbConnect from '@/lib/dbConnect'

export async function GET(request, context) {
  try {
    await dbConnect()

    const districtName =  context.params.districtName  // ✅ fixed typo here
    const district = await Districts.findOne({
      name: new RegExp(`^${districtName}$`, 'i'), // case-insensitive
    })

    if (!district) {
      return NextResponse.json({ error: 'District Not Found' }, { status: 404 })
    }

    const NAs = district.NAs.map((item) => item.naNumber)
    const PKs = district.PKs.map((item) => item.pkNumber)

    return NextResponse.json({ NAs, PKs, district }, { status: 200 })
  } catch (err) {
    console.error('API Error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
