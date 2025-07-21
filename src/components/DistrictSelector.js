'use client'
import { useEffect, useState } from 'react'



export default function DistrictSelector({ onSelect }) {
  const [search, setSearch] = useState('')
  const [districts, setDistricts] = useState([]);

  useEffect(()=>{
    const fetchDistricts = async ()=>{
      try{
        const res = await fetch("/api/districts")
        const data = await res.json()
        if(data.success){
          setDistricts(data.districts)
        }
      }catch(err){
        console.error('Failed to load districts:', err)
      }
    }

    fetchDistricts()

  }, [])


  const filtered = districts.filter(d =>
    d.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Select District</h2>
      <input
        type="text"
        placeholder="Search district..."
        className="w-full px-4 py-2 rounded-md mb-4 text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {filtered.map(d => (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className="bg-white/10 hover:bg-white/20 text-white p-3 rounded shadow"
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  )
}
