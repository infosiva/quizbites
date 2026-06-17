import { NextResponse } from 'next/server'

let sessionCounts = {
  quizzesGenerated: 0,
  questionsAnswered: 0,
  topicsExplored: 0,
}

export async function GET() {
  return NextResponse.json(sessionCounts)
}

export async function POST(req: Request) {
  const { event } = await req.json()
  if (event === 'quiz_generated') sessionCounts.quizzesGenerated++
  if (event === 'question_answered') sessionCounts.questionsAnswered++
  if (event === 'topic_explored') sessionCounts.topicsExplored++
  return NextResponse.json({ ok: true })
}
