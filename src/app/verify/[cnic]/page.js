'use client'
import { useRouter, useParams } from 'next/navigation'

export default function VerifyPage() {
  const router = useRouter()
  const params = useParams()
  const { cnic } = params

  const handleVoteType = (type) => {
    // Redirect to vote type selection
    router.push(`/vote/${type}/${cnic}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-teal-700 flex flex-col items-center justify-center px-4 text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-2">Select Type of Vote</h1>
        <p className="text-slate-200">Your CNIC: <span className="font-mono">{cnic}</span></p>
        <p className="text-lg mt-2 text-slate-300">Choose whether you want to vote for the National or Provincial Assembly.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl justify-center">
        <button
          onClick={() => handleVoteType('na')}
          className="bg-amber-400 hover:bg-amber-500 text-white text-2xl font-bold py-6 px-10 rounded-2xl shadow-lg w-full transition"
        >
          🏛️ National Assembly (NA)
        </button>

        <button
          onClick={() => handleVoteType('pk')}
          className="bg-white hover:bg-gray-100 text-teal-800 text-2xl font-bold py-6 px-10 rounded-2xl shadow-lg w-full transition"
        >
          🏛️ Provincial Assembly (PK)
        </button>
      </div>
    </div>
  )
}
