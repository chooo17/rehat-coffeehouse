export function Footer() {
  return (
    <footer className="bg-brand-black border-t-[3px] border-brand-yellow px-6 md:px-12 lg:px-24 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-black italic text-brand-yellow text-xl tracking-tight">
          Rehat!
        </span>
        <p className="text-xs text-zinc-600 tracking-widest">
          © {new Date().getFullYear()} Rehat Coffeehouse · Malang
        </p>
        <div className="flex gap-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-500 hover:text-brand-yellow transition-colors tracking-widest uppercase">Instagram</a>
          <a href="https://wa.me/6287777601617" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-500 hover:text-brand-yellow transition-colors tracking-widest uppercase">WhatsApp</a>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-500 hover:text-brand-yellow transition-colors tracking-widest uppercase">Maps</a>
        </div>
      </div>
    </footer>
  )
}
