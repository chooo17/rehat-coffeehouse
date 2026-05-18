import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import { bookingSchema } from '@/lib/zod/schemas'
import { bookingEmailHtml, bookingWaText, buildWaUrl } from '@/lib/resend/templates'

const limiter = new RateLimiterMemory({ points: 5, duration: 60 })
let resend: Resend | null = null
function getResend(): Resend {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY)
  return resend
}

export async function POST(req: NextRequest) {
  const ip = (req.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim()
  try {
    await limiter.consume(ip)
  } catch {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: unknown
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = bookingSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const data = parsed.data
  try {
    await getResend().emails.send({
      from: 'noreply@rehatcoffeehouse.com',
      to: process.env.OWNER_EMAIL!,
      subject: `Booking Baru dari ${data.name}`,
      html: bookingEmailHtml(data),
    })
  } catch (err) {
    console.error('Email send failed:', err)
    // continue — still redirect to WhatsApp
  }

  const waUrl = buildWaUrl(
    process.env.OWNER_WA_NUMBER!,
    bookingWaText(data)
  )
  return NextResponse.json({ waUrl })
}
