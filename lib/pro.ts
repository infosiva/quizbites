// Pro status helpers — localStorage-backed, no server needed for basic gate

export const FREE_QUIZ_LIMIT = 3  // quizzes per day in free tier

export function isProUser(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('quizbites_pro') === '1'
}

export async function startCheckout(): Promise<void> {
  const res  = await fetch('/api/stripe/checkout', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ plan: 'monthly' }),
  })
  const data = await res.json()
  if (data.url) {
    window.location.href = data.url
  } else {
    throw new Error(data.error ?? 'Checkout unavailable')
  }
}
