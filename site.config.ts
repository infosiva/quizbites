// site.config.ts — THE ONLY FILE TO EDIT to rebrand or reconfigure this site
// All sections, copy, FAQ, pricing, and layout variants are driven from here.

export type HeroVariant = 'split' | 'centered' | 'minimal'

export interface SiteConfig {
  siteName: string
  domain: string
  themeColor: string
  heroBadge: string
  headline: string[]
  subheadline: string
  ctaPrimary: { text: string; href: string }
  ctaSecondary: { text: string; href: string }
  freeTier: {
    pills: string[]
    gateHeadline: string
    gateSubtext: string
    gateCtaText: string
    gateCtaHref: string
    gateSecondaryText: string
  }
  socialProof: {
    marqueeItems: string[]
    stat?: string
  }
  howItWorks: Array<{ step: number; icon: string; title: string; desc: string }>
  features: Array<{ icon: string; title: string; desc: string; size?: 'large' | 'wide' | 'medium' }>
  pricing: {
    free: { name: string; price: string; period: string; features: Array<{ text: string; included: boolean }>; cta: { text: string; href: string } }
    pro:  { name: string; price: string; period: string; badge?: string; features: Array<{ text: string; included: boolean }>; cta: { text: string; href: string } }
  }
  faq: Array<{ q: string; a: string }>
  finalCta: { headline: string; subtext: string; ctaText: string; ctaHref: string }
  layout: { heroVariant: HeroVariant; sectionOrder: string[]; hideSections: string[] }
  seo: { title: string; description: string; ogImage: string; llmsDescription: string }
  nav: Array<{ label: string; href: string }>
  chatbot: { welcomeMessage: string; botName: string; placeholder: string }
}

