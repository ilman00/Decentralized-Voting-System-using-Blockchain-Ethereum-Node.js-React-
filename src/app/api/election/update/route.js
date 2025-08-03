// app/api/election/update/route.js

import { getElectionState, setElectionState } from '@/lib/electionState'

export async function GET() {
  const { electionStatus, startTime, endTime } = getElectionState()
  return Response.json({ status: electionStatus, startTime, endTime })
}

export async function POST(req) {
  const body = await req.json()
  const { status, startTime, endTime } = body
  const { electionStatus } = getElectionState()

  if (status === 'start') {
    if (electionStatus === 'ongoing') {
      return Response.json({ error: 'Election already started' }, { status: 400 })
    }
    if (!startTime || !endTime) {
      return Response.json({ error: 'Start and End time required' }, { status: 400 })
    }

    setElectionState('ongoing', startTime, endTime)

    // Optional: Auto-stop logic (e.g., with setTimeout)
    const end = new Date(endTime)
    const now = new Date()
    const delay = end - now
    if (delay > 0) {
      setTimeout(() => {
        const currentState = getElectionState()
        if (currentState.electionStatus === 'ongoing') {
          setElectionState('stopped', null, null)
        }
      }, delay)
    }

    return Response.json({ message: 'Election started', status: 'ongoing' })
  }

  if (status === 'stop') {
    if (electionStatus === 'stopped') {
      return Response.json({ error: 'Election already stopped' }, { status: 400 })
    }

    setElectionState('stopped', null, null)
    return Response.json({ message: 'Election stopped', status: 'stopped' })
  }

  return Response.json({ error: 'Invalid status' }, { status: 400 })
}
