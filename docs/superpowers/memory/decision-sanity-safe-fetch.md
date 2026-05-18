# Decision: safeFetch Wrapper for Sanity Queries

**Type:** decision  
**Commit:** 76f3f90 (chore: fix build and TypeScript errors, all tests pass)  
**Date:** 2026-05-18

---

## Decision

All Sanity GROQ queries are wrapped in a `safeFetch` helper in `lib/sanity/queries.ts` that catches errors and returns empty arrays / null instead of throwing.

## Why

`client.fetch()` throws when `NEXT_PUBLIC_SANITY_PROJECT_ID` is not configured (e.g., during `next build` in CI without env vars, or during local dev before Sanity setup). Without the wrapper, every page that fetches from Sanity fails to build.

The wrapper makes all Sanity-fetching pages resilient to CMS unavailability at build time, which is correct for Vercel ISR deployment where build-time fetches are optional probes.

## Pattern

```ts
async function safeFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  try {
    return params ? await client.fetch<T>(query, params) : await client.fetch<T>(query)
  } catch {
    return null
  }
}

// Usage for array-returning queries
export async function getMenuItems(): Promise<MenuItem[]> {
  return (await safeFetch<MenuItem[]>(`...`)) ?? []
}

// Usage for singleton queries
export async function getAboutPage(): Promise<AboutPage | null> {
  return safeFetch<AboutPage>(`...`)
}
```

## Trade-off

Pages will silently show empty state instead of an error page when Sanity is unreachable. This is intentional — empty state is preferable to a build failure or 500 error for a coffee shop site.
