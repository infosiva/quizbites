// components/MarqueeBar.tsx — server component, CSS-only animation (zero JS)
import { siteConfig } from '@/site.config'

export default function MarqueeBar() {
  // Duplicate items so CSS loop is seamless
  const items = [...siteConfig.socialProof.marqueeItems, ...siteConfig.socialProof.marqueeItems]

  return (
    <section aria-label="Quiz subjects" className="py-6 border-y overflow-hidden" style={{ borderColor: 'var(--border, #fde68a)' }}>
      <div className="marquee-wrapper">
        <div className="marquee-track gap-8">
          {items.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-sm font-medium whitespace-nowrap select-none px-3"
              style={{ color: 'var(--text-3, #64748b)' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
