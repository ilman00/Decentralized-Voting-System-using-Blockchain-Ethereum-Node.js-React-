// app/api/districts/[districtName]/route.js
import { NextResponse } from 'next/server'
import Districts from '@/models/Districts'
import dbConnect from '@/lib/dbConnect'

export async function GET(_, { params }) {
  try {
    await dbConnect()

    const districtName = params.districtsName
    const district = await Districts.findOne({
      name: new RegExp(`^${districtName}$`, 'i'),
    })

    if (!district) {
      return NextResponse.json({ error: 'District Not Found' }, { status: 404 })
    }

    // Convert objects to arrays of strings
    const na = district.NAs.map((item) => item.naNumber)
    const pk = district.PKs.map((item) => item.pkNumber)

    return NextResponse.json({ na, pk }, { status: 200 })
  } catch (err) {
    console.error('API Error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
