'use client'
// components/MasteryBar.tsx — per-topic mastery progress bar
// Reads from localStorage key: qb_mastery_{topic} (number 0-10)
// Stages: 0-3 = Known, 4-7 = Learning, 8-10 = Mastered
import { useState, useEffect } from 'react'

interface Props {
  topic: string
  total?: number
}

function getStage(count: number, total: number): { label: string; color: string; bgColor: string } {
  const pct = count / total
  if (pct >= 0.8) return { label: 'Mastered', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.15)' }
  if (pct >= 0.4) return { label: 'Learning', color: '#fbbf24', bgColor: 'rgba(251,191,36, 0.12)' }
  return { label: 'Known', color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.10)' }
}

export default function MasteryBar({ topic, total = 10 }: Props) {
  const [count, setCount]   = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const key   = `qb_mastery_${topic.toLowerCase().replace(/\s+/g, '_')}`
      const stored = parseInt(localStorage.getItem(key) ?? '0', 10) || 0
      setCount(Math.min(stored, total))
    } catch {
      setCount(0)
    }
  }, [topic, total])

  if (!mounted) return null

  const pct   = Math.round((count / total) * 100)
  const stage = getStage(count, total)

  return (
    <div className="mt-3 px-1" aria-label={`${topic} mastery: ${count} of ${total}`}>
      {/* Label row */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">
          {count} / {total} mastered
        </span>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
          style={{ color: stage.color, background: stage.bgColor }}
        >
          {stage.label}
        </span>
      </div>

      {/* Progress track */}
      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: stage.color,
            boxShadow: count > 0 ? `0 0 6px ${stage.color}` : 'none',
          }}
        />
      </div>
    </div>
  )
}
