import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllMemberships, activateMembership } from '../api/auth'

export default function Admin() {
  const navigate = useNavigate()
  const [memberships, setMemberships] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchMemberships()
  }, [])

  const fetchMemberships = async () => {
    try {
      const res = await getAllMemberships(token)
      setMemberships(res.data)
    } catch {
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  const handleActivate = async (id) => {
    try {
      await activateMembership(id, token)
      fetchMemberships()
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

  const pending = memberships.filter(m => m.status === 'pending')
  const active = memberships.filter(m => m.status === 'active')

  return (
    <div className="min-h-screen bg-stone-950 text-blue-100">
      <header className="flex justify-between items-center px-10 py-6 border-b border-stone-800">
        <h1 className="text-2xl tracking-widest uppercase text-purple-500">Catloops Admin</h1>
        <button
          onClick={handleLogout}
          className="px-5 py-2 border border-stone-600 text-stone-300 hover:border-purple-500 hover:text-purple-500 transition-all text-sm tracking-wider uppercase"
        >
          Logout
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex gap-8 mb-12">
          <div className="border border-stone-800 p-6 flex-1 text-center">
            <p className="text-3xl font-bold text-yellow-400">{pending.length}</p>
            <p className="text-xs tracking-widest uppercase text-stone-500 mt-1">Pending</p>
          </div>
          <div className="border border-stone-800 p-6 flex-1 text-center">
            <p className="text-3xl font-bold text-green-400">{active.length}</p>
            <p className="text-xs tracking-widest uppercase text-stone-500 mt-1">Active</p>
          </div>
          <div className="border border-stone-800 p-6 flex-1 text-center">
            <p className="text-3xl font-bold text-purple-500">{memberships.length}</p>
            <p className="text-xs tracking-widest uppercase text-stone-500 mt-1">Total</p>
          </div>
        </div>

        <h3 className="text-sm tracking-widest uppercase text-stone-500 mb-6">All Memberships</h3>

        {memberships.length === 0 ? (
          <p className="text-stone-600">No memberships yet.</p>
        ) : (
          <div className="space-y-4">
            {memberships.map(m => (
              <div key={m.id} className="border border-stone-800 p-6 flex justify-between items-center">
                <div className="space-y-1">
                  <p className="font-bold capitalize">{m.category} Membership</p>
                  <p className="text-stone-500 text-sm">Member ID: {m.userId} &nbsp;|&nbsp; ${m.price}/mo</p>
                  <p className="text-stone-600 text-xs">Applied: {new Date(m.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-bold uppercase tracking-wider ${m.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {m.status}
                  </span>
                  {m.status === 'pending' && (
                    <button
                      onClick={() => handleActivate(m.id)}
                      className="px-4 py-2 bg-purple-500 text-stone-950 hover:bg-purple-400 transition-all text-xs tracking-wider uppercase font-bold"
                    >
                      Activate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}