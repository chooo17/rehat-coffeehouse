'use client'
import { useEffect, useRef } from 'react'

export function ScrollRevealWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            intersectionObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    )

    function observeNew() {
      container.querySelectorAll('.reveal:not(.reveal-visible)').forEach(el =>
        intersectionObserver.observe(el)
      )
    }

    observeNew()

    // Watch for new .reveal elements added during client-side navigation
    const mutationObserver = new MutationObserver(observeNew)
    mutationObserver.observe(container, { childList: true, subtree: true })

    return () => {
      intersectionObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return <div ref={ref}>{children}</div>
}
