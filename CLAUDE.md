# ESGAntall — AI-Powered Next.js App

## Project Overview
Developer portfolio + AI chat app cho thương hiệu **ESGAntall**.
Stack: Next.js 14 App Router + Anthropic API + SCSS Modules + Atomic Design.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: SCSS Modules — mỗi component có file `.module.scss` riêng
- **AI**: Anthropic SDK (`@anthropic-ai/sdk`) — streaming response
- **Fonts**: Space Grotesk (primary) + JetBrains Mono (code/secondary) — từ Google Fonts
- **Vibe Coding Tool**: Antigravity

## Brand Catalog (ESGAntall)

### Colors
```scss
// Dùng CSS custom properties từ src/styles/_tokens.scss
--color-cyan:    #18E0F7;   // primary accent, glowing
--color-blue:    #2E7CFF;   // secondary, buttons
--color-purple:  #6B3DFF;   // tertiary, gradients
--color-light:   #F6F8FF;   // text on dark
--color-dark:    #0A0E17;   // background (dark tech)

// Gradient chính của brand
--gradient-brand: linear-gradient(135deg, #18E0F7 0%, #2E7CFF 50%, #6B3DFF 100%);
// Glow effect
--glow-cyan: 0 0 20px rgba(24, 224, 247, 0.4);
--glow-blue: 0 0 20px rgba(46, 124, 255, 0.4);
```

### Typography
```scss
--font-primary:   'Space Grotesk', sans-serif;   // headings, UI
--font-secondary: 'JetBrains Mono', monospace;   // code, labels, accents
```

### Visual Style
- **Dark tech** — nền tối `#0A0E17`, không dùng nền trắng
- **Geometric** — hình học rõ ràng, góc cạnh, grid-based
- **Minimal** — không thừa decoration, mỗi element có mục đích
- **Futuristic** — border mỏng, glow effects, gradient text
- **Glowing accents** — dùng `box-shadow` hoặc `text-shadow` với cyan/blue/purple

### Logo Usage
- Logo ESG monogram: geometric hexagonal, gradient cyan→purple
- Brandname: "**ESG**Antall" — ESG in bold Space Grotesk, Antall in regular weight
- Favicon: rounded square variant

## Project Structure (Atomic Design)

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout + fonts + global styles
│   ├── page.tsx                  # Homepage (Hero)
│   ├── chat/
│   │   └── page.tsx              # Chat interface page
│   └── api/
│       └── chat/
│           └── route.ts          # AI streaming endpoint
│
├── components/
│   ├── atoms/                    # Smallest building blocks
│   │   ├── Button/
│   │   │   ├── Button.tsx        # component
│   │   │   ├── Button.module.scss # styles
│   │   │   ├── Button.types.ts   # Props interface
│   │   │   └── index.ts          # re-export
│   │   ├── Input/
│   │   ├── Badge/
│   │   ├── Logo/                 # ESGAntall SVG logo
│   │   └── Text/                 # Typography atom (h1-h6, p, span variants)
│   │
│   ├── molecules/                # Composed atoms
│   │   ├── Card/
│   │   ├── ChatBubble/           # User/AI message bubble
│   │   ├── NavBar/
│   │   └── InputBar/             # Chat input + send button
│   │
│   └── organisms/                # Complex sections
│       ├── Hero/                 # Landing hero section
│       ├── ChatPanel/            # Full chat UI (list + input)
│       └── Sidebar/              # Navigation sidebar
│
├── ai/                           # AI layer (tách biệt hoàn toàn khỏi FE)
│   ├── client.ts                 # Anthropic SDK instance
│   ├── actions/
│   │   └── chat.ts               # Server Action / streaming logic
│   └── prompts/
│       └── system.ts             # System prompts
│
├── lib/
│   └── utils.ts                  # cn(), formatDate(), etc.
│
├── styles/
│   ├── _tokens.scss              # CSS custom properties (brand tokens)
│   ├── _typography.scss          # Font declarations + scale
│   ├── _animations.scss          # Keyframes, glow effects
│   ├── _mixins.scss              # SCSS mixins: glow(), gradient-text(), etc.
│   └── globals.scss              # Import all partials + resets
│
└── types/
    ├── ai.ts                     # Message, ChatRole, StreamChunk types
    └── components.ts             # Shared component prop types
```

## Component Convention

Mỗi component PHẢI có đủ 4 files:
```
ComponentName/
├── ComponentName.tsx         # Implementation
├── ComponentName.module.scss # Scoped styles (dùng brand tokens)
├── ComponentName.types.ts    # TypeScript interfaces/types
└── index.ts                  # export { default } from './ComponentName'
```

### SCSS Convention
```scss
// Luôn import tokens và mixins
@use '@/styles/tokens' as t;
@use '@/styles/mixins' as m;

.root {
  background: var(--color-dark);
  color: var(--color-light);
  font-family: var(--font-primary);
}

// Variants dùng data attributes hoặc CSS nesting
.button {
  &[data-variant='primary'] { /* ... */ }
  &[data-variant='ghost']   { /* ... */ }
}
```

### TypeScript Convention
```ts
// ComponentName.types.ts
export type ButtonVariant = 'primary' | 'ghost' | 'glow';
export type ButtonSize    = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}
```

## AI Layer Convention

```
src/ai/              # KHÔNG import từ src/components
├── client.ts        # new Anthropic() — singleton
├── actions/chat.ts  # export async function streamChat(...)
└── prompts/system.ts # export const SYSTEM_PROMPT = `...`
```

- API key: `process.env.ANTHROPIC_API_KEY` — KHÔNG hardcode
- Model: `claude-sonnet-4-20250514`
- Dùng streaming: `stream: true` hoặc `createStream()`
- Route handler tại `src/app/api/chat/route.ts` — nhận POST, trả `ReadableStream`

## Environment Variables
```env
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_APP_NAME=ESGAntall
NEXT_PUBLIC_APP_URL=https://esgantall.dev
```

## Commands
```bash
npm run dev      # dev server
npm run build    # production build
npm run lint     # ESLint
npm run type-check # tsc --noEmit
```

## Do's & Don'ts

✅ DO:
- Dùng CSS custom properties từ `_tokens.scss` cho mọi màu sắc
- Mỗi component có folder riêng với đủ 4 files
- Import AI logic chỉ qua `src/ai/` — không mix với UI components
- Dùng `Space Grotesk` cho headings/UI, `JetBrains Mono` cho code/labels
- Glow effects với `box-shadow: var(--glow-cyan)` để theo đúng brand
- `'use client'` chỉ khi cần browser APIs hoặc hooks
- Streaming response từ AI endpoint

❌ DON'T:
- Hardcode màu hex trực tiếp trong component — dùng CSS vars
- Import Anthropic SDK trong Client Components
- Tạo component mà không có `.types.ts` riêng
- Dùng màu trắng làm background — dark tech only
- Dùng `Inter` hoặc `Roboto` — dùng `Space Grotesk`
- Để AI logic lẫn trong FE components
