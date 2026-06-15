'use client'
import { useState } from 'react'

const questions = [
  {
    q: 'Which planet has the most moons in our solar system?',
    options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    correct: 1,
    explanation: 'Saturn has 146 confirmed moons — more than any other planet.',
  },
  {
    q: 'What year did the World Wide Web become publicly available?',
    options: ['1985', '1989', '1991', '1995'],
    correct: 2,
    explanation: 'Tim Berners-Lee made the WWW publicly available in 1991.',
  },
  {
    q: 'Which element has the chemical symbol "Au"?',
    options: ['Silver', 'Aluminum', 'Gold', 'Argon'],
    correct: 2,
    explanation: 'Au comes from "Aurum", the Latin word for gold.',
  },
]

export default function QuickQuiz() {
  const [current, setCurrent]   = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore]       = useState(0)
  const [done, setDone]         = useState(false)

  const q = questions[current]

  function handleAnswer(idx: number) {
    if (selected !== null) return
    setSelected(idx)
    if (idx === q.correct) setScore(s => s + 1)
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setDone(true)
      } else {
        setCurrent(c => c + 1)
        setSelected(null)
      }
    }, 1400)
  }

  function restart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setDone(false)
  }

  if (done) {
    return (
      <div
        className="rounded-2xl border border-blue-500/20 p-6 w-full max-w-md mx-auto flex flex-col items-center gap-4"
        style={{ background: 'rgba(5, 10, 24, 0.92)', backdropFilter: 'blur(20px)' }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 self-start">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400/80">
            QuizBites AI
          </span>
        </div>

        <div className="text-6xl font-black text-white">{score}/3</div>
        <p className="text-white/55 text-sm text-center">
          {score === 3
            ? 'Perfect score! You\'re a quiz master.'
            : score === 2
            ? 'Great job — one more go?'
            : 'Keep going — practice makes perfect.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-1">
          <button
            onClick={restart}
            className="flex-1 rounded-xl border border-blue-500/30 px-4 py-2.5 text-sm font-bold text-blue-300 hover:bg-blue-500/10 transition-colors"
          >
            Play Again
          </button>
          <a
            href="/host"
            className="flex-1 rounded-xl px-4 py-2.5 text-sm font-bold text-white text-center transition-all hover:opacity-90"
            style={{ background: 'rgba(37,99,235,1)' }}
          >
            Make your own quiz →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl border border-blue-500/20 p-5 w-full max-w-md mx-auto"
      style={{ background: 'rgba(5, 10, 24, 0.92)', backdropFilter: 'blur(20px)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400/80">
            QuizBites AI
          </span>
        </div>
        <span className="text-[10px] text-white/25 font-medium">
          {current + 1} / {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full mb-4 overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${((current) / questions.length) * 100}%`, background: 'rgba(37,99,235,0.9)' }}
        />
      </div>

      {/* Score */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] text-white/35 uppercase tracking-widest font-medium">Try a quick quiz</span>
        <span className="text-[11px] font-bold text-emerald-400">Score: {score}</span>
      </div>

      {/* Question */}
      <p className="text-white/90 text-sm font-semibold leading-snug mb-4">{q.q}</p>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect  = i === q.correct
          const showResult = selected !== null

          let bg          = 'rgba(255,255,255,0.03)'
          let borderColor = 'rgba(255,255,255,0.07)'
          let textColor   = 'rgba(255,255,255,0.6)'
          let cursor      = 'pointer'

          if (showResult) {
            cursor = 'default'
            if (isCorrect)               { bg = 'rgba(16,185,129,0.12)'; borderColor = 'rgba(52,211,153,0.4)'; textColor = 'rgba(52,211,153,1)' }
            else if (isSelected)         { bg = 'rgba(239,68,68,0.12)';  borderColor = 'rgba(248,113,113,0.4)'; textColor = 'rgba(248,113,113,1)' }
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              style={{
                background: bg,
                border: `1px solid ${borderColor}`,
                color: textColor,
                cursor,
                borderRadius: '0.625rem',
                padding: '0.625rem 0.875rem',
                textAlign: 'left',
                fontSize: '0.8125rem',
                fontWeight: showResult && isCorrect ? 600 : 400,
                transition: 'background 0.2s, border-color 0.2s, color 0.2s',
              }}
            >
              <span style={{ opacity: 0.5, marginRight: '0.5rem', fontSize: '0.75rem' }}>
                {['A', 'B', 'C', 'D'][i]}.
              </span>
              {opt}
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {selected !== null && (
        <p className="mt-3 text-[12px] text-white/45 leading-relaxed" style={{ fontStyle: 'italic' }}>
          💡 {q.explanation}
        </p>
      )}
    </div>
  )
}
