import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-light/70 py-12 section-padding">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="font-serif text-brand-light text-xl tracking-widest">REHAT</p>
          <p className="text-xs tracking-widest2 mt-1">COFFEEHOUSE</p>
        </div>
        <div className="flex flex-col gap-2 text-xs tracking-widest uppercase">
          {[['/', 'Home'], ['/menu', 'Menu'], ['/tentang', 'Tentang'], ['/galeri', 'Galeri'], ['/events', 'Events'], ['/kontak', 'Kontak']].map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-brand-accent transition-colors">{label}</Link>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-xs">
          <Link href="/booking" className="text-brand-accent hover:text-brand-light transition-colors tracking-widest uppercase">Booking Meja</Link>
          <Link href="/preorder" className="text-brand-accent hover:text-brand-light transition-colors tracking-widest uppercase">Pre-order</Link>
        </div>
      </div>
      <p className="mt-8 text-xs text-center opacity-40">© {new Date().getFullYear()} Rehat Coffeehouse. All rights reserved.</p>
    </footer>
  )
}
