'use client'
// components/HeroDemo.tsx — animated "type topic → quiz appears" teacher demo
// Shows the core QuizBites UX: teacher types a topic, AI generates quiz questions.
import { useState, useEffect } from 'react'
import MasteryBar from '@/components/MasteryBar'

const DEMO_TOPIC = 'World War II'

const GENERATED_QUESTIONS = [
  {
    q: 'Which event triggered the start of World War II?',
    options: ["Germany's invasion of Poland", "Attack on Pearl Harbor", "Fall of France", "The Treaty of Versailles"],
    correct: 0,
  },
  {
    q: 'Who led Nazi Germany during World War II?',
    options: ['Heinrich Himmler', 'Joseph Stalin', 'Adolf Hitler', 'Benito Mussolini'],
    correct: 2,
  },
  {
    q: 'What does D-Day refer to?',
    options: ['The bombing of Hiroshima', 'Allied invasion of Normandy', 'Germany\'s surrender', 'Battle of Stalingrad'],
    correct: 1,
  },
]

type Phase = 'typing' | 'generating' | 'questions'

export default function HeroDemo() {
  const [phase, setPhase]           = useState<Phase>('typing')
  const [typedText, setTypedText]   = useState('')
  const [visibleQs, setVisibleQs]   = useState(0)
  const [selected, setSelected]     = useState<Record<number, number>>({})

  // Typing animation
  useEffect(() => {
    if (phase !== 'typing') return
    if (typedText.length < DEMO_TOPIC.length) {
      const t = setTimeout(() => setTypedText(DEMO_TOPIC.slice(0, typedText.length + 1)), 80)
      return () => clearTimeout(t)
    }
    // Done typing — pause then generate
    const t = setTimeout(() => setPhase('generating'), 600)
    return () => clearTimeout(t)
  }, [phase, typedText])

  // Generating phase
  useEffect(() => {
    if (phase !== 'generating') return
    const t = setTimeout(() => { setVisibleQs(0); setPhase('questions') }, 1400)
    return () => clearTimeout(t)
  }, [phase])

  // Stagger questions in
  useEffect(() => {
    if (phase !== 'questions') return
    if (visibleQs < GENERATED_QUESTIONS.length) {
      const t = setTimeout(() => setVisibleQs(n => n + 1), 350)
      return () => clearTimeout(t)
    }
  }, [phase, visibleQs])

  // Auto-restart cycle
  useEffect(() => {
    if (phase !== 'questions' || visibleQs < GENERATED_QUESTIONS.length) return
    const t = setTimeout(() => {
      setTypedText('')
      setSelected({})
      setVisibleQs(0)
      setPhase('typing')
    }, 7000)
    return () => clearTimeout(t)
  }, [phase, visibleQs])

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
          {phase === 'questions' ? `${GENERATED_QUESTIONS.length} questions ready` : 'Generating…'}
        </span>
      </div>

      {/* Topic input row */}
      <div className="mb-4">
        <div className="text-[10px] text-white/35 uppercase tracking-widest mb-1.5 font-medium">
          Topic or chapter
        </div>
        <div
          className="flex items-center gap-2 rounded-xl border px-3.5 py-2.5 transition-colors duration-300"
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderColor: phase === 'typing' ? 'rgba(59,130,246,0.5)' : 'rgba(59,130,246,0.2)',
            boxShadow: phase === 'typing' ? '0 0 0 3px rgba(59,130,246,0.10)' : 'none',
          }}
        >
          <span className="text-sm text-white font-medium flex-1 min-h-[20px]">
            {typedText}
            {phase === 'typing' && (
              <span
                className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 align-middle"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            )}
          </span>
          <button
            className="shrink-0 rounded-lg px-3 py-1 text-[11px] font-bold text-white transition-all"
            style={{ background: 'rgba(37,99,235,0.9)' }}
          >
            Generate
          </button>
        </div>
      </div>

      {/* Generating spinner */}
      {phase === 'generating' && (
        <div className="flex flex-col items-center justify-center py-7 gap-3">
          <div
            className="w-8 h-8 rounded-full border-2 border-blue-500/30 border-t-blue-500"
            style={{ animation: 'spin 0.8s linear infinite' }}
          />
          <span className="text-[12px] text-white/40 font-medium">Creating quiz questions…</span>
        </div>
      )}

      {/* Generated questions */}
      {phase === 'questions' && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Quiz ready
            </span>
            <span className="text-[10px] text-white/25">No student accounts needed</span>
          </div>
          {GENERATED_QUESTIONS.slice(0, visibleQs).map((q, qi) => (
            <div
              key={qi}
              className="rounded-xl border border-white/[0.07] p-3 transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.03)',
                opacity: 1,
                transform: 'translateY(0)',
              }}
            >
              <p className="text-white/80 text-[12px] font-semibold leading-snug mb-2">
                <span className="text-blue-400/60 font-bold mr-1.5">Q{qi + 1}.</span>
                {q.q}
              </p>
              <div className="grid grid-cols-2 gap-1">
                {q.options.map((opt, oi) => {
                  const isSelected = selected[qi] === oi
                  const isCorrect  = oi === q.correct
                  const showResult = selected[qi] !== undefined
                  return (
                    <button
                      key={oi}
                      onClick={() => setSelected(s => ({ ...s, [qi]: oi }))}
                      className={[
                        'text-left rounded-lg px-2 py-1.5 text-[11px] font-medium transition-all duration-150 border',
                        showResult && isCorrect
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                          : showResult && isSelected && !isCorrect
                            ? 'bg-red-500/15 border-red-500/30 text-red-300'
                            : isSelected
                              ? 'bg-blue-500/20 border-blue-500/40 text-blue-200'
                              : 'bg-white/[0.03] border-white/[0.06] text-white/55 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-white/80',
                      ].join(' ')}
                    >
                      {['A','B','C','D'][oi]}. {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Share bar — shown when all questions visible */}
      {phase === 'questions' && visibleQs === GENERATED_QUESTIONS.length && (
        <div
          className="mt-3 flex items-center gap-2 rounded-xl border border-blue-500/20 px-3 py-2"
          style={{ background: 'rgba(37,99,235,0.07)' }}
        >
          <div className="flex-1 text-[11px] text-white/40 font-mono truncate">
            quizbites.app/q/ww2-demo
          </div>
          <button className="text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors shrink-0">
            Copy link
          </button>
        </div>
      )}

      {/* Mastery progress — shown in questions phase to demonstrate spaced-rep value */}
      {phase === 'questions' && visibleQs >= 2 && (
        <div
          className="mt-3 rounded-xl border border-white/[0.07] px-3 py-2"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold mb-1">
            Your mastery
          </p>
          <MasteryBar topic={DEMO_TOPIC} total={10} />
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
