import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-stone-950 text-blue-100 font-serif">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 border-b border-stone-800">
        <h1 className="text-2xl tracking-widest uppercase text-purple-500">Catloops</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 border border-stone-600 text-stone-300 hover:borderpurple-500- hover:text-purple-500 transition-all text-sm tracking-wider uppercase"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-5 py-2 bg-purple-500 text-stone-950 hover:bg-purple-400 transition-all text-sm tracking-wider uppercase font-bold"
          >
            Register
          </button>
        </div>
      </header>

      <section className="text-center py-24 px-6">
        <p className="text-purple-500 tracking-widest uppercase text-sm mb-4">Kamloops, BC</p>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Catloops <br /> Cat Café
        </h2>
        <p className="text-stone-400 text-lg max-w-xl mx-auto mb-10">
          A family-owned cat cafe dedicated to providing a warm and welcoming space for cat lovers to relax, unwind, and make some new feline friends. 
        </p>
      </section>

      {/* Membership Tiers */}
      <section className="px-10 pb-24">
        <h3 className="text-center text-sm tracking-widest uppercase text-stone-500 mb-12">Membership Plans</h3>
        <div className="flex flex-col md:flex-row gap-6 max-w-3xl mx-auto">

          {/* Student / Senior */}
          <div className="flex-1 border border-purple-500 p-8">
            <p className="text-purple-500 text-xs tracking-widest uppercase mb-2">Student / Senior</p>
            <p className="text-5xl font-bold mb-1">$60</p>
            <p className="text-stone-500 text-sm mb-8">per month</p>
            <ul className="text-stone-400 text-sm space-y-3 mb-10">
              <li>✓ Unlimited access to Catloops space</li>
              <li>✓ Access to all events</li>
              <li>✓ Community membership</li>
              <li>✓ Valid student or senior ID required</li>
            </ul>
            <button
              onClick={() => navigate('/register')}
              className="w-full py-3 bg-purple-500 text-stone-950 hover:bg-purple-400 transition-all text-sm tracking-wider uppercase font-bold"
            >
              Sign Up
            </button>
          </div>

          {/* Regular */}
          <div className="flex-1 border border-purple-900 p-8">
            <p className="text-stone-400 text-xs tracking-widest uppercase mb-2">Regular</p>
            <p className="text-5xl font-bold mb-1">$75</p>
            <p className="text-stone-500 text-sm mb-8">per month</p>
            <ul className="text-stone-400 text-sm space-y-3 mb-10">
              <li>✓ Unlimited access to Catloops space</li>
              <li>✓ Access to all events</li>
              <li>✓ Community membership</li>
              <li>✓ No ID verification required</li>
            </ul>
            <button
              onClick={() => navigate('/register')}
              className="w-full py-3 border border-stone-600 text-stone-300 hover:border-purple-500 hover:text-purple-500 transition-all text-sm tracking-wider uppercase"
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-800 px-10 py-6 text-center text-stone-600 text-sm tracking-wider">
        Catloops — Kamloops, BC &nbsp;|&nbsp; Come visit us to complete your membership
      </footer>
    </div>
  )
}