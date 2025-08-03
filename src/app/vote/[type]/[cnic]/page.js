'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

export default function VotePage() {
  const { type, cnic } = useParams() // type: 'na' or 'pk'
  const router = useRouter()

  const [candidates, setCandidates] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch candidates for this vote type
  useEffect(() => {
    async function fetchCandidates() {
      setLoading(true);

      try {
        // Step 1: Get voter data
        const voterRes = await fetch(`/api/voters/${cnic}`);
        const voter = await voterRes.json();

        // Step 2: Get voter's selected constituency based on type
        const constituency = type === 'na' ? voter.na : voter.pk;
        console.log(constituency);
        // Step 3: Fetch candidates for that constituency and type
        const candidatesRes = await fetch(`/api/get-condidates?constituency=${constituency}`);
        if (!candidatesRes.ok) {
          const errorText = await candidatesRes.text(); // get raw HTML/text
          console.error('Failed to fetch candidates:', candidatesRes.status, errorText);
          return;
        }
        const candidates = await candidatesRes.json();
        console.log(candidates);
        setCandidates(candidates);
      } catch (err) {
        console.error('Error fetching candidates', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCandidates();
  }, [type, cnic]);


  const handleCastVote = async () => {
    if (!selected) return;
    console.log("type", type);
    console.log("ID", selected);
    console.log("CNIC", cnic);
    try {
      const res = await fetch('/api/cast-vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cnic,
          candidateId: selected,
          type, 
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
  
      alert('Vote casted successfully!');
      router.push('/thank-you'); // or wherever you want to redirect
    } catch (err) {
      console.error(err);
      alert('Failed to cast vote. ' + err.message);
    }
  };
  ;


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-teal-700 text-white px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Vote for {type.toUpperCase()} Assembly</h1>
        <p className="text-slate-200">CNIC: <span className="font-mono">{cnic}</span></p>
      </div>

      {loading ? (
        <p className="text-center text-slate-300">Loading candidates...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {candidates.map((cand) => (
              <div
                key={cand.id}
                onClick={() => setSelected(cand.id)}
                className={`cursor-pointer p-5 bg-white/10 rounded-xl border transition shadow-lg hover:bg-white/20 ${selected === cand.id ? 'border-amber-400 ring-2 ring-amber-400' : 'border-white/10'
                  }`}
              >
                <Image
                  height="40"
                  width="40"
                  src={cand.symbol}
                  alt={cand.name}
                  className="w-24 h-24 mx-auto object-contain mb-4"
                />
                <h3 className="text-xl font-semibold text-center">{cand.name}</h3>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleCastVote}
              disabled={!selected}
              className={`${selected
                ? 'bg-amber-400 hover:bg-amber-500'
                : 'bg-gray-400 cursor-not-allowed'
                } text-white font-bold py-3 px-10 rounded-full transition shadow-lg`}
            >
              Cast Vote
            </button>
          </div>
        </>
      )}
    </div>
  )
}
