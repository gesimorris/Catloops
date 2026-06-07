import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../api/auth'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    category: 'regular'
  })
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    try {
      await register(form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-stone-950 text-blue-100 flex items-center justify-center">
      <div className="border border-stone-800 p-10 w-full max-w-md">
        <h2 className="text-2xl uppercase tracking-widest text-purple-500 mb-8">Register</h2>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="space-y-4">
          <input
            placeholder="First Name"
            className="w-full bg-transparent border border-stone-700 px-4 py-3 text-sm text-blue-100 placeholder-stone-600 focus:outline-none focus:border-purple-500"
            onChange={e => setForm({ ...form, firstName: e.target.value })}
          />
          <input
            placeholder="Last Name"
            className="w-full bg-transparent border border-stone-700 px-4 py-3 text-sm text-blue-100 placeholder-stone-600 focus:outline-none focus:border-purple-500"
            onChange={e => setForm({ ...form, lastName: e.target.value })}
          />
          <input
            placeholder="Email"
            type="email"
            className="w-full bg-transparent border border-stone-700 px-4 py-3 text-sm text-blue-100 placeholder-stone-600 focus:outline-none focus:border-purple-500"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Password"
            type="password"
            className="w-full bg-transparent border border-stone-700 px-4 py-3 text-sm text-blue-100 placeholder-stone-600 focus:outline-none focus:border-purple-500"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <select
            className="w-full bg-stone-950 border border-stone-700 px-4 py-3 text-sm text-blue-100 focus:outline-none focus:border-purple-500"
            onChange={e => setForm({ ...form, category: e.target.value })}
          >
            <option value="regular">Regular — $70/month</option>
            <option value="student">Student — $60/month</option>
            <option value="senior">Senior — $60/month</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-8 py-3 bg-purple-500 text-stone-950 hover:bg-purple-400 transition-all text-sm tracking-widest uppercase font-bold"
        >
          Create Account
        </button>

        <p className="text-stone-600 text-sm text-center mt-4">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} className="text-purple-500 cursor-pointer hover:text-purple-400">
            Login
          </span>
        </p>
      </div>
    </div>
  )
}