'use client'
import { useState, useEffect } from 'react'

function AnimatedCounter({ value, label }: { value: number; label: string }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (value <= 0) return
    const duration = 800
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(value * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [value])

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-2xl font-black tabular-nums" style={{ color: 'var(--accent, #ca8a04)' }}>
        {display.toLocaleString()}
      </span>
      <span className="text-xs text-slate-500 font-medium">{label}</span>
    </div>
  )
}

export default function LiveStatsBar() {
  const [stats, setStats] = useState<{ quizzesGenerated: number; questionsAnswered: number; topicsExplored: number } | null>(null)

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(data => {
        if (data.quizzesGenerated > 0 || data.questionsAnswered > 0 || data.topicsExplored > 0) {
          setStats(data)
        }
      })
      .catch(() => {})
  }, [])

  if (!stats) return null

  return (
    <section className="py-8 px-4">
      <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-12 sm:gap-16">
        <AnimatedCounter value={stats.quizzesGenerated} label="Quizzes generated" />
        <AnimatedCounter value={stats.questionsAnswered} label="Questions answered" />
        <AnimatedCounter value={stats.topicsExplored} label="Topics explored" />
      </div>
    </section>
  )
}
