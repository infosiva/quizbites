'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface TrendingTopic {
  topic: string
  category: string
  quizCount: number
}

export default function TrendingTopics() {
  const [topics, setTopics] = useState<TrendingTopic[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/trending')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data.topics) && data.topics.length > 0) {
          setTopics(data.topics)
        }
      })
      .catch(() => {})
  }, [])

  if (topics.length === 0) return null

  const filtered = search.trim()
    ? topics.filter(t =>
        t.topic.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase())
      )
    : topics

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-black text-slate-900 text-center mb-2">Trending Quiz Topics</h2>
        <p className="text-center text-slate-500 text-sm mb-8">See what others are quizzing — or search for your own</p>

        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search topics..."
            className="w-full rounded-xl border px-4 py-2.5 text-sm bg-white outline-none transition-shadow focus:ring-2"
            style={{
              borderColor: 'var(--border, #fde68a)',
              boxShadow: search ? '0 0 0 2px rgba(202,138,4,0.15)' : undefined,
            }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.slice(0, 12).map(t => (
            <Link
              key={t.topic}
              href={`/host?topic=${encodeURIComponent(t.topic)}`}
              className="rounded-xl border p-3 transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97] group"
              style={{ borderColor: 'var(--border, #fde68a)', background: '#fffef5' }}
            >
              <div className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 mb-1 line-clamp-2">
                {t.topic}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium">{t.category}</span>
                {t.quizCount > 0 && (
                  <span className="text-[10px] font-bold" style={{ color: 'var(--accent, #fbbf24)' }}>
                    {t.quizCount} quizzes
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && search.trim() && (
          <div className="text-center py-8">
            <p className="text-slate-400 text-sm mb-3">No topics found for &ldquo;{search}&rdquo;</p>
            <Link
              href={`/host?topic=${encodeURIComponent(search)}`}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.97]"
              style={{ background: 'var(--accent, #fbbf24)' }}
            >
              Create a quiz on &ldquo;{search}&rdquo; →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
