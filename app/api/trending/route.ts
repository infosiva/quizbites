import { NextResponse } from 'next/server'

interface TopicEntry {
  topic: string
  category: string
  quizCount: number
}

// In-memory log of real topics generated this server instance
const generatedTopics: Map<string, TopicEntry> = new Map()

export function logTopic(topic: string, category: string) {
  const key = topic.toLowerCase()
  const existing = generatedTopics.get(key)
  if (existing) {
    existing.quizCount++
  } else {
    generatedTopics.set(key, { topic, category, quizCount: 1 })
  }
}

export async function GET() {
  const topics = Array.from(generatedTopics.values())
    .sort((a, b) => b.quizCount - a.quizCount)

  return NextResponse.json({ topics })
}

export async function POST(req: Request) {
  const { topic, category } = await req.json()
  if (!topic || typeof topic !== 'string') {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
  logTopic(topic.trim(), (category ?? 'General').trim())
  return NextResponse.json({ ok: true })
}
