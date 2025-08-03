'use client'

export default function StartButton() {
  const handleClick = async () => {
    const res = await fetch('/api/start-election', { method: 'POST' })
    const data = await res.json()
    if (data.success) alert('Election started: ' + data.tx)
    else alert('Failed: ' + data.error)
  }

  return <button onClick={handleClick}>Start Election</button>
}
