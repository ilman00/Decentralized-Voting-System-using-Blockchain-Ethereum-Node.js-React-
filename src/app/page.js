'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [cnic, setCnic] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cnic.trim().length === 13) {
      router.push(`/verify/${cnic}`)
    } else {
      alert('Enter valid 13-digit CNIC')
    }
  }

  return (
    <div className="bg-gradient-to-br from-emerald-600 to-teal-700 min-h-screen text-white">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-28 relative z-10">
        <div className="max-w-3xl bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-lg border border-white/20">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight text-white drop-shadow">
            Decentralized, <span className="text-amber-300">Secure</span><br />
            Voting for the People
          </h1>
          <p className="text-lg text-slate-200 mb-6 max-w-xl mx-auto">
            Participate in fair and tamper-proof elections powered by blockchain technology.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <input
              type="text"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              placeholder="Enter your CNIC (13 digits)"
              maxLength={13}
              className="px-5 py-3 rounded-full text-black w-full sm:w-80 focus:outline-none shadow-md"
            />
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 px-6 rounded-full transition shadow-lg"
            >
              Verify & Vote
            </button>
          </form>
        </div>
      </section>

      {/* Decorative Wave */}
      <div className="w-full h-20 bg-gradient-to-b from-transparent to-teal-800 absolute bottom-0 left-0 z-0" />

      {/* How It Works */}
      <section className="py-20 px-6 text-center bg-teal-800 relative z-10">
        <h2 className="text-4xl font-bold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: 'Verify Identity',
              desc: 'Use your CNIC to verify voting eligibility.',
              emoji: '🆔',
            },
            {
              title: 'Choose Candidate',
              desc: 'View verified candidates for your city.',
              emoji: '🗳️',
            },
            {
              title: 'Vote on Blockchain',
              desc: 'Record your vote immutably and transparently.',
              emoji: '🔐',
            },
          ].map(({ title, desc, emoji }, i) => (
            <div key={i} className="bg-white/10 p-6 rounded-2xl shadow-lg border border-white/10">
              <div className="text-5xl mb-4">{emoji}</div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-slate-200">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-950 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Make Your Voice Count</h2>
        <p className="text-slate-300 mb-6 max-w-xl mx-auto">
          Be part of the future of democracy. Secure, accessible, and verifiable elections.
        </p>
        <a
          href="/vote"
          className="inline-block bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 px-8 rounded-full transition shadow-lg"
        >
          Vote Now
        </a>
      </section>
    </div>
  )
}
