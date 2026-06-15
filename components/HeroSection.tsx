// components/HeroSection.tsx — server component
// Static HTML that crawlers read. HeroClient mounts stagger animation on top.
import { Suspense } from 'react'
import { siteConfig } from '@/site.config'
import { getContentOverrides } from '@/lib/content'
import HeroClient from './HeroClient'
import QuickQuiz from './QuickQuiz'

export default async function HeroSection() {
  const isSplit    = siteConfig.layout.heroVariant === 'split'
  const isCentered = siteConfig.layout.heroVariant === 'centered'
  const overrides  = await getContentOverrides()

  return (
    <section className="relative px-4 sm:px-6 pt-6 pb-10 max-w-6xl mx-auto">
      <div className={`grid grid-cols-1 ${
        isSplit    ? 'lg:grid-cols-2 gap-8 lg:gap-12 items-center' :
        isCentered ? 'max-w-3xl mx-auto text-center' :
                     'max-w-xl'
      }`}>
        {/* LEFT: HeroClient renders badge, H1, pills, CTAs — always first in DOM */}
        <div className="order-1">
          <HeroClient overrides={overrides} />
        </div>

        {/* RIGHT: inline playable quiz — zero auth, core action on landing */}
        {!isCentered && (
          <div className="order-2 lg:pl-4 mt-6 lg:mt-0">
            <QuickQuiz />
          </div>
        )}
      </div>
    </section>
  )
}
