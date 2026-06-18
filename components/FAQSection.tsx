'use client'
// components/FAQSection.tsx — Radix accordion, config-driven
// Content mirrors SchemaOrg JSON-LD — single source of truth in siteConfig.faq
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { siteConfig } from '@/site.config'

export default function FAQSection() {
  return (
    <section id="faq" className="py-8 px-4 sm:px-6 max-w-3xl mx-auto border-t" style={{ borderColor: 'var(--border, #fde68a)' }}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--foreground, #0f172a)' }}>Frequently asked questions</h2>
        <p className="text-sm" style={{ color: 'var(--text-2, #475569)' }}>Everything you need to know</p>
      </div>

      <Accordion.Root type="single" collapsible className="flex flex-col gap-2">
        {siteConfig.faq.map((item, i) => (
          <Accordion.Item
            key={i}
            value={String(i)}
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: 'var(--border, #fde68a)', background: 'var(--surface-1, #ffffff)' }}
          >
            <Accordion.Trigger
              className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold transition-colors group"
              style={{ color: 'var(--text-2, #475569)' }}
            >
              {item.q}
              <ChevronDown
                size={16}
                className="group-data-[state=open]:rotate-180 transition-transform duration-200 shrink-0 ml-3"
                style={{ color: 'var(--text-3, #64748b)' }}
              />
            </Accordion.Trigger>
            <Accordion.Content
              className="px-5 pb-4 text-sm leading-relaxed data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
              style={{ color: 'var(--text-3, #64748b)' }}
            >
              {item.a}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  )
}
