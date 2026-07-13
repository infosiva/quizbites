'use client'
import { siteConfig } from '@/site.config'
import PromoCodeInput from '@/components/PromoCodeInput'
import Link from 'next/link'

export default function PlanPreview() {
  const { pricing } = siteConfig

  return (
    <section className="py-16 px-4" id="plans">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-black text-center text-slate-900 mb-2">What You Get</h2>
        <p className="text-center text-slate-500 text-sm mb-10">Try free first — upgrade only when you need more</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Free */}
          <div className="rounded-2xl border p-6 flex flex-col" style={{ borderColor: 'var(--border, #fde68a)', background: '#ffffff' }}>
            <div className="mb-4">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{pricing.free.name}</span>
              <div className="mt-1">
                <span className="text-3xl font-black text-slate-900">{pricing.free.price}</span>
                <span className="text-sm text-slate-400 ml-1">{pricing.free.period}</span>
              </div>
            </div>

            <ul className="flex-1 flex flex-col gap-2.5 mb-6">
              {pricing.free.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className={f.included ? 'text-emerald-500' : 'text-slate-300'}>
                    {f.included ? '✓' : '✗'}
                  </span>
                  <span className={f.included ? 'text-slate-700' : 'text-slate-400'}>{f.text}</span>
                </li>
              ))}
            </ul>

            <Link
              href={pricing.free.cta.href}
              className="block text-center rounded-xl border py-2.5 font-semibold text-slate-600 transition-colors hover:bg-yellow-50"
              style={{ borderColor: 'var(--border, #fde68a)' }}
            >
              {pricing.free.cta.text}
            </Link>
          </div>

          {/* Pro */}
          <div
            className="rounded-2xl border p-6 flex flex-col relative"
            style={{
              borderColor: 'var(--accent, #fbbf24)',
              background: '#ffffff',
              boxShadow: '0 0 24px rgba(202,138,4,0.12)',
              transform: 'translateY(-4px)',
            }}
          >
            {pricing.pro.badge && (
              <span
                className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-[11px] font-bold text-white"
                style={{ background: 'var(--accent, #fbbf24)' }}
              >
                {pricing.pro.badge}
              </span>
            )}

            <div className="mb-4">
              <span className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--accent, #fbbf24)' }}>
                {pricing.pro.name}
              </span>
              <div className="mt-1">
                <span className="text-3xl font-black text-slate-900">{pricing.pro.price}</span>
                <span className="text-sm text-slate-400 ml-1">{pricing.pro.period}</span>
              </div>
            </div>

            <ul className="flex-1 flex flex-col gap-2.5 mb-6">
              {pricing.pro.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span style={{ color: 'var(--accent, #fbbf24)' }}>✓</span>
                  <span className="text-slate-700">{f.text}</span>
                </li>
              ))}
            </ul>

            <Link
              href={pricing.pro.cta.href}
              className="block text-center rounded-xl py-2.5 font-bold text-white transition-all hover:opacity-90 active:scale-[0.97]"
              style={{ background: 'var(--accent, #fbbf24)' }}
            >
              {pricing.pro.cta.text}
            </Link>

            <div className="mt-3 flex justify-center">
              <PromoCodeInput />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
