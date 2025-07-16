'use client'
import { useState } from 'react'

const dummyConstituencies = {
  Peshawar: {
    NA: ['NA-1', 'NA-2'],
    PK: ['PK-1', 'PK-2'],
  },
  Lahore: {
    NA: ['NA-50', 'NA-51'],
    PK: ['PK-10', 'PK-11'],
  },
}

export default function CandidateForm({ district, type }) {
  const constituencies = dummyConstituencies[district]?.[type] || []

  const [form, setForm] = useState({
    name: '',
    fatherName: '',
    cnic: '',
    seat: '',
    partyName: '',
    symbolName: '',
    symbolImage: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'symbolImage') {
      setForm({ ...form, symbolImage: files[0] }) // file input
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Prepare form data for submission (e.g., to send image file)
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('fatherName', form.fatherName)
    formData.append('cnic', form.cnic)
    formData.append('seat', form.seat)
    formData.append('district', district)
    formData.append('type', type)
    formData.append('partyName', form.partyName)
    formData.append('symbolName', form.symbolName)
    formData.append('symbolImage', form.symbolImage)

    console.log('Submitting form:', form)
    alert('Candidate added (not yet saved to DB)')
    // Here you'll send formData to backend with fetch later
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 p-6 rounded-xl text-white space-y-4 shadow"
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-bold mb-4">
        Add Candidate - {type} in {district}
      </h2>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Candidate Name"
        className="w-full px-4 py-2 rounded text-white bg-gray-800"
        required
      />

      <input
        type="text"
        name="fatherName"
        value={form.fatherName}
        onChange={handleChange}
        placeholder="Father Name"
        className="w-full px-4 py-2 rounded text-white bg-gray-800"
        required
      />

      <input
        type="text"
        name="cnic"
        value={form.cnic}
        onChange={handleChange}
        placeholder="CNIC (13 digits)"
        maxLength={13}
        className="w-full px-4 py-2 rounded text-white bg-gray-800"
        required
      />

      <select
        name="seat"
        value={form.seat}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded text-white bg-gray-800"
      >
        <option value="">Select {type} Seat</option>
        {constituencies.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="partyName"
        value={form.partyName}
        onChange={handleChange}
        placeholder="Party Name"
        className="w-full px-4 py-2 rounded text-white bg-gray-800"
        required
      />

      <input
        type="text"
        name="symbolName"
        value={form.symbolName}
        onChange={handleChange}
        placeholder="Symbol Name"
        className="w-full px-4 py-2 rounded text-white bg-gray-800"
        required
      />

      <input
        type="file"
        name="symbolImage"
        onChange={handleChange}
        accept="image/*"
        className="w-full px-4 py-2 rounded text-white"
        required
      />

      <button
        type="submit"
        className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 px-6 rounded shadow"
      >
        Submit Candidate
      </button>
    </form>
  )
}
