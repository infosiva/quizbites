import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import Script from 'next/script'

const outfit = Outfit({ subsets: ['latin'], weight: ['700', '800', '900'], variable: '--font-display' })
import './globals.css'
import config from '@/vertical.config'
import { getMeshStyle, getScrollbarColor, COLOR_MAP } from '@/lib/themeColors'
import PageTracker from '@/components/PageTracker'
import Navbar from '@/components/Navbar'
import FooterExtras from '@/components/FooterExtras'
import ChatBot from '@/components/ChatBot'
import Providers from '@/components/Providers'
import FeedbackWidget from '@/components/FeedbackWidget'
import CookieConsent from "../components/CookieConsent";
import Footer from "../components/Footer";
import StickyFooterCTA from "../components/StickyFooterCTA";

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })

import siteConfig from '@/site.config'

export const metadata: Metadata = {
  title:       siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords:    siteConfig.seo.keywords,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title:       siteConfig.seo.title,
    description: siteConfig.seo.description,
    url:         siteConfig.url,
    siteName:    siteConfig.name,
    type:        'website',
    locale:      'en_US',
    images: [
      {
        url:   `${siteConfig.url}/og.png`,
        width:  1200,
        height: 630,
        alt:    `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       siteConfig.seo.title,
    description: siteConfig.seo.description,
    images:      [`${siteConfig.url}/opengraph-image`],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

// Derive CSS custom properties from vertical theme at build time
const colors   = COLOR_MAP[config.themeColor] ?? COLOR_MAP['violet']
const meshStyle = getMeshStyle(config.themeColor)

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      <body className={`${inter.variable} ${outfit.variable} min-h-full flex flex-col text-white`}
        style={{ background: colors.base, fontFamily: 'var(--font-body, system-ui)' }}
      >
        {/* Dynamic mesh gradient bg — changes per vertical */}
        <div style={meshStyle} />
        {/* Animated blob overlays */}
        <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
          <div className="mesh-blob1" style={{ position: 'absolute', top: '-20%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${colors.primary}22 0%, transparent 65%)`, filter: 'blur(40px)' }} />
          <div className="mesh-blob2" style={{ position: 'absolute', top: '30%', right: '-15%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${colors.secondary}18 0%, transparent 65%)`, filter: 'blur(40px)' }} />
          <div className="mesh-blob3" style={{ position: 'absolute', bottom: '-15%', left: '40%', width: 450, height: 450, borderRadius: '50%', background: `radial-gradient(circle, ${colors.primary}15 0%, transparent 65%)`, filter: 'blur(40px)' }} />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "SoftwareApplication",
                "name": siteConfig.name,
                "url": siteConfig.url,
                "description": siteConfig.description,
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "Web",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
              },
              { "@type": "WebSite", "name": siteConfig.name, "url": siteConfig.url },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Is QuizBites free for teachers?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Yes — QuizBites is free to use. Teachers can host live AI-generated quizzes with no account required." }
                  },
                  {
                    "@type": "Question",
                    "name": "How do students join a QuizBites session?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Students join by entering the 6-character session code at quizbites.app/join — no app download or account needed, works on any device." }
                  },
                  {
                    "@type": "Question",
                    "name": "How does QuizBites generate quiz questions?",
                    "acceptedAnswer": { "@type": "Answer", "text": "QuizBites uses AI (Groq, Gemini, and Anthropic models) to generate topic-specific questions with multiple-choice options and explanations in seconds." }
                  }
                ]
              }
            ]
          })}}
        />
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

        <ChatBot />
        <FeedbackWidget siteName="QuizBites" accentColor="#3b82f6" accentColor2="#6366f1" />

        <FooterExtras />
        <Footer siteName={config.name} />
      <CookieConsent />
        <StickyFooterCTA />
        <Script async src="http://31.97.56.148:3100/script.js" data-website-id="9d57747b-6a7d-46a7-97de-b083896131b0" strategy="afterInteractive" />
      </body>
    </html>
  )
}
