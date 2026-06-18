'use client'
// components/FeaturesGrid.tsx — bento layout, whileInView stagger, blur-in
import { motion } from 'framer-motion'
import { siteConfig } from '@/site.config'
import { FADE_UP, STAGGER_CONTAINER, CARD_HOVER, SPRING_CINEMATIC, useMotionVariants } from '@/lib/motion'

export default function FeaturesGrid() {
  const containerVars = useMotionVariants(STAGGER_CONTAINER(0.1))
  const itemVars      = useMotionVariants(FADE_UP)

  return (
    <section id="features" className="py-8 px-4 sm:px-6 max-w-5xl mx-auto border-t" style={{ borderColor: 'var(--border, #fde68a)' }}>
      <div className="text-center mb-10">
        <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--foreground, #0f172a)' }}>Built for busy teachers</h2>
        <p className="text-sm" style={{ color: 'var(--text-2, #475569)' }}>Every feature is designed to save you time and give you real classroom insight</p>
      </div>

      <motion.div
        variants={containerVars as Parameters<typeof motion.div>[0]['variants']}
        initial="show"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-auto gap-4"
      >
        {siteConfig.features.map((f) => {
          const isLarge = f.size === 'large'
          const isWide  = f.size === 'wide'
          return (
            <motion.div
              key={f.title}
              variants={itemVars as Parameters<typeof motion.div>[0]['variants']}
              {...CARD_HOVER}
              transition={SPRING_CINEMATIC}
              className={`rounded-2xl border p-6 flex flex-col gap-3 cursor-default select-none
                ${isLarge ? 'md:col-span-1 md:row-span-2' : ''}
                ${isWide  ? 'sm:col-span-2 md:col-span-2' : ''}
              `}
              style={{ borderColor: 'var(--border, #fde68a)', background: 'var(--surface-1, #ffffff)' }}
            >
              <span className={`${isLarge ? 'text-4xl' : 'text-3xl'}`}>{f.icon}</span>
              <div className={`font-bold ${isLarge ? 'text-lg' : 'text-sm'}`} style={{ color: 'var(--foreground, #0f172a)' }}>{f.title}</div>
              <div className={`leading-relaxed ${isLarge ? 'text-sm' : 'text-xs'}`} style={{ color: 'var(--text-2, #475569)' }}>{f.desc}</div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
