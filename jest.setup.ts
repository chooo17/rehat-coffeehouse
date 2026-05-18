import '@testing-library/jest-dom'

// Polyfill for NextRequest in Jest tests
if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    constructor(public input: string | Request, public init?: RequestInit) {}
  } as any
}

if (typeof global.Headers === 'undefined') {
  global.Headers = class Headers {
    private headers: Map<string, string> = new Map()
    constructor(init?: HeadersInit) {
      if (init) {
        if (Array.isArray(init)) {
          init.forEach(([key, value]) => this.headers.set(key.toLowerCase(), value))
        } else if (typeof init === 'object') {
          Object.entries(init).forEach(([key, value]) =>
            this.headers.set(key.toLowerCase(), String(value))
          )
        }
      }
    }
    get(name: string) {
      return this.headers.get(name.toLowerCase()) ?? null
    }
    set(name: string, value: string) {
      this.headers.set(name.toLowerCase(), value)
    }
    has(name: string) {
      return this.headers.has(name.toLowerCase())
    }
  } as any
}
