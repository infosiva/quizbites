// QuizBites logo: glyph + wordmark, key word in the hub-switchable accent.
export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 800, letterSpacing: '-0.02em' }}>
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="color-mix(in oklab, var(--accent, #fbbf24) 18%, #12122b)" />
        <g fill="none" stroke="var(--accent, #fbbf24)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 16.5l4.5 4.5L23 11"/></g>
      </svg>
      <span>Quiz</span><span style={{ color: 'var(--accent, #fbbf24)' }}>Bites</span>
    </span>
  )
}
