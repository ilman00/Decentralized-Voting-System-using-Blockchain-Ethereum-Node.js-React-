import { NextResponse } from 'next/server'
import { getElectionState, setElectionState } from '@/lib/electionState'

export async function GET() {
  const { electionStatus } = getElectionState()
  return NextResponse.json({ status: electionStatus })
}

export async function POST(req) {
  const { status } = await req.json()

  if (!['start', 'stop'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  const newStatus = status === 'start' ? 'ongoing' : 'stopped'
  setElectionState(newStatus)

  return NextResponse.json({ status: newStatus, message: `Election ${newStatus}` })
}
