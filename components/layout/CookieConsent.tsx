'use client'
import { useState, useEffect } from 'react'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      setVisible(true)
    } else if (consent === 'accepted') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).gtag?.('consent', 'update', { analytics_storage: 'granted' })
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).gtag?.('consent', 'update', { analytics_storage: 'granted' })
    setVisible(false)
  }

  function reject() {
    localStorage.setItem('cookie_consent', 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-brand-black border-t-2 border-brand-yellow">
      <div className="section-padding py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-xs text-white/70 max-w-lg leading-relaxed">
          Kami menggunakan cookie untuk analitik pengunjung guna meningkatkan pengalaman di website ini.
          Data tidak dijual ke pihak ketiga.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={reject}
            className="text-[10px] font-bold tracking-[3px] uppercase text-white/40 hover:text-white/70 transition-colors px-2 py-2.5"
          >
            Tolak
          </button>
          <button
            onClick={accept}
            className="text-[10px] font-bold tracking-[3px] uppercase px-6 py-2.5 bg-brand-yellow text-brand-black hover:bg-yellow-400 transition-colors"
          >
            Terima
          </button>
        </div>
      </div>
    </div>
  )
}
