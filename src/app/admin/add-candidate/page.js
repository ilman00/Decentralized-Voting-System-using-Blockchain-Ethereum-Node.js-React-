'use client'
import { useState } from 'react'
import DistrictSelector from '@/components/DistrictSelector'
import CandidateForm from '@/components/CandidateForm'

const voteTypes = ['NA', 'PK']

export default function AddCandidatePage() {
  const [district, setDistrict] = useState(null)
  const [voteType, setVoteType] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add Candidate</h1>

        {!district && <DistrictSelector onSelect={setDistrict} />}

        {district && !voteType && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Select Vote Type</h2>
            <div className="flex gap-4">
              {voteTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setVoteType(type)}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded shadow"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {district && voteType && (
          <CandidateForm district={district} type={voteType} />
        )}
      </div>
    </div>
  )
}
