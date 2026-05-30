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

  heroBadge:    'AI Quiz Maker for Teachers · Spaced Repetition · Free to Start',
  headline:     ['The quiz that remembers', 'what you got wrong.'],
  subheadline:  'AI bite-size quizzes with spaced repetition — master any topic one question at a time.',
  ctaPrimary:   { text: 'Generate a Quiz Free →', href: '/host' },
  ctaSecondary: { text: 'See how it works', href: '/#how-it-works' },

  freeTier: {
    pills:             ['No student accounts', 'Works on any device', 'Free to start'],
    gateHeadline:      "You've hit today's free quiz limit.",
    gateSubtext:       "Upgrade to Pro for unlimited quizzes, class analytics, and shareable links.",
    gateCtaText:       'Upgrade to Pro — $7/mo',
    gateCtaHref:       '/pro',
    gateSecondaryText: 'Come back tomorrow for more free quizzes',
  },

  socialProof: {
    marqueeItems: [
      'World War II', 'Photosynthesis', 'Fractions', 'Shakespeare',
      'The Solar System', 'Python Basics', 'The American Revolution', 'Cell Biology',
      'Climate Change', 'Ancient Rome', 'Algebra', 'The Water Cycle',
    ],
  },

  howItWorks: [
    { step: 1, icon: '✏️', title: 'Type any topic',       desc: 'Enter a subject, chapter, or learning objective. Be as specific or broad as you need — AI handles the rest.' },
    { step: 2, icon: '⚡', title: 'Quiz ready in 10s',     desc: 'AI generates 5–10 multiple-choice questions with explanations. Review and edit before sharing with your class.' },
    { step: 3, icon: '📊', title: 'See class results live', desc: 'Students join with a link — no accounts needed. Watch responses come in and see where the class needs help.' },
  ],

  features: [
    { icon: '⚡', title: 'Quiz in 10 seconds',       desc: 'Type "causes of World War I" and get a full multiple-choice quiz instantly. No question bank hunting, no copy-pasting.',  size: 'large'  },
    { icon: '👤', title: 'No student accounts',       desc: 'Students join via a shared link. No usernames, no passwords, no friction. Works on any phone or tablet.',               size: 'medium' },
    { icon: '📊', title: 'Live class analytics',      desc: 'See every student\'s answers in real time. Instantly identify which concepts need more teaching.',                        size: 'medium' },
    { icon: '✏️', title: 'Edit before you share',     desc: 'Review AI-generated questions and edit any you want. You stay in control of what goes to your students.',               size: 'medium' },
    { icon: '📋', title: 'Export & reuse quizzes',    desc: 'Save quizzes to your library. Export results as CSV for gradebook or parent reports. Build your question bank over time.', size: 'wide'   },
  ],

  pricing: {
    free: {
      name: 'Free', price: '$0', period: 'forever',
      features: [
        { text: '5 AI quizzes per month',       included: true  },
        { text: 'Up to 30 students per quiz',   included: true  },
        { text: 'Live results view',            included: true  },
        { text: 'No student accounts needed',   included: true  },
        { text: 'Unlimited quizzes',            included: false },
        { text: 'Class analytics & export',     included: false },
      ],
      cta: { text: 'Start Free', href: '/host' },
    },
    pro: {
      name: 'Pro', price: '$7', period: '/month', badge: 'Most popular',
      features: [
        { text: 'Unlimited AI quizzes',         included: true },
        { text: 'Unlimited students per quiz',  included: true },
        { text: 'Full class analytics',         included: true },
        { text: 'CSV export for gradebook',     included: true },
        { text: 'Quiz library & reuse',         included: true },
        { text: 'Priority support',             included: true },
      ],
      cta: { text: 'Upgrade to Pro', href: '/pro' },
    },
  },

  faq: [
    { q: 'Do students need accounts or to download anything?',
      a: 'No. Students join by opening a link on any device — phone, tablet, laptop. No logins, no downloads, no friction.' },
    { q: 'How quickly does the AI generate a quiz?',
      a: 'Under 10 seconds for most topics. Type a subject or paste a paragraph, and QuizBites returns a complete multiple-choice quiz ready to share.' },
    { q: 'Can I edit the AI-generated questions before sharing?',
      a: 'Yes. After generation you can review, edit, delete, or add questions before sending the link to students.' },
    { q: 'What grade levels and subjects does it cover?',
      a: 'QuizBites works for any subject and any grade level — from elementary science to high school history and AP exam prep. The AI adapts to the complexity you specify.' },
    { q: 'How do I see student results?',
      a: 'A live dashboard shows responses as students answer. After the quiz you get a full breakdown: scores per student, question-level accuracy, and class average.' },
    { q: 'What does Pro unlock?',
      a: 'Pro removes the monthly quiz cap, unlocks class analytics, CSV export, and your personal quiz library for reuse. Cancel any time.' },
  ],

  finalCta: {
    headline: 'Save hours of quiz prep. Start for free.',
    subtext:  'No student accounts. No setup. Works on any device in your classroom.',
    ctaText:  'Generate a Quiz Free →',
    ctaHref:  '/host',
  },

  layout: {
    heroVariant:  'split',
    sectionOrder: ['hero', 'marquee', 'howItWorks', 'features', 'pricing', 'faq', 'finalCta'],
    hideSections: [],
  },

  seo: {
    title:          'QuizBites — Quiz Ready Before the Bell | AI Quiz Maker for Teachers',
    description:    'Generate a shareable classroom quiz from any topic in 10 seconds. No student logins, no prep. Live results and class analytics. Free to start.',
    ogImage:        '/og.png',
    llmsDescription: 'QuizBites at quizbites.app is an AI quiz maker for teachers. Type any topic and get a ready-to-run multiple-choice quiz in under 10 seconds. Students join via a link — no accounts or downloads required. Includes live class results, analytics, and CSV export. Free tier: 5 quizzes/month. Pro: unlimited quizzes, full analytics, quiz library.',
  },

  nav: [
    { label: 'Home',        href: '/' },
    { label: 'Features',    href: '/#features' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Pricing',     href: '/#pricing' },
    { label: 'Dashboard',   href: '/dashboard' },
  ],

  chatbot: {
    welcomeMessage: 'Hi! Tell me the topic and grade level — I\'ll build a quiz you can share with your class in seconds.',
    botName:        'QuizBites AI',
    placeholder:    'e.g. "Year 8 — causes of World War I"…',
  },
}

export default siteConfig
