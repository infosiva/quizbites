'use client'
// components/EmptyStateDemo.tsx
// Shown when user has no quiz history (no localStorage qb_streak or qb_mastery_* keys).
// Plays a sample question with typewriter answer reveal — Aceternity-style card.
import { useState, useEffect } from 'react'

const DEMO_QUESTION = {
  q: 'What process do plants use to convert sunlight into food?',
  options: ['Respiration', 'Photosynthesis', 'Fermentation', 'Osmosis'],
  correct: 1,
  explanation: 'Plants use photosynthesis to convert light, water, and CO₂ into glucose and oxygen.',
}

type Phase = 'idle' | 'revealing' | 'correct' | 'explaining'

function useHasHistory(): boolean | null {
  const [has, setHas] = useState<boolean | null>(null)
  useEffect(() => {
    try {
      const keys = Object.keys(localStorage)
      const hasData = keys.some(k => k.startsWith('qb_'))
      setHas(hasData)
    } catch {
      setHas(false)
    }
  }, [])
  return has
}

export default function EmptyStateDemo() {
  const hasHistory = useHasHistory()
  const [phase, setPhase]           = useState<Phase>('idle')
  const [selected, setSelected]     = useState<number | null>(null)
  const [explanation, setExplanation] = useState('')
  const [expIdx, setExpIdx]         = useState(0)

  // Auto-start animation after short delay
  useEffect(() => {
    if (hasHistory !== false) return
    const t = setTimeout(() => setPhase('revealing'), 800)
    return () => clearTimeout(t)
  }, [hasHistory])

  // Simulate answer reveal: highlight correct after 2.5s
  useEffect(() => {
    if (phase !== 'revealing') return
    const t = setTimeout(() => {
      setSelected(DEMO_QUESTION.correct)
      setPhase('correct')
    }, 2500)
    return () => clearTimeout(t)
  }, [phase])

  // Typewriter explanation
  useEffect(() => {
    if (phase !== 'correct') return
    const t = setTimeout(() => { setExpIdx(0); setPhase('explaining') }, 600)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'explaining') return
    const full = DEMO_QUESTION.explanation
    if (expIdx < full.length) {
      const t = setTimeout(() => {
        setExplanation(full.slice(0, expIdx + 1))
        setExpIdx(i => i + 1)
      }, 18)
      return () => clearTimeout(t)
    }
  }, [phase, expIdx])

  // Restart cycle
  useEffect(() => {
    if (phase !== 'explaining' || expIdx < DEMO_QUESTION.explanation.length) return
    const t = setTimeout(() => {
      setPhase('idle')
      setSelected(null)
      setExplanation('')
      setExpIdx(0)
      setTimeout(() => setPhase('revealing'), 1200)
    }, 5000)
    return () => clearTimeout(t)
  }, [phase, expIdx])

  // Don't render if user has existing history or still checking
  if (hasHistory === null || hasHistory === true) return null

  return (
    <section className="py-8 px-4 sm:px-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-black text-white mb-1">See it in action</h2>
        <p className="text-white/40 text-sm">Watch how spaced repetition reveals what you need to review next</p>
      </div>

      <div
        className="rounded-2xl border border-blue-500/20 p-5 relative overflow-hidden"
        style={{
          background: 'rgba(5, 10, 24, 0.92)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 40px rgba(59, 130, 246, 0.08)',
        }}
      >
        {/* Aceternity spotlight glow */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
          }}
          aria-hidden
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400/80">
              Spaced Repetition Demo
            </span>
          </div>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-500/30 text-indigo-300"
            style={{ background: 'rgba(99,102,241,0.08)' }}
          >
            Learning
          </span>
        </div>

        {/* Question */}
        <p className="text-white/90 text-sm font-semibold leading-snug mb-4">
          <span className="text-blue-400/60 font-bold mr-1.5">Q.</span>
          {DEMO_QUESTION.q}
        </p>

        {/* Options */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {DEMO_QUESTION.options.map((opt, i) => {
            const isCorrect  = i === DEMO_QUESTION.correct
            const isSelected = selected === i
            const showResult = selected !== null

            return (
              <div
                key={i}
                className={[
                  'rounded-xl px-3 py-2.5 text-xs font-medium border transition-all duration-300',
                  showResult && isCorrect
                    ? 'border-emerald-500/50 text-emerald-300'
                    : showResult && isSelected && !isCorrect
                      ? 'border-red-500/40 text-red-300'
                      : 'border-white/[0.07] text-white/50',
                ].join(' ')}
                style={{
                  background: showResult && isCorrect
                    ? 'rgba(16, 185, 129, 0.12)'
                    : showResult && isSelected && !isCorrect
                      ? 'rgba(239, 68, 68, 0.08)'
                      : 'rgba(255,255,255,0.03)',
                  boxShadow: showResult && isCorrect ? '0 0 8px rgba(16, 185, 129, 0.2)' : 'none',
                }}
              >
                <span className="font-bold mr-1.5 opacity-50">
                  {['A','B','C','D'][i]}.
                </span>
                {opt}
                {showResult && isCorrect && (
                  <span className="ml-1 text-emerald-400" aria-label="Correct">✓</span>
                )}
              </div>
            )
          })}
        </div>

        {/* Typewriter explanation */}
        {explanation && (
          <div
            className="rounded-xl border border-indigo-500/20 px-4 py-3 text-xs text-white/60 leading-relaxed"
            style={{ background: 'rgba(99,102,241,0.06)' }}
          >
            <span className="text-indigo-300 font-bold block mb-1 text-[10px] uppercase tracking-wider">AI Explanation</span>
            {explanation}
            {phase === 'explaining' && expIdx < DEMO_QUESTION.explanation.length && (
              <span
                className="inline-block w-0.5 h-3 bg-indigo-400 ml-0.5 align-middle"
                style={{ animation: 'blink 1s step-end infinite' }}
                aria-hidden
              />
            )}
          </div>
        )}

        {/* "Comes back for it" hint */}
        {phase === 'explaining' && expIdx >= DEMO_QUESTION.explanation.length && (
          <div className="mt-3 flex items-center gap-2 text-[10px] text-white/30 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400/60 inline-block" aria-hidden />
            This question will be re-queued in your next review session
          </div>
        )}

        <style>{`
          @keyframes blink { 50% { opacity: 0; } }
        `}</style>
      </div>
    </section>
  )
}
