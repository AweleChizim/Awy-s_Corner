'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-awy-sand flex items-center justify-center py-6 px-8 relative">
      
      {/* Centered Logo & Name */}
      <Link 
        href="/" 
        className={`flex items-center gap-4 z-20 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <img 
          src="/logo.png" 
          alt="Awy's Corner Logo" 
          className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full" 
        />
        <span className="font-tanpearl text-3xl md:text-5xl text-awy-espresso">Awy's Corner</span>
      </Link>

      {/* Hamburger Menu - Absolutely positioned to the far right */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="absolute right-8 z-20 space-y-2"
      >
        <div className={`w-8 h-1 md:w-10 bg-awy-espresso transition-transform ${isOpen ? 'rotate-45 translate-y-3' : ''}`}></div>
        <div className={`w-8 h-1 md:w-10 bg-awy-espresso transition-opacity ${isOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-8 h-1 md:w-10 bg-awy-espresso transition-transform ${isOpen ? '-rotate-45 -translate-y-3' : ''}`}></div>
      </button>

      {/* Fullscreen Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-awy-espresso text-awy-light flex flex-col items-center justify-center space-y-8 z-10 font-tanpearl text-3xl">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/subscribe" onClick={() => setIsOpen(false)}>Subscribe</Link>
        </div>
      )}
    </nav>
  )
}