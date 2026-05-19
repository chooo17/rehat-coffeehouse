'use client'
import { useState, useMemo } from 'react'
import { POSMenuCard } from './POSMenuCard'
import type { MenuItem } from '@/lib/sanity/types'

const CATEGORIES = [
  { value: 'all',        label: 'Semua' },
  { value: 'coffee',     label: 'Coffee' },
  { value: 'non-coffee', label: 'Non-Coffee' },
  { value: 'food',       label: 'Makanan' },
  { value: 'snack',      label: 'Snack' },
]

type CartItem = { id: string; name: string; price: number; qty: number }
type Step = 'browse' | 'checkout'

interface Props {
  menuItems: MenuItem[]
  waNumber: string
}

export function PreorderPOS({ menuItems, waNumber }: Props) {
  const [isOpen, setIsOpen]           = useState(false)
  const [cart, setCart]               = useState<CartItem[]>([])
  const [category, setCategory]       = useState('all')
  const [step, setStep]               = useState<Step>('browse')
  const [name, setName]               = useState('')
  const [notes, setNotes]             = useState('')
  const [mobileCartOpen, setMobileCartOpen] = useState(false)

  const filtered = useMemo(
    () => category === 'all' ? menuItems : menuItems.filter(i => i.category === category),
    [menuItems, category]
  )

  const total       = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const totalQty    = cart.reduce((s, i) => s + i.qty, 0)
  const cartIsEmpty = cart.length === 0

  function addToCart(item: MenuItem) {
    setCart(prev => {
      const existing = prev.find(c => c.id === item._id)
      if (existing) return prev.map(c => c.id === item._id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { id: item._id, name: item.name, price: item.price, qty: 1 }]
    })
  }

  function changeQty(id: string, delta: number) {
    setCart(prev =>
      prev
        .map(c => c.id === id ? { ...c, qty: c.qty + delta } : c)
        .filter(c => c.qty > 0)
    )
  }

  const waUrl = useMemo(() => {
    if (!name.trim() || cartIsEmpty) return ''
    const lines = cart.map(i => `- ${i.name} x${i.qty} (Rp ${(i.price * i.qty).toLocaleString('id-ID')})`)
    const parts: string[] = [
      'Halo Rehat Coffeehouse!',
      '',
      'Saya mau pre-order:',
      ...lines,
      '',
      `Total: Rp ${total.toLocaleString('id-ID')}`,
      '',
      `Nama: ${name.trim()}`,
    ]
    if (notes.trim()) parts.push(`Catatan: ${notes.trim()}`)
    const msg = parts.join('\n')
    const wa = (waNumber || '6287777601617').replace(/\D/g, '')
    return `https://wa.me/${wa}?text=${encodeURIComponent(msg)}`
  }, [name, notes, cart, total, waNumber, cartIsEmpty])

  /* ── Cart Panel (reused on desktop sidebar + mobile sheet) ── */
  const CartPanel = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-black italic uppercase text-brand-black flex items-center gap-2">
          <span className="inline-block w-5 h-0.5 bg-brand-orange" />
          Pesanan
        </h3>
        {!cartIsEmpty && (
          <button
            onClick={() => setCart([])}
            className="text-[9px] font-bold tracking-widest uppercase text-brand-black/40 hover:text-red-500 transition-colors"
          >
            Hapus Semua
          </button>
        )}
      </div>

      {cartIsEmpty ? (
        <p className="text-sm text-brand-black/40 text-center py-10">Belum ada item dipilih.</p>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-brand-black leading-tight truncate">{item.name}</p>
                <p className="text-xs text-brand-black/50">Rp {item.price.toLocaleString('id-ID')}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => changeQty(item.id, -1)}
                  className="w-7 h-7 flex items-center justify-center border-2 border-brand-black/20 hover:border-brand-black text-brand-black font-bold text-xs transition-colors"
                >
                  −
                </button>
                <span className="w-5 text-center text-sm font-black text-brand-black">{item.qty}</span>
                <button
                  onClick={() => changeQty(item.id, 1)}
                  className="w-7 h-7 flex items-center justify-center border-2 border-brand-black/20 hover:border-brand-black text-brand-black font-bold text-xs transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Total */}
      <div className="mt-5 pt-4 border-t-2 border-brand-black/10">
        <div className="flex justify-between items-center mb-5">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-black/50">Total</span>
          <span className="text-xl font-black text-brand-black">Rp {total.toLocaleString('id-ID')}</span>
        </div>
        <button
          disabled={cartIsEmpty}
          onClick={() => { setStep('checkout'); setMobileCartOpen(false) }}
          className="w-full py-3 bg-brand-orange text-white text-xs font-bold tracking-[4px] uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
        >
          Checkout →
        </button>
      </div>
    </div>
  )

  /* ── Checkout Form ── */
  if (step === 'checkout') {
    return (
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => setStep('browse')}
          className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-brand-black/50 hover:text-brand-black transition-colors mb-8"
        >
          ← Kembali ke Menu
        </button>

        <h3 className="text-2xl font-black italic uppercase text-brand-black mb-8 flex items-center gap-3">
          <span className="inline-block w-6 h-1 bg-brand-orange" />
          Detail Pesanan
        </h3>

        {/* Order summary */}
        <div className="border-2 border-brand-black/10 bg-white p-5 mb-8 space-y-3">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-brand-black font-bold">{item.name} <span className="font-normal text-brand-black/50">×{item.qty}</span></span>
              <span className="font-bold text-brand-black">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
            </div>
          ))}
          <div className="pt-3 border-t-2 border-brand-black/10 flex justify-between">
            <span className="text-xs font-bold tracking-widest uppercase text-brand-black/50">Total</span>
            <span className="font-black text-brand-black text-lg">Rp {total.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold tracking-[4px] uppercase text-brand-black/60 mb-2">
              Nama *
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nama kamu"
              className="w-full border-2 border-brand-black/20 focus:border-brand-black bg-white px-4 py-3 text-sm text-brand-black placeholder-brand-black/30 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-[4px] uppercase text-brand-black/60 mb-2">
              Catatan
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Misal: less sugar, extra shot, dll."
              rows={3}
              className="w-full border-2 border-brand-black/20 focus:border-brand-black bg-white px-4 py-3 text-sm text-brand-black placeholder-brand-black/30 outline-none transition-colors resize-none"
            />
          </div>

          <button
            disabled={!waUrl}
            onClick={() => {
              if (!waUrl) return
              window.location.href = waUrl
            }}
            className={`w-full py-4 text-xs font-bold tracking-[4px] uppercase flex items-center justify-center gap-3 transition-colors ${
              waUrl
                ? 'bg-brand-orange text-white hover:bg-orange-600 cursor-pointer'
                : 'bg-brand-orange/30 text-white/50 cursor-not-allowed'
            }`}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.553 4.122 1.522 5.857L.057 23.882l6.197-1.623A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 01-5.003-1.375l-.358-.213-3.721.976.993-3.629-.234-.372A9.783 9.783 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
            </svg>
            {waUrl ? 'Kirim via WhatsApp' : 'Isi nama terlebih dahulu'}
          </button>
        </div>
      </div>
    )
  }

  /* ── Landing (menu belum dibuka) ── */
  if (!isOpen) {
    return (
      <div className="flex flex-col items-center text-center py-10">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-orange mb-4">✦ Pre-order via WhatsApp</p>
        <h3 className="text-3xl md:text-5xl font-black italic uppercase text-brand-black leading-tight mb-6">
          Pesan dulu,<br />baru datang.
        </h3>
        <p className="text-sm text-brand-black/60 max-w-sm mb-10 leading-relaxed">
          Pilih menu favoritmu, isi nama, dan pesananmu langsung dikirim ke WhatsApp kami untuk dikonfirmasi.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-3 px-10 py-4 bg-brand-orange text-white text-xs font-bold tracking-[4px] uppercase hover:bg-orange-600 transition-colors"
        >
          Pesan Sekarang
          <span className="text-base leading-none">→</span>
        </button>
      </div>
    )
  }

  /* ── Browse Step ── */
  return (
    <div className="relative">
      {/* Category filter */}
      <div className="flex flex-wrap gap-3 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-4 py-2 text-xs font-bold tracking-widest uppercase border-2 transition-colors ${
              category === cat.value
                ? 'bg-brand-black text-brand-yellow border-brand-black'
                : 'border-brand-black/30 text-brand-black/60 hover:border-brand-black hover:text-brand-black'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex gap-8 items-start">
        {/* Menu grid */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(item => (
              <POSMenuCard
                key={item._id}
                item={item}
                qty={cart.find(c => c.id === item._id)?.qty ?? 0}
                onAdd={() => addToCart(item)}
              />
            ))}
          </div>
        </div>

        {/* Desktop cart sidebar */}
        <div className="hidden lg:flex flex-col w-80 shrink-0">
          <div className="sticky top-24 bg-white border-2 border-brand-black p-5 h-[520px]">
            {CartPanel}
          </div>
        </div>
      </div>

      {/* Mobile floating cart bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-black border-t-[3px] border-brand-yellow p-4 flex items-center gap-4">
        <button
          onClick={() => setMobileCartOpen(true)}
          className="flex-1 flex items-center justify-between"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-brand-yellow">
            {cartIsEmpty ? 'Keranjang Kosong' : `${totalQty} item dipilih`}
          </span>
          <span className="text-sm font-black text-white">
            {cartIsEmpty ? '' : `Rp ${total.toLocaleString('id-ID')}`}
          </span>
        </button>
        <button
          disabled={cartIsEmpty}
          onClick={() => setStep('checkout')}
          className="shrink-0 px-5 py-2 bg-brand-orange text-white text-xs font-bold tracking-widest uppercase disabled:opacity-40"
        >
          Checkout
        </button>
      </div>
      {/* Spacer for mobile cart bar */}
      <div className="lg:hidden h-20" />

      {/* Mobile cart sheet */}
      {mobileCartOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileCartOpen(false)} />
          <div className="relative bg-white border-t-[3px] border-brand-yellow p-6 max-h-[80vh] flex flex-col">
            <button
              onClick={() => setMobileCartOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-brand-black/50 hover:text-brand-black font-bold text-xl"
            >
              ×
            </button>
            <div className="flex-1 overflow-y-auto">
              {CartPanel}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
