'use client'
import { useState, useEffect } from 'react'

const questions = [
  {
    q: 'What is the powerhouse of the cell?',
    options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Vacuole'],
    correct: 0,
    explanation: 'Mitochondria produce ATP — the energy currency of the cell.',
    cat: '🧬 Biology',
  },
  {
    q: 'Which planet has the most moons in our solar system?',
    options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    correct: 1,
    explanation: 'Saturn has 146 confirmed moons — more than any other planet.',
    cat: '🪐 Space',
  },
  {
    q: 'Which element has the chemical symbol "Au"?',
    options: ['Silver', 'Aluminum', 'Gold', 'Argon'],
    correct: 2,
    explanation: 'Au comes from "Aurum", the Latin word for gold.',
    cat: '⚗️ Chemistry',
  },
  {
    q: 'Who painted the Mona Lisa?',
    options: ['Picasso', 'Da Vinci', 'Monet', 'Raphael'],
    correct: 1,
    explanation: 'Leonardo da Vinci painted it c. 1503–1519.',
    cat: '🎨 Art',
  },
]

export default function QuickQuiz() {
  const [current, setCurrent]   = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore]       = useState(0)
  const [done, setDone]         = useState(false)
  const [flipping, setFlipping] = useState(false)

  // Auto-cycle when no interaction after 5s on current question
  useEffect(() => {
    if (selected !== null || done) return
    const t = setTimeout(() => {
      setFlipping(true)
      setTimeout(() => {
        setCurrent(c => (c + 1) % questions.length)
        setFlipping(false)
      }, 250)
    }, 5000)
    return () => clearTimeout(t)
  }, [current, selected, done])

  const q = questions[current]

  function handleAnswer(idx: number) {
    if (selected !== null) return
    setSelected(idx)
    if (idx === q.correct) setScore(s => s + 1)
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setDone(true)
      } else {
        setFlipping(true)
        setTimeout(() => {
          setCurrent(c => c + 1)
          setSelected(null)
          setFlipping(false)
        }, 250)
      }
    }, 1400)
  }

  function restart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setDone(false)
    setFlipping(false)
  }

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '1.25rem',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06) inset',
    transition: 'opacity 0.25s cubic-bezier(0.23,1,0.32,1), transform 0.25s cubic-bezier(0.23,1,0.32,1)',
    opacity: flipping ? 0 : 1,
    transform: flipping ? 'scale(0.97) translateY(4px)' : 'scale(1) translateY(0)',
  }

  if (done) {
    return (
      <div className="p-6 w-full max-w-md mx-auto flex flex-col items-center gap-4" style={{ ...cardStyle, opacity: 1, transform: 'none' }}>
        <div className="flex items-center gap-2 self-start">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#fbbf24' }} />
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#fbbf24' }}>
            QuizBites AI
          </span>
        </div>

        <div className="text-6xl font-black" style={{ color: '#fbbf24' }}>{score}/{questions.length}</div>
        <p className="text-sm text-center" style={{ color: 'rgba(241,245,249,0.6)' }}>
          {score === questions.length
            ? 'Perfect score! You\'re a quiz master.'
            : score >= questions.length / 2
            ? 'Great job — one more go?'
            : 'Keep going — practice makes perfect.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-1">
          <button
            onClick={restart}
            className="flex-1 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all active:scale-[0.97]"
            style={{ borderColor: 'rgba(251,191,36,0.3)', color: '#fbbf24', background: 'rgba(251,191,36,0.08)' }}
          >
            Play Again
          </button>
          <a
            href="/host"
            className="flex-1 rounded-xl px-4 py-2.5 text-sm font-bold text-center transition-all hover:opacity-90 active:scale-[0.97]"
            style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #ca8a04 100%)', color: '#000' }}
          >
            Make your own quiz →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="p-5 w-full max-w-md mx-auto" style={cardStyle}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#fbbf24' }} />
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: '#fbbf24' }}>
            QuizBites AI
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
            style={{ background: 'rgba(251,191,36,0.12)', color: '#fbbf24' }}
          >
            {q.cat}
          </span>
          <span className="text-[10px] font-medium" style={{ color: 'rgba(241,245,249,0.4)' }}>
            {current + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full mb-4 overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${((current) / questions.length) * 100}%`, background: 'linear-gradient(90deg, #fbbf24, #fbbf24)' }}
        />
      </div>

      {/* Score */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: 'rgba(241,245,249,0.4)' }}>
          Try a quick quiz
        </span>
        <span className="text-[11px] font-bold" style={{ color: '#10b981' }}>Score: {score}</span>
      </div>

      {/* Question */}
      <p className="text-sm font-semibold leading-snug mb-4" style={{ color: '#f1f5f9' }}>{q.q}</p>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect  = i === q.correct
          const showResult = selected !== null

          let bg          = 'rgba(255,255,255,0.04)'
          let borderColor = 'rgba(255,255,255,0.1)'
          let textColor   = 'rgba(241,245,249,0.85)'
          const cursor      = showResult ? 'default' : 'pointer'

          if (showResult) {
            if (isCorrect)       { bg = 'rgba(16,185,129,0.1)';  borderColor = 'rgba(16,185,129,0.4)';  textColor = '#10b981' }
            else if (isSelected) { bg = 'rgba(239,68,68,0.08)';  borderColor = 'rgba(239,68,68,0.35)';  textColor = '#ef4444' }
          } else if (isSelected) {
            bg = 'rgba(251,191,36,0.1)'
            borderColor = 'rgba(251,191,36,0.4)'
            textColor = '#fbbf24'
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              style={{
                background: bg,
                border: `1.5px solid ${borderColor}`,
                color: textColor,
                cursor,
                borderRadius: '0.625rem',
                padding: '0.625rem 0.875rem',
                textAlign: 'left',
                fontSize: '0.8125rem',
                fontWeight: showResult && isCorrect ? 600 : 400,
                transition: 'background 0.15s, border-color 0.15s, color 0.15s',
              }}
            >
              <span style={{ opacity: 0.45, marginRight: '0.5rem', fontSize: '0.75rem' }}>
                {['A', 'B', 'C', 'D'][i]}.
              </span>
              {opt}
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {selected !== null && (
        <p
          className="mt-3 text-[12px] leading-relaxed"
          style={{ color: 'rgba(241,245,249,0.5)', fontStyle: 'italic' }}
        >
          💡 {q.explanation}
        </p>
      )}

      {/* Auto-cycle hint */}
      {selected === null && (
        <p className="mt-3 text-[10px] text-center" style={{ color: 'rgba(241,245,249,0.25)' }}>
          Auto-cycles · tap an answer to play
        </p>
      )}
    </div>
  )
}