export const siteConfig: SiteConfig = {
  siteName:   'QuizBites',
  domain:     'quizbites.app',
  themeColor: 'blue',

  heroBadge:    'quizbites · bite-sized quizzes · free',
  headline:     ['Learning that', "feels addictive."],
  subheadline:  'Bite-sized quizzes powered by AI — pick any topic, answer 3 rapid-fire questions, and track your streak. No sign-up needed.',
  ctaPrimary:   { text: '⚡ Start Quizzing Free →', href: '/host' },
  ctaSecondary: { text: '📚 Browse Subjects',       href: '/#how-it-works' },

  freeTier: {
    pills:             ['⚡ 3 free quizzes/day', '📱 Any device', '🎯 No sign-up'],
    gateHeadline:      "You've used your 3 free quizzes today!",
    gateSubtext:       "Unlock unlimited daily quizzes and track your progress across all subjects.",
    gateCtaText:       'Upgrade to Pro — $4.99/mo',
    gateCtaHref:       '/pro',
    gateSecondaryText: 'Come back tomorrow for 3 more free quizzes',
  },

  socialProof: {
    marqueeItems: [
      '➕ Math', '🔬 Science', '📜 History', '📖 English',
      '💻 Coding', '🌍 Geography', '🎨 Art', '🎵 Music',
      '⚗️ Chemistry', '🧬 Biology', '🏛️ Civics', '🔭 Astronomy',
    ],
  },

  howItWorks: [
    { step: 1, icon: '🎯', title: 'Pick a subject',    desc: 'Choose from dozens of topics — Math, Science, History, Coding and more. Or type any custom topic.' },
    { step: 2, icon: '⚡', title: 'AI fires 3 questions', desc: 'Rapid-fire quiz: 3 questions with a countdown timer. Each question has AI-written explanations.' },
    { step: 3, icon: '🏆', title: 'Track your streak',  desc: 'Every correct answer builds your streak. Check your dashboard for stats, top topics and progress.' },
  ],

  features: [
    { icon: '⚡', title: 'Rapid-Fire Format',     desc: '3 questions per quiz with a countdown timer — short enough to do daily, engaging enough to keep coming back.',  size: 'large'  },
    { icon: '🤖', title: 'AI-Generated Questions', desc: 'Fresh questions every session — never the same quiz twice. AI covers any topic instantly.',                     size: 'medium' },
    { icon: '🏆', title: 'Streak Tracking',        desc: 'Daily streaks and quiz history motivate you to keep learning. See your top subjects at a glance.',              size: 'medium' },
    { icon: '📱', title: 'Works Everywhere',        desc: 'No app download. Works perfectly on phones, tablets and laptops in any browser.',                              size: 'medium' },
    { icon: '🎯', title: 'Instant Explanations',   desc: 'Every answer includes an AI explanation — learn from correct and wrong answers equally.',                        size: 'wide'   },
  ],

  pricing: {
    free: {
      name: 'Free', price: '$0', period: 'forever',
      features: [
        { text: '3 quizzes per day',         included: true  },
        { text: 'All core subjects',          included: true  },
        { text: 'AI explanations',            included: true  },
        { text: 'Streak tracking',            included: true  },
        { text: 'Unlimited daily quizzes',    included: false },
        { text: 'Progress analytics',         included: false },
      ],
      cta: { text: 'Start Free', href: '/host' },
    },
    pro: {
      name: 'Pro', price: '$4.99', period: '/month', badge: 'Popular',
      features: [
        { text: 'Unlimited quizzes per day',  included: true },
        { text: 'All 50+ subjects',           included: true },
        { text: 'Custom quiz topics',         included: true },
        { text: 'Full progress analytics',    included: true },
        { text: 'No ads — ever',              included: true },
        { text: 'Export quiz history',        included: true },
      ],
      cta: { text: 'Upgrade to Pro', href: '/pro' },
    },
  },

  faq: [
    { q: 'Is QuizBites free to use?',
      a: 'Yes — QuizBites is free. You get 3 quizzes every day with no credit card or account required.' },
    { q: 'How long is each quiz?',
      a: 'Each quiz is exactly 3 rapid-fire questions with a countdown timer per question. A full quiz takes about 60 seconds.' },
    { q: 'What subjects are available?',
      a: 'QuizBites covers Math, Science, History, English, Coding, Geography, Art, Music, Chemistry, Biology, Civics, Astronomy and more. You can also type any custom topic.' },
    { q: 'Is QuizBites good for students?',
      a: 'Absolutely. The bite-sized format is perfect for daily revision. Students, self-learners, and curious adults all use QuizBites to build knowledge day by day.' },
    { q: 'Do I need to create an account?',
      a: 'No account needed to start quizzing. Create an optional free account to track your streaks and quiz history over time.' },
    { q: 'What does Pro include?',
      a: 'Pro unlocks unlimited daily quizzes, all 50+ subjects, custom topic generation, full progress analytics, no ads, and quiz history export.' },
  ],

  finalCta: {
    headline: 'Ready to learn something new today?',
    subtext:  '3 free quizzes daily. No account needed. Works on any device.',
    ctaText:  '⚡ Start Quizzing Free →',
    ctaHref:  '/host',
  },

  layout: {
    heroVariant:  'split',
    sectionOrder: ['hero', 'marquee', 'howItWorks', 'features', 'pricing', 'faq', 'finalCta'],
    hideSections: [],
  },

  seo: {
    title:          'QuizBites — Bite-Sized AI Quizzes for Daily Learning',
    description:    'Rapid-fire quizzes powered by AI. Pick any subject, answer 3 questions, track your streak. Free, no sign-up, works on any device.',
    ogImage:        '/og.png',
    llmsDescription: 'QuizBites is a free AI-powered quiz app at quizbites.app. It generates 3-question rapid-fire quizzes on any subject — Math, Science, History, Coding and more. Free tier: 3 quizzes per day, no sign-up required. Pro: unlimited quizzes, all subjects, progress analytics, no ads.',
  },

  nav: [
    { label: 'Home',         href: '/' },
    { label: 'Features',     href: '/#features' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Pricing',      href: '/#pricing' },
    { label: 'Dashboard',    href: '/dashboard' },
  ],

  chatbot: {
    welcomeMessage: 'Hi! Ready to learn something? I can quiz you on any topic.',
    botName:        'QuizBot',
    placeholder:    'Ask me to quiz you…',
  },
}

export default siteConfig
