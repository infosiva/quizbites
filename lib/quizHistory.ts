// lib/quizHistory.ts — persistent quiz history + stats via localStorage
// Written at quiz end, read by dashboard. Works without any backend.

export interface QuizResult {
  id:          string
  playedAt:    string            // ISO
  topic:       string
  subject:     string
  score:       number
  total:       number
  bestStreak:  number
  durationSec: number | null
}

const KEY = 'quizbites_history'
const MAX = 100                  // keep last 100 quizzes

export function saveQuizResult(result: Omit<QuizResult, 'id' | 'playedAt'>): void {
  if (typeof window === 'undefined') return
  const history = loadHistory()
  const entry: QuizResult = {
    ...result,
    id:       Math.random().toString(36).slice(2) + Date.now().toString(36),
    playedAt: new Date().toISOString(),
  }
  const updated = [entry, ...history].slice(0, MAX)
  try { localStorage.setItem(KEY, JSON.stringify(updated)) } catch {}
}

export function loadHistory(): QuizResult[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(KEY)
}

export interface DashboardStats {
  totalQuizzes:    number
  totalQuestions:  number
  avgScore:        number        // 0-100
  bestStreak:      number
  topTopics:       Array<{ topic: string; count: number }>
  recentQuizzes:   QuizResult[]
  currentStreak:   number        // days in a row with at least 1 quiz
}

export function computeStats(): DashboardStats {
  const history = loadHistory()

  if (history.length === 0) {
    return { totalQuizzes: 0, totalQuestions: 0, avgScore: 0, bestStreak: 0, topTopics: [], recentQuizzes: [], currentStreak: 0 }
  }

  let totalQ = 0, totalCorrect = 0, bestStreak = 0
  const topicCount: Record<string, number> = {}

  for (const q of history) {
    totalQ       += q.total
    totalCorrect += q.score
    bestStreak    = Math.max(bestStreak, q.bestStreak)
    topicCount[q.topic] = (topicCount[q.topic] ?? 0) + 1
  }

  const topTopics = Object.entries(topicCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([topic, count]) => ({ topic, count }))

  // Daily streak — count consecutive days (from today backwards) with ≥1 quiz
  const daySet = new Set(history.map(q => q.playedAt.slice(0, 10)))
  let currentStreak = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    if (daySet.has(key)) currentStreak++
    else break
  }

  return {
    totalQuizzes:   history.length,
    totalQuestions: totalQ,
    avgScore:       totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0,
    bestStreak,
    topTopics,
    recentQuizzes:  history.slice(0, 5),
    currentStreak,
  }
}
