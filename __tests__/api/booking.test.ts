import { POST } from '@/app/api/booking/route'
import { NextRequest } from 'next/server'

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: jest.fn().mockResolvedValue({ id: 'mock-id' }) },
  })),
}))

jest.mock('rate-limiter-flexible', () => ({
  RateLimiterMemory: jest.fn().mockImplementation(() => ({
    consume: jest.fn().mockResolvedValue({ remainingPoints: 4 }),
  })),
}))

function makeRequest(body: Record<string, unknown>) {
  return new NextRequest('http://localhost/api/booking', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '1.2.3.4' },
    body: JSON.stringify(body),
  })
}

const validBody = {
  name: 'Budi', phone: '081234567890',
  date: '2026-06-01', time: '14:00', guests: 2, notes: '',
}

describe('POST /api/booking', () => {
  it('returns 200 with waUrl for valid input', async () => {
    const res = await POST(makeRequest(validBody))
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.waUrl).toMatch(/https:\/\/wa\.me\//)
  })

  it('returns 400 for missing name', async () => {
    const res = await POST(makeRequest({ ...validBody, name: '' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 for invalid phone', async () => {
    const res = await POST(makeRequest({ ...validBody, phone: 'abc' }))
    expect(res.status).toBe(400)
  })
})
