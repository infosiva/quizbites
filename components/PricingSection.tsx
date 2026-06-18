// components/PricingSection.tsx — server component, transparent free vs pro comparison
import { siteConfig } from '@/site.config'
import { theme } from '@/lib/theme'
import Link from 'next/link'

export default function PricingSection() {
  const { free, pro } = siteConfig.pricing

  return (
    <section id="pricing" className="py-8 px-4 sm:px-6 max-w-4xl mx-auto border-t" style={{ borderColor: 'var(--border, #fde68a)' }}>
      <div className="text-center mb-10">
        <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--foreground, #0f172a)' }}>Free vs Pro</h2>
        <p className="text-sm" style={{ color: 'var(--text-2, #475569)' }}>Transparent pricing — no surprises</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* FREE */}
        <div className="rounded-2xl border p-6 flex flex-col gap-4" style={{ borderColor: 'var(--border, #fde68a)', background: 'var(--surface-1, #ffffff)' }}>
          <div>
            <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-3, #64748b)' }}>{free.name}</div>
            <div className="text-3xl font-black" style={{ color: 'var(--foreground, #0f172a)' }}>{free.price}</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--text-3, #64748b)' }}>{free.period}</div>
          </div>
          <ul className="flex flex-col gap-2.5 flex-1">
            {free.features.map(f => (
              <li key={f.text} className="flex items-center gap-2.5 text-sm">
                <span className={f.included ? 'text-emerald-600' : ''} style={!f.included ? { color: 'var(--text-3, #64748b)', opacity: 0.5 } : undefined}>{f.included ? '✓' : '✗'}</span>
                <span className={f.included ? '' : 'line-through'} style={{ color: 'var(--text-2, #475569)', opacity: f.included ? 1 : 0.6 }}>{f.text}</span>
              </li>
            ))}
          </ul>
          <Link
            href={free.cta.href}
            className="mt-2 block text-center px-5 py-3 rounded-xl border text-sm font-bold transition-all hover:opacity-80"
            style={{ borderColor: 'var(--border, #fde68a)', color: 'var(--text-2, #475569)' }}
          >
            {free.cta.text}
          </Link>
        </div>

        {/* PRO */}
        <div
          className="rounded-2xl border p-6 flex flex-col gap-4 relative overflow-hidden"
          style={{ borderColor: 'rgba(37,99,235,0.4)', background: 'rgba(37,99,235,0.08)' }}
        >
          {pro.badge && (
            <span className={`absolute top-4 right-4 text-xs font-black px-2.5 py-1 rounded-full bg-gradient-to-r ${theme.gradient} text-white`}>
              {pro.badge}
            </span>
          )}
          <div>
            <div className={`${theme.textAccent} text-xs font-black uppercase tracking-widest mb-1`}>{pro.name}</div>
            <div className="text-3xl font-black" style={{ color: 'var(--foreground, #0f172a)' }}>{pro.price}</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--text-3, #64748b)' }}>{pro.period}</div>
          </div>
          <ul className="flex flex-col gap-2.5 flex-1">
            {pro.features.map(f => (
              <li key={f.text} className="flex items-center gap-2.5 text-sm">
                <span className="text-emerald-600">✓</span>
                <span style={{ color: 'var(--text-2, #475569)' }}>{f.text}</span>
              </li>
            ))}
          </ul>
          <Link
            href={pro.cta.href}
            className={`mt-2 block text-center px-5 py-3 rounded-xl bg-gradient-to-r ${theme.gradient} text-white text-sm font-bold hover:opacity-90 transition-opacity`}
          >
            {pro.cta.text}
          </Link>
        </div>
      </div>
    </section>
  )
}
