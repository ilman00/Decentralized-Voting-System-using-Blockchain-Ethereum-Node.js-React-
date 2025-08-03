'use client'
import { useEffect, useState } from 'react'

export default function Election() {
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 10000)
    return () => clearInterval(interval)
  }, [])

  async function fetchStatus() {
    const res = await fetch('/api/election/update')
    const data = await res.json()
    setStatus(data.status)
    setStartTime(data.startTime || '')
    setEndTime(data.endTime || '')
  }

  async function handleAction(action) {
    const payload = { status: action }

    if (action === 'start') {
      if (!startTime || !endTime) {
        setMessage('Start and End time are required.')
        return
      }
      payload.startTime = startTime
      payload.endTime = endTime
    }

    const res = await fetch('/api/election/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.error)
    } else {
      setStatus(data.status)
      setMessage(data.message)
    }
  }

  const isOngoing = status === 'ongoing'

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#01411C' }}>
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl max-w-xl w-full text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">🗳️ Election Control Panel</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 rounded bg-white text-black"
              disabled={isOngoing}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">End Time</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 rounded bg-white text-black"
              disabled={isOngoing}
            />
          </div>

          <div className="flex justify-between mt-6">
            {!isOngoing && (
              <button
                onClick={() => handleAction('start')}
                className="bg-green-600 hover:bg-green-900 px-5 py-2 rounded-lg font-semibold transition"
              >
                Start Election
              </button>
            )}
            {isOngoing && (
              <button
                onClick={() => handleAction('stop')}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold transition"
              >
                Stop Election
              </button>
            )}
          </div>

          <div className="mt-4">
            <p className="text-lg font-semibold">
              ✅ Status: <span className="uppercase">{status}</span>
            </p>
            {message && <p className="text-sm text-yellow-200 mt-1">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
