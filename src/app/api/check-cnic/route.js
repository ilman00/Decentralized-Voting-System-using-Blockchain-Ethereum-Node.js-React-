// app/api/check-cnic/route.js
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect' // Replace with your actual DB connection utility
import Voter from '@/models/Voter' // Adjust according to your user model

export async function POST(req) {
  try {
    const { cnic } = await req.json()
    if (!cnic || cnic.length !== 13) {
      return NextResponse.json({ exists: false, message: 'Invalid CNIC' }, { status: 400 })
    }

    await dbConnect()
    const user = await Voter.findOne({ cnic })
    console.log(user);
    if (user) {
      return NextResponse.json({ exists: true, user })
    } else {
      return NextResponse.json({ exists: false, message: 'CNIC not found' })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ exists: false, message: 'Server error' }, { status: 500 })
  }
}
