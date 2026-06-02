'use client'
// components/HeroClient.tsx — mounts Framer stagger animation over server-rendered hero copy
import { motion } from 'framer-motion'
import { STAGGER_CONTAINER, FADE_UP, SPRING_CINEMATIC, BUTTON_PRESS, useMotionVariants } from '@/lib/motion'
import { siteConfig } from '@/site.config'
import type { ContentOverrides } from '@/lib/content'
import { ShimmerButton } from '@/components/magicui/shimmer-button'
import { theme, btn } from '@/lib/theme'
import Link from 'next/link'
import { Play } from 'lucide-react'

export default function HeroClient({ overrides = {} }: { overrides?: ContentOverrides }) {
  const variants  = useMotionVariants(STAGGER_CONTAINER(0.06))
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
            background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.09)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
            color: 'rgba(147,197,253,0.82)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          {siteConfig.heroBadge}
        </span>
      </motion.div>

      {/* Headline — each line staggered */}
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
              ? <span className={theme.gradientText} style={{ filter: 'drop-shadow(0 0 36px rgba(37,99,235,0.55))' }}>{line}</span>
              : <span className="text-white">{line}</span>
            }
          </span>
        ))}
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        variants={childVars as Parameters<typeof motion.p>[0]['variants']}
        className="text-white/55 text-base leading-relaxed max-w-md"
      >
        {overrides.subheadline ?? siteConfig.subheadline}
      </motion.p>

      {/* Free tier pills */}
      <motion.div
        variants={childVars as Parameters<typeof motion.div>[0]['variants']}
        className="flex flex-wrap gap-2"
      >
        {siteConfig.freeTier.pills.map(pill => (
          <span key={pill} className={`text-xs font-semibold px-3 py-1.5 rounded-full ${theme.badge}`}>{pill}</span>
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
            <ShimmerButton background="rgba(37, 99, 235, 1)" shimmerColor="#bfdbfe" className="px-8 py-4 text-base font-bold min-h-[52px]">
              {overrides.cta ?? siteConfig.ctaPrimary.text}
            </ShimmerButton>
          </Link>
        </motion.div>
        <motion.div {...BUTTON_PRESS} transition={SPRING_CINEMATIC}>
          <Link href={siteConfig.ctaSecondary.href} className={btn.secondary + ' text-sm px-8 py-4 font-bold min-h-[52px] flex items-center gap-2'}>
            <Play size={15} /> {siteConfig.ctaSecondary.text}
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
