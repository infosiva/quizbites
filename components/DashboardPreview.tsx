'use client'
import { useEffect, useRef, useState } from 'react'

export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-2">See What&apos;s Inside</h2>
        <p className="text-slate-500 text-sm mb-8">Your dashboard after signing up — everything in one place</p>

        <div
          className="mx-auto max-w-3xl rounded-2xl overflow-hidden border transition-all duration-700"
          style={{
            borderColor: 'var(--border, #fde68a)',
            background: '#ffffff',
            transform: visible ? 'perspective(1000px) rotateY(-2deg) scale(0.92)' : 'perspective(1000px) rotateY(-6deg) scale(0.85)',
            opacity: visible ? 1 : 0,
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: '#fafaf9', borderColor: '#f0f0ee' }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-white rounded-md border px-3 py-1 text-xs text-slate-400 text-center" style={{ borderColor: '#e5e5e3' }}>
                quizbites.app/dashboard
              </div>
            </div>
          </div>

          {/* Dashboard content — empty state (real first-visit experience) */}
          <div className="p-6">
            {/* Top metric cards — empty */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Your Quizzes', value: '—', icon: '📝' },
                { label: 'Total Players', value: '—', icon: '👥' },
                { label: 'Avg Score', value: '—', icon: '📊' },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-3 text-center border" style={{ borderColor: 'var(--border, #fde68a)', background: '#fffef5' }}>
                  <div className="text-lg mb-0.5">{s.icon}</div>
                  <div className="text-xl font-black text-slate-300">{s.value}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Empty quizzes area */}
            <div className="rounded-xl border p-8 text-center" style={{ borderColor: 'var(--border, #fde68a)', background: '#fffef5' }}>
              <div className="text-3xl mb-3">📝</div>
              <p className="text-sm font-semibold text-slate-700 mb-1">Create your first quiz</p>
              <p className="text-xs text-slate-400 mb-4">Type any topic and share with your class in seconds</p>
              <div
                className="inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-bold text-white"
                style={{ background: 'var(--accent, #fbbf24)' }}
              >
                + New Quiz
              </div>
            </div>

            {/* Feature hints */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: '⚡', text: 'AI generates questions' },
                { icon: '📊', text: 'Live class results' },
                { icon: '📋', text: 'Export & reuse' },
              ].map(h => (
                <div key={h.text} className="flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] text-slate-500 border" style={{ borderColor: 'var(--border, #fde68a)' }}>
                  <span>{h.icon}</span>
                  <span>{h.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2">
          <a
            href="/host"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-base font-bold text-white transition-all hover:opacity-90 active:scale-[0.97]"
            style={{ background: 'var(--accent, #fbbf24)', boxShadow: '0 4px 16px rgba(251,191,36,0.25)' }}
          >
            Create Free Account →
          </a>
          <span className="text-xs text-slate-400">No credit card required</span>
        </div>
      </div>
    </section>
  )
}
