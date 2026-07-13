import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import Script from 'next/script'

const outfit = Outfit({ subsets: ['latin'], weight: ['700', '800', '900'], variable: '--font-display' })
import './globals.css'
import config from '@/vertical.config'
import { getScrollbarColor, COLOR_MAP } from '@/lib/themeColors'
import PageTracker from '@/components/PageTracker'
import Navbar from '@/components/Navbar'
import FooterExtras from '@/components/FooterExtras'
import ChatBot from '@/components/ChatBot'
import { getSiteFlags } from '@/lib/flags'
import Providers from '@/components/Providers'
import FeedbackWidget from '@/components/FeedbackWidget'
import BackToTop from '@/components/BackToTop'
import CookieConsent from "../components/CookieConsent";
import Footer from "../components/Footer";
import StickyFooterCTA from "../components/StickyFooterCTA";
import SchemaOrg from '@/components/SchemaOrg'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })

import siteConfig from '@/site.config'

const SITE_URL = `https://${siteConfig.domain}`

export const metadata: Metadata = {
  title:       siteConfig.seo.title,
  description: siteConfig.seo.description,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title:       siteConfig.seo.title,
    description: siteConfig.seo.description,
    url:         SITE_URL,
    siteName:    siteConfig.siteName,
    type:        'website',
    locale:      'en_US',
    images: [
      {
        url:   `${SITE_URL}/og.png`,
        width:  1200,
        height: 630,
        alt:    `${siteConfig.siteName} — ${siteConfig.subheadline}`,
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       siteConfig.seo.title,
    description: siteConfig.seo.description,
    images:      [`${SITE_URL}/opengraph-image`],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

// Derive CSS custom properties from vertical theme at build time
const colors = COLOR_MAP[config.themeColor] ?? COLOR_MAP['violet']

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const flags = await getSiteFlags('quizbites')
  return (
    <html
      lang="en"
      className="h-full"
      style={{
        // CSS vars consumed by globals.css animations and scrollbar
        '--theme-primary':   colors.primary,
        '--theme-secondary': colors.secondary,
        '--theme-base':      colors.base,
        '--scrollbar-color': getScrollbarColor(config.themeColor),
      } as React.CSSProperties}
      suppressHydrationWarning
    >
      <body className={`${inter.variable} ${outfit.variable} min-h-full flex flex-col text-slate-900`}
        style={{ background: 'var(--background, #fefce8)', fontFamily: 'var(--font-body, system-ui)' }}
      >

        <SchemaOrg />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4237294630161176"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <PageTracker site='questly' />
        <Navbar />

        <Providers>
          <main className="flex-1">
            {children}
          </main>
        </Providers>

        {flags.chatbot && <ChatBot />}
        <FeedbackWidget siteName="QuizBites" accentColor="#fbbf24" accentColor2="#ca8a04" position={flags.chatbot ? 'left' : 'right'} />
        <BackToTop accentColor="#fbbf24" />

        <FooterExtras />
        <Footer siteName={config.name} />
      <CookieConsent />
        <StickyFooterCTA />
        <Script defer data-domain="quizbites.app" src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        <Script defer data-site="quizbites.app" src="http://31.97.56.148:3098/t.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
