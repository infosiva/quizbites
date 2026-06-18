'use client'
// components/HowItWorksSection.tsx
import { motion } from 'framer-motion'
import { siteConfig } from '@/site.config'
import { FADE_UP, STAGGER_CONTAINER, useMotionVariants } from '@/lib/motion'

export default function HowItWorksSection() {
  const containerVars = useMotionVariants(STAGGER_CONTAINER(0.15))
  const itemVars      = useMotionVariants(FADE_UP)

  return (
    <section id="how-it-works" className="py-8 px-4 sm:px-6 max-w-5xl mx-auto border-t" style={{ borderColor: 'var(--border, #fde68a)' }}>
      <motion.div
        variants={containerVars as Parameters<typeof motion.div>[0]['variants']}
        initial="show"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={itemVars as Parameters<typeof motion.div>[0]['variants']} className="text-center mb-10">
          <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--foreground, #0f172a)' }}>Ready in 3 steps</h2>
          <p className="text-sm" style={{ color: 'var(--text-2, #475569)' }}>From blank page to live classroom quiz in under a minute</p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/8 text-emerald-700 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            No student accounts or downloads required
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px" style={{ background: 'var(--border, #fde68a)' }} aria-hidden="true" />

          {siteConfig.howItWorks.map((step) => (
            <motion.div key={step.step} variants={itemVars as Parameters<typeof motion.div>[0]['variants']} className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border" style={{ background: 'var(--surface-2, #fef9c3)', borderColor: 'var(--border, #fde68a)' }}>
                {step.icon}
              </div>
              <div className="text-3xl font-black tabular-nums leading-none" style={{ color: 'var(--border, #fde68a)' }}>
                {String(step.step).padStart(2, '0')}
              </div>
              <h3 className="font-bold text-base" style={{ color: 'var(--foreground, #0f172a)' }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2, #475569)' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
