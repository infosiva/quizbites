'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/site.config'
import StreakBar from '@/components/StreakBar'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navLinks = siteConfig.nav

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-sky-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-xl leading-none">📝</span>
          <div>
            <span className="font-bold text-lg text-slate-900 leading-none block tracking-tight">
              Quiz<span className="text-sky-600">Bites</span>
            </span>
            <span className="text-[10px] font-medium text-sky-500/70 leading-none block uppercase tracking-widest">AI quiz maker for teachers</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-500">
          {navLinks.filter(l => l.label !== 'Home').map(link => (
            <Link key={link.href} href={link.href} className="hover:text-sky-600 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Streak pill — client-only, reads localStorage */}
        <div className="hidden md:block">
          <StreakBar />
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link href="/dashboard"
            className="flex items-center gap-2 rounded-lg border border-sky-200 px-4 py-1.5 text-sm font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-700 transition-all">
            Dashboard
          </Link>
          <Link href="/host"
            className="flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-bold text-white transition-all hover:brightness-110 hover:scale-105"
            style={{ background: '#0284c7' }}>
            Start Quiz <ArrowRight size={14} />
          </Link>
        </div>

        <button className="md:hidden p-2 text-slate-500 hover:text-slate-900" onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-sky-100 px-6 py-4 flex flex-col gap-3 text-sm bg-white">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className="text-slate-600 hover:text-sky-600 transition-colors py-1"
              onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-sky-100 my-1" />
          <Link href="/dashboard"
            className="flex items-center justify-center gap-2 rounded-lg border border-sky-200 py-2.5 font-semibold text-slate-600"
            onClick={() => setOpen(false)}>
            Dashboard
          </Link>
          <Link href="/host"
            className="text-center rounded-lg py-2.5 font-bold text-white"
            style={{ background: '#0284c7' }}
            onClick={() => setOpen(false)}>
            Start Quiz
          </Link>
        </div>
      )}
    </nav>
  )
}
