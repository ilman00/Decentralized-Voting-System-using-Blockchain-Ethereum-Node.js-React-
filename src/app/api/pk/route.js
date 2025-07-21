import { NextResponse } from 'next/server'
import connectDB from '@/lib/dbConnect'
import District from '@/models/Districts'

export async function POST(req) {
  try {
    await connectDB()
    const { districtName, pkNumber, pkName } = await req.json()

    if (!districtName || !pkNumber) {
      return NextResponse.json({ error: 'District name and PK number are required.' }, { status: 400 })
    }

    const updatedDistrict = await District.findOneAndUpdate(
      { name: districtName },
      {
        $push: {
          PKs: {
            pkNumber,
            pkName
          }
        }
      },
      { new: true }
    )

    if (!updatedDistrict) {
      return NextResponse.json({ error: 'District not found.' }, { status: 404 })
    }

    return NextResponse.json({ message: 'PK added successfully', district: updatedDistrict }, { status: 200 })
  } catch (error) {
    console.error('Error adding PK:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
