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
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ background: 'rgba(254,252,232,0.85)', borderColor: 'var(--border, #fde68a)' }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-xl leading-none">📝</span>
          <div>
            <span className="font-bold text-lg text-slate-900 leading-none block tracking-tight">
              Quiz<span style={{ color: 'var(--accent, #ca8a04)' }}>Bites</span>
            </span>
            <span className="text-[10px] font-medium leading-none block uppercase tracking-widest" style={{ color: 'color-mix(in srgb, var(--accent, #ca8a04) 70%, transparent)' }}>AI quiz maker for teachers</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-500">
          {navLinks.filter(l => l.label !== 'Home').map(link => (
            <Link key={link.href} href={link.href} className="hover:text-yellow-700 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Streak pill */}
        <div className="hidden md:block">
          <StreakBar />
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link href="/dashboard"
            className="flex items-center gap-2 rounded-lg border px-4 py-1.5 text-sm font-semibold text-slate-600 hover:bg-yellow-50 hover:text-yellow-800 transition-all"
            style={{ borderColor: 'var(--border, #fde68a)' }}>
            Dashboard
          </Link>
          <Link href="/host"
            className="flex items-center gap-1.5 rounded-full px-5 py-1.5 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[0.97]"
            style={{ background: 'var(--accent, #ca8a04)', boxShadow: '0 4px 16px rgba(202,138,4,0.25)' }}>
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
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-3 text-sm" style={{ borderColor: 'var(--border, #fde68a)', background: 'rgba(254,252,232,0.97)' }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className="text-slate-600 hover:text-yellow-700 transition-colors py-1"
              onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="h-px my-1" style={{ background: 'var(--border, #fde68a)' }} />
          <Link href="/dashboard"
            className="flex items-center justify-center gap-2 rounded-lg border py-2.5 font-semibold text-slate-600"
            style={{ borderColor: 'var(--border, #fde68a)' }}
            onClick={() => setOpen(false)}>
            Dashboard
          </Link>
          <Link href="/host"
            className="text-center rounded-lg py-2.5 font-bold text-white active:scale-[0.97] transition-transform"
            style={{ background: 'var(--accent, #ca8a04)' }}
            onClick={() => setOpen(false)}>
            Start Quiz
          </Link>
        </div>
      )}
    </nav>
  )
}
