'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import config from '@/vertical.config'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Create Quiz', href: '/host' },
  { label: 'Join', href: '/join' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-blue-900/30"
      style={{ background: 'rgba(7,13,26,0.85)' }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-xl leading-none">🖥️</span>
          <div>
            <span className="font-bold text-lg text-white leading-none block tracking-tight">{config.name}</span>
            <span className="text-[10px] font-medium text-blue-400/60 leading-none block uppercase tracking-widest">Live AI Quizzes</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm text-white/50">
          {NAV_LINKS.filter(l => l.label !== 'Home').map(link => (
            <Link key={link.href} href={link.href} className="hover:text-blue-300 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link href="/join"
            className="flex items-center gap-2 rounded-lg border border-blue-500/50 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-500/10 hover:border-blue-400 transition-all">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Join Session
          </Link>
          <Link href="/host"
            className="flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-bold text-white transition-all hover:brightness-110 hover:scale-105"
            style={{ background: '#2563eb' }}>
            Create Quiz <ArrowRight size={14} />
          </Link>
        </div>

        <button className="md:hidden p-2 text-white/60 hover:text-white" onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-blue-900/20 px-6 py-4 flex flex-col gap-3 text-sm"
          style={{ background: 'rgba(7,13,26,0.97)' }}>
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href}
              className="text-white/70 hover:text-blue-300 transition-colors py-1"
              onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-1" />
          <Link href="/join"
            className="flex items-center justify-center gap-2 rounded-lg border border-blue-500/50 py-2.5 font-semibold text-white"
            onClick={() => setOpen(false)}>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Join a Session
          </Link>
          <Link href="/host"
            className="text-center rounded-lg py-2.5 font-bold text-white"
            style={{ background: '#2563eb' }}
            onClick={() => setOpen(false)}>
            Create Quiz
          </Link>
        </div>
      )}
    </nav>
  )
}
