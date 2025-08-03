'use client'
import {useEffect, useState } from 'react'

export default function Election() {
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState('')


  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/election-status');
        const data = await res.json();
        if(data.started === true){
          setStatus("ongoing")
        }else{
          setStatus("Stoped")
        }
        console.log('Election started:', data.started);
      } catch (err) {
        console.error('Failed to fetch election status:', err);
      }
    };
  
    fetchStatus();
  }, []);
  

  async function handleAction(action) {
    const res = await fetch('/api/start-election', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: action }),
    })

    const data = await res.json()
    setStatus(data.status)
    setMessage(data.message || '')
  }

  const handleStopElection = async () => {
    try {
      const res = await fetch('/api/stop-election', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setStatus("stoped")
        alert('Election stopped successfully');
      } else {
        alert('Failed to stop election');
      }
    } catch (err) {
      console.error('Error stopping election:', err);
    }
  };
  

  const isOngoing = status === 'ongoing'

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#01411C' }}>
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl max-w-xl w-full text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">🗳️ Election Control Panel</h2>

        <div className="space-y-4">
          <div className="flex justify-between">
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
                onClick={() => handleStopElection('stop')}
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
