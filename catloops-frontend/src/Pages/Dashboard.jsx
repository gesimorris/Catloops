import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyMembership, createMembership } from '../api/auth'

export default function Dashboard() {
  const navigate = useNavigate()
  const [membership, setMembership] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [category, setCategory] = useState('regular')
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchMembership()
  }, [])

  const fetchMembership = async () => {
    try {
      const res = await getMyMembership(token)
      setMembership(res.data)
    } catch {
      setMembership(null)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    try {
      await createMembership({ category }, token)
      fetchMembership()
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (loading) return (
    <div className="min-h-screen bg-stone-950 text-blue-100 flex items-center justify-center">
      <p className="text-stone-500 tracking-widest uppercase text-sm">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-stone-950 text-blue-100">
      <header className="flex justify-between items-center px-10 py-6 border-b border-stone-800">
        <h1 className="text-2xl tracking-widest uppercase text-purple-500">Catloops</h1>
        <button
          onClick={handleLogout}
          className="px-5 py-2 border border-stone-600 text-stone-300 hover:border-purple-500 hover:text-purple-500 transition-all text-sm tracking-wider uppercase"
        >
          Logout
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold tracking-tight mb-2">My Membership</h2>
        <p className="text-stone-500 text-sm mb-10">Manage your Catloops membership</p>

        {membership ? (
          <div className="border border-stone-800 p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs tracking-widest uppercase text-stone-500 mb-1">Category</p>
                <p className="text-xl font-bold capitalize">{membership.category}</p>
              </div>
              <div className="text-right">
                <p className="text-xs tracking-widest uppercase text-stone-500 mb-1">Price</p>
                <p className="text-xl font-bold">${membership.price}/mo</p>
              </div>
            </div>

            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-xs tracking-widest uppercase text-stone-500 mb-1">Status</p>
                <span className={`text-sm font-bold uppercase tracking-wider ${membership.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {membership.status}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs tracking-widest uppercase text-stone-500 mb-1">Member Since</p>
                <p className="text-sm">{new Date(membership.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className={`p-4 border text-sm ${membership.status === 'active' ? 'border-green-800 text-green-400' : 'border-yellow-800 text-yellow-400'}`}>
              {membership.status === 'active'
                ? '✓ Your membership is active. Show this page at the door.'
                : '⏳ Visit us in person to verify your ID and complete your membership.'}
            </div>
            <div className={'inline-flex gap-4 mt-6'}>
                <button onClick={() => navigate("/dashboard")} className={`px-5 py-2 bg-purple-500 text-stone-950 hover:bg-purple-400 transition-all text-sm tracking-wider uppercase font-bold`}>Cancel Membership</button>
                <button className={`px-5 py-2 bg-purple-500 text-stone-950 hover:bg-purple-400 transition-all text-sm tracking-wider uppercase font-bold`}>Change Membership</button>
            </div>
          </div>
        ) : (
          <div className="border border-stone-800 p-8">
            <p className="text-stone-400 mb-6">You don't have a membership yet. Apply below.</p>
            <select
              className="w-full bg-stone-950 border border-stone-700 px-4 py-3 text-sm text-blue-100 focus:outline-none focus:border-purple-500 mb-4"
              onChange={e => setCategory(e.target.value)}
            >
              <option value="regular">Regular — $70/month</option>
              <option value="student">Student — $60/month</option>
              <option value="senior">Senior — $60/month</option>
            </select>
            <button
              onClick={handleApply}
              className="w-full py-3 bg-purple-500 text-stone-950 hover:bg-purple-400 transition-all text-sm tracking-widest uppercase font-bold"
            >
              Apply for Membership
            </button>
          </div>
        )}
      </main>
    </div>
  )
}