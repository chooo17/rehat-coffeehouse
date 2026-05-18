# Memory Update Report: Rehat Coffeehouse Initial Build

**Date:** 2026-05-18  
**Cycle:** Full website implementation (Tasks 1–17)  
**Branch:** feat/website  
**Commit range:** e8c9d52 → 9fdb3aa

---

## Docs Created

| File | Type | Rationale |
|------|------|-----------|
| `lesson-api-route-pitfalls.md` | lesson | 4 recurring pitfalls caught in code review: rate limiter scope, Resend lazy singleton, XSS in templates, X-Forwarded-For parsing |
| `decision-sanity-safe-fetch.md` | decision | safeFetch wrapper pattern prevents build failures on unconfigured Sanity |
| `decision-jest-multi-project.md` | decision | Jest two-project config (jsdom + node) required for Next.js API + component coexistence |
| `module-card-project-structure.md` | module card | Complete directory map, API contracts, ISR config, known gaps |

## Rejected Candidates

- Raw task implementation logs — ephemeral, not durable
- Tailwind brand color values — derivable from `tailwind.config.ts`, not worth duplicating
- Individual component structures — too detailed and change-prone

## Doc Gaps

- No runbook for Sanity Studio setup / seed data workflow
- No contract doc for Sanity schema evolution (field additions/renames)

## Uncertainties

- `useScrollReveal.ts` is unused — may be removed in a future cleanup or wired up if needed
- Google Maps embed uses a placeholder coordinate — needs real address once Sanity `siteSettings` is populated
