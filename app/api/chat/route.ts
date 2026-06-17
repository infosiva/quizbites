import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'

let _groq: Groq | null = null
function getGroq() { if (!_groq) _groq = new Groq({ apiKey: process.env.GROQ_API_KEY! }); return _groq }

export const runtime = 'nodejs'

const RATE_LIMIT = new Map<string, { count: number; reset: number }>()
function checkRateLimit(ip: string) {
  const now = Date.now()
  const entry = RATE_LIMIT.get(ip) ?? { count: 0, reset: now + 3600_000 }
  if (now > entry.reset) { entry.count = 0; entry.reset = now + 3600_000 }
  entry.count++
  RATE_LIMIT.set(ip, entry)
  return entry.count <= 60
}

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

const SYSTEM_PROMPT = `You are QuizBot, the AI assistant for QuizBites — an AI-powered live quiz platform for teachers, students, and trivia enthusiasts.

You help with:
- Creating quizzes on any topic (suggest good questions by level)
- Explaining quiz answers in detail — WHY correct, WHY wrong answers are wrong
- Suggesting interesting or trending quiz topics
- Adapting explanations to the user's level: beginner (simple terms), intermediate (context + concepts), advanced (precise terminology + underlying theory)
- Making learning feel like a game — encouraging, specific, and energetic

When explaining an answer: always give the underlying concept, not just the fact. E.g. not "Paris is the capital" but "Paris became France's capital because..."

SAFETY (non-negotiable): Platform used by children, teens, and classrooms. Always friendly, age-appropriate, encouraging. Never violent, sexual, hateful, or harmful. If misused, redirect enthusiastically: "Let's get back to quiz time! What topic shall we tackle?"

If asked anything outside quizzes, learning, and trivia, say: "I'm QuizBot — trained for QuizBites! For that, try Google or ChatGPT."`

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const messages: Message[] = (body.messages ?? []).slice(-6)

    if (!messages?.length) {
      return NextResponse.json({ error: 'messages required' }, { status: 400 })
    }

    const chatMessages: Message[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m: Message) => ({ role: m.role, content: m.content.slice(0, 800) })),
    ]

    const tryGroq = async (model: string) => {
      const stream = await getGroq().chat.completions.create({
        model,
        messages: chatMessages,
        max_tokens: 600,
        temperature: 0.7,
        stream: true,
      })

      const readable = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder()
          try {
            for await (const chunk of stream) {
              const text = chunk.choices[0]?.delta?.content ?? ''
              if (text) controller.enqueue(encoder.encode(text))
            }
          } finally {
            controller.close()
          }
        },
      })

      return new NextResponse(readable, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
          'Cache-Control': 'no-cache',
        },
      })
    }

    // Fallback chain: llama-3.3-70b → llama-3.1-8b-instant
    try {
      return await tryGroq('llama-3.3-70b-versatile')
    } catch {
      try {
        return await tryGroq('llama-3.1-8b-instant')
      } catch {
        return NextResponse.json({ error: 'Chat is resting — try again in a moment.' }, { status: 503 })
      }
    }
  } catch (err) {
    console.error('[/api/chat]', err)
    return NextResponse.json({ error: 'Chat is resting — try again in a moment.' }, { status: 503 })
  }
}
