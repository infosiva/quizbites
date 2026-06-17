'use client'
import { motion } from 'framer-motion'
import { STAGGER_CONTAINER, FADE_UP, SPRING_CINEMATIC, BUTTON_PRESS, useMotionVariants } from '@/lib/motion'
import { siteConfig } from '@/site.config'
import type { ContentOverrides } from '@/lib/content'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { btn } from '@/lib/theme'
import Link from 'next/link'
import { Play } from 'lucide-react'
import PromoCodeInput from '@/components/PromoCodeInput'

export default function HeroClient({ overrides = {} }: { overrides?: ContentOverrides }) {
  const variants  = useMotionVariants(STAGGER_CONTAINER(0.06))
  const childVars = useMotionVariants(FADE_UP)

  return (
    <motion.div
      variants={variants as Parameters<typeof motion.div>[0]['variants']}
      initial="show"
      animate="show"
      className="flex flex-col gap-5"
    >
      {/* Badge */}
      <motion.div variants={childVars as Parameters<typeof motion.div>[0]['variants']}>
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest"
          style={{
            background: 'rgba(202,138,4,0.07)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(202,138,4,0.18)', boxShadow: 'inset 0 1px 0 rgba(202,138,4,0.1)',
            color: '#a16207',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
          {siteConfig.heroBadge}
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={childVars as Parameters<typeof motion.h1>[0]['variants']}
        className="font-black tracking-tight"
        style={{ fontSize: 'clamp(2.5rem, 5.5vw, 3.75rem)', lineHeight: 0.97 }}
      >
        {(overrides.headline
          ? [overrides.headline]
          : siteConfig.headline
        ).map((line, i) => (
          <span key={i} className="block">
            {i === 1
              ? <span className="bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 20px rgba(202,138,4,0.3))' }}>{line}</span>
              : <span className="text-slate-900">{line}</span>
            }
          </span>
        ))}
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        variants={childVars as Parameters<typeof motion.p>[0]['variants']}
        className="text-slate-500 text-base leading-relaxed max-w-md"
      >
        {overrides.subheadline ?? siteConfig.subheadline}
      </motion.p>

      {/* Free tier pills */}
      <motion.div
        variants={childVars as Parameters<typeof motion.div>[0]['variants']}
        className="flex flex-wrap gap-2"
      >
        {siteConfig.freeTier.pills.map(pill => (
          <span key={pill} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-200">{pill}</span>
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
            <ShimmerButton background="rgba(202, 138, 4, 1)" shimmerColor="#fef08a" className="px-8 py-4 text-base font-bold min-h-[52px]">
              {overrides.cta ?? siteConfig.ctaPrimary.text}
            </ShimmerButton>
          </Link>
        </motion.div>
        <motion.div {...BUTTON_PRESS} transition={SPRING_CINEMATIC}>
          <Link
            href={siteConfig.ctaSecondary.href}
            className="inline-flex items-center gap-2 text-sm px-8 py-4 font-bold min-h-[52px] rounded-xl border transition-all duration-150 hover:bg-yellow-100 active:scale-[0.97]"
            style={{ borderColor: 'var(--border, #fde68a)', color: 'var(--accent-2, #a16207)', background: 'transparent' }}
          >
            <Play size={15} /> {siteConfig.ctaSecondary.text}
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
