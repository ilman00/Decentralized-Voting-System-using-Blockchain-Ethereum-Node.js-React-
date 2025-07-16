'use client'
import { useState } from 'react'
import DistrictSelector from '@/components/DistrictSelector'

export default function AddPKPage() {
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [pkNumber, setPkNumber] = useState('')
  const [pkName, setPkName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      district: selectedDistrict,
      pkNumber,
      pkName,
    }
    console.log('New PK submitted:', data)
    alert('PK added (not saved to DB yet)')
    // send data to backend later
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white px-6 py-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add PK</h1>

        {!selectedDistrict && (
          <DistrictSelector onSelect={setSelectedDistrict} />
        )}

        {selectedDistrict && (
          <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-xl shadow space-y-4">
            <h2 className="text-xl font-semibold mb-2">District: {selectedDistrict}</h2>

            <input
              type="text"
              placeholder="Enter PK Number (e.g. PK-7)"
              value={pkNumber}
              onChange={(e) => setPkNumber(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />

            <input
              type="text"
              placeholder="Optional Name or Area"
              value={pkName}
              onChange={(e) => setPkName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />

            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 px-6 rounded shadow"
            >
              Submit PK
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
