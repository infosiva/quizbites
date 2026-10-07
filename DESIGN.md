# DESIGN.md - QuizBites

Source of truth: `agents/design-system` (MASTER.md, `ds-source` skill). Reuse from there before building; new reusable pieces go there first.

## Identity
- Product: QuizBites (AI quiz maker for teachers)
- Accent: `#fbbf24` (unique in the portfolio per `design-system/scripts/check-palettes.mjs`; kept from the existing design)
- Base background: `#12122b`
- Logo: `components/Logo.tsx` (glyph + wordmark, key word in `var(--accent)`), used in the header; favicon is `app/icon.svg` (no `icon.tsx`).
- Background: `components/AnimatedBg.tsx` mounted in `app/layout.tsx`; style comes from the hub (`layout.bgAnimation`, `bgSpeed`), default `mesh`.

## Hub override
Hub (Edge Config `theme_quizbites.design`) customises dials, brief, palette, GA4 and flags with no code change; hub values win over this file. Theme is loaded via `lib/theme-loader.ts` in `app/layout.tsx`.

## AI platform (ai-core)
No ai-core yet. Exemption: AI is only quiz generation + the scoped chatbot via the app's own free-tier fallback chain (lib/ai.ts); no document upload, RAG or memory. Adopt ai-core (api.prismlane.app) if retrieval/upload is added.
