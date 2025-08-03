'use client'
import { useState, useEffect } from 'react'

export default function AddSubadminPage() {
  const [districts, setDistricts] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    district: '',
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/districts')
      .then(res => res.json())
      .then(data => {
        if (data.success) setDistricts(data.districts)
      })
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/subadmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.success) {
        setMessage('Subadmin added successfully.')
        setFormData({ name: '', email: '', password: '', district: '' })
      } else {
        setMessage(data.message || 'Failed to add subadmin.')
      }
    } catch (error) {
      setMessage('Error occurred while adding subadmin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-100 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-green-800 text-center">Add Subadmin</h1>

        {message && <p className="text-center text-sm text-green-700">{message}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select District --</option>
          {districts.map((district, idx) => (
            <option key={idx} value={district}>{district}</option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 text-white w-full py-2 rounded hover:bg-green-800"
        >
          {loading ? 'Submitting...' : 'Add Subadmin'}
        </button>
      </form>
    </div>
  )
}
