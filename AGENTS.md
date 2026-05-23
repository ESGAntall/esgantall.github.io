# ESGAntall — Codex CLI Context

## Project
Next.js 14 App Router + Anthropic API + SCSS Modules + Atomic Design.
Dark tech developer portfolio với AI chat.

## Atomic Design — Component Convention
Mỗi component PHẢI có đủ 4 files:
```
src/components/{atoms|molecules|organisms}/ComponentName/
├── ComponentName.tsx
├── ComponentName.module.scss
├── ComponentName.types.ts
└── index.ts
```

## Brand Colors — dùng CSS vars, KHÔNG hardcode hex
```
--color-cyan:   #18E0F7
--color-blue:   #2E7CFF
--color-purple: #6B3DFF
--color-dark:   #0A0E17  ← background
--color-light:  #F6F8FF  ← text
```

## Fonts
- UI/headings: `var(--font-primary)` → Space Grotesk
- Code/labels: `var(--font-secondary)` → JetBrains Mono

## AI Layer (server only)
```
src/ai/
├── client.ts        ← Anthropic singleton
├── actions/chat.ts  ← streaming logic
└── prompts/system.ts
```
KHÔNG import `@anthropic-ai/sdk` trong client components.

## Styling
- SCSS Modules — không dùng Tailwind
- Import tokens: `@use '@/styles/mixins' as m`
- Nền luôn tối — không dùng background trắng

## Path alias
`@/*` → `./src/*`
