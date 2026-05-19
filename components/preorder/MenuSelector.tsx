'use client'
import { useState } from 'react'
import type { MenuItem } from '@/lib/sanity/types'

interface SelectedItem { id: string; name: string; qty: number; price: number }

interface Props {
  menuItems: MenuItem[]
  selected: SelectedItem[]
  onChange: (items: SelectedItem[]) => void
}

const CATEGORY_LABELS: Record<string, string> = {
  coffee:     'Coffee',
  'non-coffee': 'Non-Coffee',
  food:       'Makanan',
  snack:      'Snack',
}

function Chevron() {
  return (
    <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-black/40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export function MenuSelector({ menuItems, selected, onChange }: Props) {
  const [category, setCategory]   = useState('')
  const [itemId,   setItemId]     = useState('')

  const categories = [...new Set(menuItems.map(i => i.category).filter(Boolean))] as string[]
  const filteredItems = category ? menuItems.filter(i => i.category === category) : []
  const pickedItem    = filteredItems.find(i => i._id === itemId)

  const handleCategoryChange = (cat: string) => {
    setCategory(cat)
    setItemId('')
  }

  const handleAdd = () => {
    if (!pickedItem) return
    const existing = selected.find(i => i.id === pickedItem._id)
    if (existing) {
      onChange(selected.map(i => i.id === pickedItem._id ? { ...i, qty: i.qty + 1 } : i))
    } else {
      onChange([...selected, { id: pickedItem._id, name: pickedItem.name, qty: 1, price: pickedItem.price }])
    }
    setItemId('')
  }

  const remove = (id: string) => onChange(selected.filter(i => i.id !== id))

  const setQty = (id: string, qty: number) => {
    if (qty < 1) return
    onChange(selected.map(i => i.id === id ? { ...i, qty } : i))
  }

  return (
    <div className="flex flex-col gap-6">

      {/* ── Kategori ─────────────────────────────── */}
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold tracking-[4px] uppercase text-brand-black/60">Kategori</label>
        <div className="relative">
          <select
            value={category}
            onChange={e => handleCategoryChange(e.target.value)}
            className="w-full border-b-2 border-brand-black/20 bg-transparent py-2 pr-6 text-brand-black focus:outline-none focus:border-brand-orange transition-colors appearance-none cursor-pointer"
          >
            <option value="">Pilih kategori...</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat] ?? cat}
              </option>
            ))}
          </select>
          <Chevron />
        </div>
      </div>

      {/* ── Menu ─────────────────────────────────── */}
      {category && (
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold tracking-[4px] uppercase text-brand-black/60">Menu</label>
          <div className="flex gap-2 items-end">
            <div className="relative flex-1">
              <select
                value={itemId}
                onChange={e => setItemId(e.target.value)}
                className="w-full border-b-2 border-brand-black/20 bg-transparent py-2 pr-6 text-brand-black focus:outline-none focus:border-brand-orange transition-colors appearance-none cursor-pointer"
              >
                <option value="">Pilih menu...</option>
                {filteredItems.map(item => (
                  <option key={item._id} value={item._id}>
                    {item.name} — Rp {item.price.toLocaleString('id-ID')}
                  </option>
                ))}
              </select>
              <Chevron />
            </div>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!itemId}
              className="px-4 py-2 bg-brand-black text-brand-yellow text-[10px] font-bold tracking-[3px] uppercase hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
            >
              + Tambah
            </button>
          </div>
        </div>
      )}

      {/* ── Item dipilih ─────────────────────────── */}
      {selected.length > 0 && (
        <div className="border-t-2 border-brand-black/10 pt-4 flex flex-col gap-0">
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-orange mb-3">Item Dipilih</p>
          {selected.map(item => (
            <div key={item.id} className="flex items-center justify-between py-3 border-b border-brand-black/10">
              <div>
                <p className="text-sm font-bold text-brand-black">{item.name}</p>
                <p className="text-xs text-brand-black/50">Rp {item.price.toLocaleString('id-ID')}</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setQty(item.id, item.qty - 1)}
                  className="w-7 h-7 border-2 border-brand-black/20 text-brand-black font-bold hover:bg-brand-black hover:text-brand-yellow transition-colors">−</button>
                <span data-testid={`qty-${item.id}`} className="w-6 text-center text-sm font-bold text-brand-black">{item.qty}</span>
                <button type="button" onClick={() => setQty(item.id, item.qty + 1)}
                  className="w-7 h-7 border-2 border-brand-black/20 text-brand-black font-bold hover:bg-brand-black hover:text-brand-yellow transition-colors">+</button>
                <button type="button" data-testid={`remove-item-${item.id}`} onClick={() => remove(item.id)}
                  className="ml-2 text-xs text-red-400 hover:text-red-600">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
