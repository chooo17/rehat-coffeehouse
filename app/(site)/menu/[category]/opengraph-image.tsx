import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Menu Rehat Coffeehouse'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const LABELS: Record<string, string> = {
  coffee:      'Coffee',
  'non-coffee': 'Non-Coffee',
  food:        'Makanan',
  snack:       'Snack',
}

export default async function OgImage(
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params
  const label = LABELS[category] ?? category

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          width: '100%',
          height: '100%',
          backgroundColor: '#f5f0e8',
          padding: '60px 80px',
        }}
      >
        {/* Orange accent bar */}
        <div style={{ display: 'flex', marginBottom: 24 }}>
          <div style={{ width: 48, height: 6, backgroundColor: '#ff4d00' }} />
        </div>
        {/* Category label */}
        <div style={{
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 6,
          textTransform: 'uppercase',
          color: '#ff4d00',
          marginBottom: 16,
        }}>
          ✦ Menu {label}
        </div>
        {/* Big title */}
        <div style={{
          fontSize: 120,
          fontWeight: 900,
          fontStyle: 'italic',
          textTransform: 'uppercase',
          color: '#1a1a1a',
          lineHeight: 1,
          marginBottom: 32,
        }}>
          {label.toUpperCase()}.
        </div>
        {/* Brand */}
        <div style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: '#1a1a1a',
          opacity: 0.5,
        }}>
          Rehat Coffeehouse — Sampang, Madura
        </div>
      </div>
    ),
    { ...size }
  )
}
