'use client'
import { useState } from 'react'

export default function Subscribe() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ name, email }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-1 relative">
      <h1 className="font-tanpearl text-4xl text-center mb-12 text-awy-espresso">
        Subscribe to<br/>Awy's Corner
      </h1>

      <form onSubmit={handleSubscribe} className="space-y-6">
        <div>
          <label className="block font-tanpearl text-xl mb-2 text-awy-espresso">Username:</label>
          <input 
            type="text" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-200/50 rounded-2xl py-3 px-6 text-lg focus:outline-none"
          />
        </div>
        <div>
          <label className="block font-tanpearl text-xl mb-2 text-awy-espresso">Email:</label>
          <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-200/50 rounded-2xl py-3 px-6 text-lg focus:outline-none"
          />
        </div>
        
        <div className="text-center pt-8">
          <button 
            type="submit" 
            className="bg-awy-espresso text-awy-light font-tanpearl text-2xl py-3 px-12 rounded-full hover:bg-opacity-90 transition-all"
          >
            {status === 'loading' ? 'Subscribing...' : 'subscribe'}
          </button>
        </div>
      </form>

      {/* Success/Error Overlays */}
      {status === 'success' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] bg-awy-espresso p-12 text-center shadow-2xl">
          <h2 className="font-tanpearl text-4xl text-awy-light mb-2">Welcome to Awy's<br/>Corner</h2>
          <p className="font-tanpearl text-xl text-awy-light">Thank you for subscribing</p>
          <button onClick={() => setStatus('idle')} className="mt-8 text-awy-light underline">Close</button>
        </div>
      )}

      {status === 'error' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] bg-awy-espresso p-12 text-center shadow-2xl">
          <h2 className="font-tanpearl text-4xl text-awy-light">Oops! You've<br/>subscribed with this<br/>email before.</h2>
          <button onClick={() => setStatus('idle')} className="mt-8 text-awy-light underline">Close</button>
        </div>
      )}
    </div>
  )
}