# Decision: Jest Multi-Project Config for Next.js API + Component Tests

**Type:** decision  
**Commit:** 76f3f90 (chore: fix build and TypeScript errors, all tests pass)  
**Date:** 2026-05-18

---

## Decision

`jest.config.js` uses a `projects` array to run two separate test environments in one `npm test` call:

```js
module.exports = createJestConfig({
  projects: [
    {
      displayName: 'dom',
      testEnvironment: 'jest-environment-jsdom',
      testMatch: ['**/__tests__/components/**/*.test.tsx'],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    },
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['**/__tests__/api/**/*.test.ts', '**/__tests__/lib/**/*.test.ts'],
    },
  ],
})
```

## Why

Next.js API routes use `NextRequest` / `NextResponse` which require a Node.js environment. React component tests using `@testing-library/react` require JSDOM. Running both in the same environment causes failures:
- API tests in JSDOM: `Request` / `Response` globals are absent or behave differently
- Component tests in Node: `document` / `window` globals are absent

## Rule

- `__tests__/components/**` → `jest-environment-jsdom` project
- `__tests__/api/**` and `__tests__/lib/**` → `node` project

Do not mix environments. If a test needs both (e.g., a component that calls an API), mock the fetch call.
