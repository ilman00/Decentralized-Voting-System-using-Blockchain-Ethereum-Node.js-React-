'use client'
import { useState } from 'react'
import DistrictSelector from '@/components/DistrictSelector'

export default function AddNAPage() {
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [naNumber, setNaNumber] = useState('')
  const [naName, setNaName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = { district: selectedDistrict, naNumber, naName }

    try {
      const res = await fetch('/api/na', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (result.success) {
        alert('NA added successfully!')
        setNaNumber('')
        setNaName('')
        setSelectedDistrict(null)
      } else {
        alert('Error: ' + result.error)
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white px-6 py-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add NA</h1>

        {!selectedDistrict && (
          <DistrictSelector onSelect={setSelectedDistrict} />
        )}

        {selectedDistrict && (
          <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold mb-2">District: {selectedDistrict}</h2>

            <input
              type="text"
              placeholder="Enter NA Number (e.g. NA-10)"
              value={naNumber}
              onChange={(e) => setNaNumber(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />

            <input
              type="text"
              placeholder="Optional Name or Area"
              value={naName}
              onChange={(e) => setNaName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />

            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 px-6 rounded shadow"
            >
              Submit NA
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
