import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import Subadmin from '@/models/Subadmin'

export async function POST(req) {
  await dbConnect()
  const { name, email, password, district } = await req.json()

  if (!name || !email || !password || !district) {
    return NextResponse.json({ success: false, message: 'All fields are required.' }, { status: 400 })
  }

  try {
    const exists = await Subadmin.findOne({ email })
    if (exists) {
      return NextResponse.json({ success: false, message: 'Email already in use.' }, { status: 400 })
    }

    const subadmin = new Subadmin({ name, email, password, district })
    await subadmin.save()

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 })
  }
}
