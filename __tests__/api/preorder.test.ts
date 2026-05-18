import { POST } from '@/app/api/preorder/route'
import { NextRequest } from 'next/server'

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: jest.fn().mockResolvedValue({ id: 'mock-id' }) },
  })),
}))

jest.mock('rate-limiter-flexible', () => ({
  RateLimiterMemory: jest.fn().mockImplementation(() => ({
    consume: jest.fn().mockResolvedValue({}),
  })),
}))

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/preorder', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '9.9.9.9' },
    body: JSON.stringify(body),
  })
}

const validBody = {
  name: 'Sari', arrivalTime: '15:00', notes: '',
  items: [{ id: 'abc', name: 'Espresso', qty: 2, price: 20000 }],
}

describe('POST /api/preorder', () => {
  it('returns 200 with waUrl for valid input', async () => {
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.waUrl).toMatch(/https:\/\/wa\.me\//)
  })

  it('returns 400 for empty items array', async () => {
    const res = await POST(makeRequest({ ...validBody, items: [] }))
    expect(res.status).toBe(400)
  })

  it('returns 400 for missing name', async () => {
    const res = await POST(makeRequest({ ...validBody, name: '' }))
    expect(res.status).toBe(400)
  })
})
