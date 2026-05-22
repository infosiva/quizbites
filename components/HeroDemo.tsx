'use client'
// components/HeroDemo.tsx — animated 3-question rapid-fire quiz preview
// Shows the core QuizBites UX: countdown timer, question, 4 options, streak.
import { useState, useEffect, useCallback } from 'react'

const DEMO_QUESTIONS = [
  {
    q: 'What is the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'],
    correct: 1,
    subject: '🔬 Biology',
  },
  {
    q: 'Which planet has the most moons?',
    options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    correct: 1,
    subject: '🔭 Astronomy',
  },
  {
    q: 'What does CSS stand for?',
    options: ['Computer Style Syntax', 'Cascading Style Sheets', 'Creative Style System', 'Coded Style Script'],
    correct: 1,
    subject: '💻 Coding',
  },
]

const TIMER_SEC = 8

export default function HeroDemo() {
  const [qIdx,      setQIdx]      = useState(0)
  const [selected,  setSelected]  = useState<number | null>(null)
  const [timeLeft,  setTimeLeft]  = useState(TIMER_SEC)
  const [streak,    setStreak]    = useState(0)
  const [score,     setScore]     = useState(0)
  const [phase,     setPhase]     = useState<'question' | 'result' | 'done'>('question')

  const current = DEMO_QUESTIONS[qIdx]

  const advance = useCallback((answered: number | null) => {
    const correct = answered === current.correct
    if (correct) { setStreak(s => s + 1); setScore(s => s + 1) }
    else setStreak(0)

    setPhase('result')
    setTimeout(() => {
      if (qIdx + 1 < DEMO_QUESTIONS.length) {
        setQIdx(i => i + 1)
        setSelected(null)
        setTimeLeft(TIMER_SEC)
        setPhase('question')
      } else {
        setPhase('done')
      }
    }, 1400)
  }, [qIdx, current.correct])

  // Countdown timer
  useEffect(() => {
    if (phase !== 'question') return
    if (timeLeft <= 0) { advance(null); return }
    const t = setTimeout(() => setTimeLeft(n => n - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, phase, advance])

  // Auto-restart after done
  useEffect(() => {
    if (phase !== 'done') return
    const t = setTimeout(() => {
      setQIdx(0); setSelected(null); setTimeLeft(TIMER_SEC)
      setStreak(0); setScore(0); setPhase('question')
    }, 2800)
    return () => clearTimeout(t)
  }, [phase])

  const timerPct = (timeLeft / TIMER_SEC) * 100
  const timerColor = timeLeft <= 3 ? '#ef4444' : timeLeft <= 5 ? '#f59e0b' : '#3b82f6'

  return (
    <div
      className="rounded-2xl border border-blue-500/20 p-5 w-full max-w-md mx-auto"
      style={{ background: 'rgba(7,13,26,0.90)', backdropFilter: 'blur(20px)' }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-blue-400/70">
          {current.subject}
        </span>
        <div className="flex items-center gap-2">
          {streak > 0 && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">
              🔥 {streak}
            </span>
          )}
          <span className="text-[11px] text-white/30 font-mono">
            {qIdx + 1}/{DEMO_QUESTIONS.length}
          </span>
        </div>
      </div>

      {phase === 'done' ? (
        /* Done screen */
        <div className="text-center py-6">
          <div className="text-4xl mb-3">
            {score === DEMO_QUESTIONS.length ? '🏆' : score >= 2 ? '🎯' : '💪'}
          </div>
          <div className="text-white font-black text-lg mb-1">
            {score}/{DEMO_QUESTIONS.length} correct
          </div>
          <div className="text-white/40 text-xs">
            {score === DEMO_QUESTIONS.length ? 'Perfect score! Try another topic.' : 'Nice work — keep your streak going!'}
          </div>
          <div className="mt-4 h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700"
              style={{ width: `${(score / DEMO_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      ) : (
        <>
          {/* Timer bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-white/30 uppercase tracking-widest">Time</span>
              <span
                className="text-sm font-black tabular-nums transition-colors duration-300"
                style={{ color: timerColor }}
              >
                {timeLeft}s
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 linear"
                style={{ width: `${timerPct}%`, background: timerColor }}
              />
            </div>
          </div>

          {/* Question */}
          <p className="text-white font-bold text-sm leading-snug mb-4 min-h-[40px]">
            {current.q}
          </p>

          {/* Options */}
          <div className="grid grid-cols-1 gap-2">
            {current.options.map((opt, i) => {
              let state: 'idle' | 'correct' | 'wrong' | 'reveal' = 'idle'
              if (phase === 'result') {
                if (i === current.correct) state = 'correct'
                else if (i === selected) state = 'wrong'
                else state = 'reveal'
              }
              return (
                <button
                  key={i}
                  disabled={phase === 'result'}
                  onClick={() => { setSelected(i); advance(i) }}
                  className={[
                    'w-full text-left px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 border',
                    state === 'correct'
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                      : state === 'wrong'
                        ? 'bg-red-500/20 border-red-500/50 text-red-300'
                        : state === 'reveal'
                          ? 'bg-white/[0.02] border-white/[0.06] text-white/30'
                          : 'bg-white/[0.04] border-white/[0.08] text-white/80 hover:bg-blue-500/10 hover:border-blue-500/40 hover:text-white cursor-pointer',
                  ].join(' ')}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-white/[0.07] flex items-center justify-center text-[10px] font-black text-white/40 shrink-0">
                      {['A','B','C','D'][i]}
                    </span>
                    {opt}
                    {state === 'correct' && ' ✓'}
                    {state === 'wrong'   && ' ✗'}
                  </span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
