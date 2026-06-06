import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { login } from "../api/auth"
import { jwtDecode } from 'jwt-decode'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      const res = await login(form)
      const token = res.data.token
      localStorage.setItem('token', token)
  
      const decoded = jwtDecode(token)
      console.log(decoded)
      const role = decoded.role;
  
      if (role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.response?.data || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-stone-950 text-blue-100 flex items-center justify-center">
      <div className="border border-stone-800 p-10 w-full max-w-md">
        <h2 className="text-2xl uppercase tracking-widest text-purple-500 mb-8">Login</h2>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="space-y-4">
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
        </div>

        <button
          onClick={handleLogin}
          className="w-full mt-8 py-3 bg-purple-500 text-stone-950 hover:bg-purple-400 transition-all text-sm tracking-widest uppercase font-bold"
        >
          Login
        </button>

        <p className="text-stone-600 text-sm text-center mt-4">
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')} className="text-purple-500 cursor-pointer hover:text-purple-400">
            Register
          </span>
        </p>
      </div>
    </div>
  )
}