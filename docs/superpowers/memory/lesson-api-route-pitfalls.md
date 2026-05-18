# Lesson: API Route Pitfalls — Rate Limiter, Resend, and IP Extraction

**Type:** lesson  
**Commit:** ea34503 (fix: address critical and important code review issues)  
**Date:** 2026-05-18

---

## Pitfall 1: Rate limiter instantiated inside the handler — silently broken

```ts
// ❌ WRONG — new instance per request, state never persists
export async function POST(req) {
  const limiter = new RateLimiterMemory({ points: 5, duration: 60 })
  await limiter.consume(ip)  // always succeeds, never actually rate-limits
}

// ✅ CORRECT — module scope, single instance
const limiter = new RateLimiterMemory({ points: 5, duration: 60 })
export async function POST(req) {
  await limiter.consume(ip)
}
```

This bug is invisible in tests because `jest.mock('rate-limiter-flexible')` mocks at the class level. The tests pass but rate limiting is completely bypassed in production.

---

## Pitfall 2: `new Resend(key)` at module scope crashes the build

When `RESEND_API_KEY` is not set (during `next build` or in CI), `new Resend(undefined)` throws at module evaluation time. Use a lazy singleton:

```ts
// ❌ WRONG — crashes build when env var absent
const resend = new Resend(process.env.RESEND_API_KEY)

// ✅ CORRECT — instantiated on first real request only
let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY)
  return _resend
}
```

---

## Pitfall 3: X-Forwarded-For can contain multiple IPs

`req.headers.get('x-forwarded-for')` returns a comma-separated list like `1.1.1.1, 2.2.2.2` through proxy chains. Using the full string as a rate-limit key lets attackers bypass limits by adding fake entries.

```ts
// ❌ Wrong — full header string
const ip = req.headers.get('x-forwarded-for') ?? 'unknown'

// ✅ Correct — take leftmost entry (real client on Vercel)
const ip = (req.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim()
```

---

## Pitfall 4: XSS in email templates via template literal interpolation

`z.string().min(1)` validates shape but does NOT sanitize HTML. A name like `<script>alert(1)</script>` passes Zod and gets inserted verbatim into email HTML.

Always escape user-provided strings before HTML interpolation:

```ts
function escHtml(s: string | undefined): string {
  if (!s) return '-'
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
```

Numeric fields (guests, price, qty) are safe without escaping.
