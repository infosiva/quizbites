'use client'
// components/StreakBar.tsx — daily streak + next-review countdown
// Reads from localStorage: qb_streak (number), qb_next_review (ISO timestamp)
// Aceternity-style subtle glow effect
import { useState, useEffect } from 'react'

function getStreakCount(): number {
  try {
    return parseInt(localStorage.getItem('qb_streak') ?? '0', 10) || 0
  } catch {
    return 0
  }
}

function getNextReviewMs(): number {
  try {
    const stored = localStorage.getItem('qb_next_review')
    if (stored) return new Date(stored).getTime()
    // Default: 24h from now, store it
    const next = Date.now() + 24 * 60 * 60 * 1000
    localStorage.setItem('qb_next_review', new Date(next).toISOString())
    return next
  } catch {
    return Date.now() + 24 * 60 * 60 * 1000
  }
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return '0m'
  const totalMinutes = Math.floor(ms / 60000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

export default function StreakBar() {
  const [streak, setStreak]     = useState(0)
  const [countdown, setCountdown] = useState('')
  const [mounted, setMounted]   = useState(false)

  useEffect(() => {
    setMounted(true)
    setStreak(getStreakCount())

    function tick() {
      const nextMs = getNextReviewMs()
      const remaining = nextMs - Date.now()
      setCountdown(formatCountdown(remaining))
    }
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])

  // Don't render until hydrated (avoids SSR mismatch)
  if (!mounted) return null
  // Hide if both values are defaults / no activity yet
  if (streak === 0 && !localStorage.getItem('qb_next_review')) return null

  return (
    <div
      className="flex items-center justify-center gap-3 py-2 px-4 flex-wrap"
      aria-label="Learning progress"
    >
      {/* Streak pill */}
      {streak > 0 && (
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-orange-300 border border-orange-500/30 transition-all"
          style={{
            background: 'rgba(249, 115, 22, 0.08)',
            boxShadow: '0 0 12px rgba(249, 115, 22, 0.15)',
          }}
        >
          <span aria-hidden>🔥</span>
          {streak} day streak
        </div>
      )}

      {/* Next review countdown */}
      {countdown && (
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-blue-300 border border-blue-500/25 transition-all"
          style={{
            background: 'rgba(59, 130, 246, 0.07)',
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.12)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-blue-400"
            style={{ animation: 'pulse 2s ease-in-out infinite' }}
            aria-hidden
          />
          Next review in: {countdown}
        </div>
      )}
    </div>
  )
}
