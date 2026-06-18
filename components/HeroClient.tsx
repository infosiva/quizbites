'use client'
import { motion } from 'framer-motion'
import { STAGGER_CONTAINER, FADE_UP, SPRING_CINEMATIC, BUTTON_PRESS, useMotionVariants } from '@/lib/motion'
import { siteConfig } from '@/site.config'
import type { ContentOverrides } from '@/lib/content'
import Link from 'next/link'
import PromoCodeInput from '@/components/PromoCodeInput'

export default function HeroClient({ overrides = {} }: { overrides?: ContentOverrides }) {
  const variants  = useMotionVariants(STAGGER_CONTAINER(0.07))
  const childVars = useMotionVariants(FADE_UP)

  return (
    <motion.div
      variants={variants as Parameters<typeof motion.div>[0]['variants']}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-5"
    >
      {/* Badge */}
      <motion.div variants={childVars as Parameters<typeof motion.div>[0]['variants']}>
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest"
          style={{
            background: 'rgba(245,158,11,0.1)',
            border: '1px solid rgba(245,158,11,0.25)',
            boxShadow: 'inset 0 1px 0 rgba(245,158,11,0.12)',
            color: '#f59e0b',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          {siteConfig.heroBadge}
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={childVars as Parameters<typeof motion.h1>[0]['variants']}
        className="font-black tracking-tight"
        style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', lineHeight: 1.05, color: '#f1f5f9' }}
      >
        {(overrides.headline
          ? [overrides.headline]
          : siteConfig.headline
        ).map((line, i) => (
          <span key={i} className="block">
            {i === 1
              ? (
                <span
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 60%, #d97706 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 24px rgba(245,158,11,0.35))',
                  }}
                >
                  {line}
                </span>
              )
              : <span style={{ color: '#f1f5f9' }}>{line}</span>
            }
          </span>
        ))}
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        variants={childVars as Parameters<typeof motion.p>[0]['variants']}
        className="text-base leading-relaxed max-w-md"
        style={{ color: 'rgba(241,245,249,0.6)' }}
      >
        {overrides.subheadline ?? siteConfig.subheadline}
      </motion.p>

      {/* Free tier pills */}
      <motion.div
        variants={childVars as Parameters<typeof motion.div>[0]['variants']}
        className="flex flex-wrap gap-2"
      >
        {siteConfig.freeTier.pills.map(pill => (
          <span
            key={pill}
            className="text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(245,158,11,0.1)',
              color: '#fbbf24',
              border: '1px solid rgba(245,158,11,0.2)',
            }}
          >
            {pill}
          </span>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div
        variants={childVars as Parameters<typeof motion.div>[0]['variants']}
        className="flex flex-col sm:flex-row gap-3"
        id="hero-play-btn"
      >
        <motion.div {...BUTTON_PRESS} transition={SPRING_CINEMATIC}>
          <Link href={siteConfig.ctaPrimary.href}>
            <button
              className="px-8 py-4 text-base font-bold rounded-xl min-h-[52px] transition-opacity hover:opacity-90 active:scale-[0.97]"
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#000',
                boxShadow: '0 4px 20px rgba(245,158,11,0.35)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {overrides.cta ?? siteConfig.ctaPrimary.text}
            </button>
          </Link>
        </motion.div>

        <motion.div {...BUTTON_PRESS} transition={SPRING_CINEMATIC}>
          <Link
            href={siteConfig.ctaSecondary.href}
            className="inline-flex items-center justify-center gap-2 text-sm px-8 py-4 font-bold min-h-[52px] rounded-xl transition-all duration-150"
            style={{
              border: '1.5px solid rgba(255,255,255,0.15)',
              color: '#f1f5f9',
              background: 'rgba(255,255,255,0.05)',
            }}
          >
            {siteConfig.ctaSecondary.text}
          </Link>
        </motion.div>
      </motion.div>

      {/* Promo code link */}
      <motion.div variants={childVars as Parameters<typeof motion.div>[0]['variants']}>
        <PromoCodeInput />
      </motion.div>
    </motion.div>
  )
}
