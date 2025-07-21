import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import District from '@/models/Districts'

export async function GET() {
  try {
    await dbConnect()

    const districts = await District.find({}, 'name') // only get the district names

    return NextResponse.json({
      success: true,
      districts: districts.map(d => d.name),
    })
  } catch (error) {
    console.error('Error fetching districts:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch districts' }, { status: 500 })
  }
}
