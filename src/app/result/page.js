'use client'
import { useEffect, useState } from 'react'

export default function ResultsPage() {
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/districts')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDistricts(data.districts)
        }
      })
  }, [])

  const handleDistrictChange = async (e) => {
    const district = e.target.value
    setSelectedDistrict(district)
    setLoading(true)

    try {
      const res = await fetch(`/api/results/${district}`)
      const data = await res.json()
      if (data.success) {
        console.log("API data:", data.results)
        setResults(data.results)
      }
    } catch (err) {
      console.error('Failed to fetch results:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-900">Election Results</h1>

      <div className="mb-6 text-center">
        <label className="mr-2 font-medium text-green-800">Select District:</label>
        <select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className="p-2 border rounded shadow-sm"
        >
          <option value="">-- Select --</option>
          {districts.map((d, i) => (
            <option key={i} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center text-green-700">Loading results...</p>}

      {!loading && results && Object.keys(results).length === 0 && (
        <p className="text-center text-red-600">No candidates found for this district.</p>
      )}

      {!loading && results && (
        <div className="space-y-8">
          {Object.entries(results).map(([seat, candidates]) => (
            <div key={seat} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mb-4 text-green-800">{seat}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {candidates.map((c, idx) => (
                  <div key={idx} className="border p-3 rounded flex items-center gap-4 bg-green-50">
                    <img src={c.symbol} alt="Symbol" className="w-12 h-12 object-contain" />
                    <div>
                      <p className="font-semibold text-green-900">{c.name}</p>
                      <p className="text-green-700">Votes: {c.votes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
