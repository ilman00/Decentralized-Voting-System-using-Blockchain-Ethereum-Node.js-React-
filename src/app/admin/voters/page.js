'use client';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

export default function VoterList() {
  const [voters, setVoters] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    cnic: '',
    na: '',
    pk: '',
  });

  const fetchVoters = useCallback(async () => {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) query.append(key, value);
    });

    const res = await fetch(`/api/voters?${query.toString()}`);
    const data = await res.json();
    setVoters(data.voters || []);
  }, [filters]); // depend on filters

  useEffect(() => {
    fetchVoters();
  }, [fetchVoters]); // now this is correct

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVoters();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Voters</h2>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          name="name"
          placeholder="Search by Name"
          value={filters.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="cnic"
          placeholder="Search by CNIC"
          value={filters.cnic}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="na"
          placeholder="Search by NA"
          value={filters.na}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="pk"
          placeholder="Search by PK"
          value={filters.pk}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white rounded p-2 col-span-1">
          Search
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Picture</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Father Name</th>
              <th className="p-2 border">CNIC</th>
              <th className="p-2 border">NA</th>
              <th className="p-2 border">PK</th>
              <th className="p-2 border">District</th>
            </tr>
          </thead>
          <tbody>
            {voters.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No voters found.
                </td>
              </tr>
            ) : (
              voters.map((voter) => (
                <tr key={voter._id} className="border-t">
                  <td className="p-2 border">
                    {voter.picture ? (
                      <Image
                        src={voter.picture}
                        alt="pic"
                        width={48}
                        height={48}
                        className="object-cover rounded-full"
                      />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td className="p-2 border">{voter.name}</td>
                  <td className="p-2 border">{voter.fatherName}</td>
                  <td className="p-2 border">{voter.cnic}</td>
                  <td className="p-2 border">{voter.na}</td>
                  <td className="p-2 border">{voter.pk}</td>
                  <td className="p-2 border">{voter.district}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
