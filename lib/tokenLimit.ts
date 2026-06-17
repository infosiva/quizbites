const LIMITS = {
  free: { maxInputTokens: 800, maxOutputTokens: 400 },
  pro:  { maxInputTokens: 4000, maxOutputTokens: 2000 },
}

export function getTokenLimit(plan: 'free' | 'pro') { return LIMITS[plan] }
