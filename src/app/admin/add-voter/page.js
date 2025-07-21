'use client'
import { useState, useEffect } from 'react'
import DistrictSelector from '@/components/DistrictSelector'

export default function AddVoterPage() {
  const [district, setDistrict] = useState(null)
  const [naOptions, setNaOptions] = useState([])
  const [pkOptions, setPkOptions] = useState([])

  const [form, setForm] = useState({
    name: '',
    fatherName: '',
    cnic: '',
    dob: '',
    na: '',
    pk: '',
    picture: null,
    voted: false,
  })

  // Fetch NA and PK data from API when district changes
  useEffect(() => {
    if (!district) return
    console.log(district);
    fetch(`/api/districts/${district}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.na && data.pk) {
          setNaOptions(data.na)
          setPkOptions(data.pk)
        } else {
          setNaOptions([])
          setPkOptions([])
        }
      })
      .catch((err) => {
        console.error('Failed to fetch constituencies:', err)
        setNaOptions([])
        setPkOptions([])
      })
  }, [district])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (type === 'file') {
      setForm({ ...form, [name]: files[0] })
    } else if (type === 'checkbox') {
      setForm({ ...form, [name]: checked })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('fatherName', form.fatherName)
    formData.append('cnic', form.cnic)
    formData.append('dob', form.dob)
    formData.append('na', form.na)
    formData.append('pk', form.pk)
    formData.append('district', district)
    formData.append('picture', form.picture)

    try {
      const res = await fetch('/api/voter/add', {
        method: 'POST',
        body: formData,
      })

      const result = await res.json()
      if (res.ok) {
        alert('Voter added successfully!')
      } else {
        alert(result.error || 'Failed to add voter.')
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      alert('Error submitting voter form.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white px-6 py-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add Voter</h1>

        {!district && <DistrictSelector onSelect={setDistrict} />}

        {district && (
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 p-6 rounded-xl shadow space-y-4"
            encType="multipart/form-data"
          >
            <h2 className="text-xl font-semibold mb-4">District: {district}</h2>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              required
            />

            <input
              type="text"
              name="fatherName"
              value={form.fatherName}
              onChange={handleChange}
              placeholder="Father/Husband Name"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              required
            />

            <input
              type="text"
              name="cnic"
              value={form.cnic}
              onChange={handleChange}
              placeholder="CNIC (13 digits)"
              maxLength={13}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              required
            />

            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              required
            />

            <select
              name="na"
              value={form.na}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              required
            >
              <option value="">Select NA</option>
              {naOptions.map((na) => (
                <option key={na} value={na}>
                  {na}
                </option>
              ))}
            </select>

            <select
              name="pk"
              value={form.pk}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              required
            >
              <option value="">Select PK</option>
              {pkOptions.map((pk) => (
                <option key={pk} value={pk}>
                  {pk}
                </option>
              ))}
            </select>

            <input
              type="file"
              name="picture"
              onChange={handleChange}
              accept="image/*"
              className="w-full text-white"
              required
            />


            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 px-6 rounded shadow"
            >
              Submit Voter
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
