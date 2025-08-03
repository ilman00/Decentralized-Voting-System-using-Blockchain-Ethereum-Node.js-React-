// src/app/api/voters/[cnic]/route.js
import { NextResponse } from 'next/server'
import Voter from '@/models/Voter'
import dbConnect from '@/lib/dbConnect'

export async function GET(req, context) {
    try {
        await dbConnect()

        const { cnic } = context.params

        const voter = await Voter.findOne({ cnic }).lean()

        if (!voter) {
            return NextResponse.json({ error: 'Voter not found' }, { status: 404 })
        }
        console.log(voter);
        return NextResponse.json(voter)
    } catch (err) {
        return NextResponse.json(err)
    }

}
