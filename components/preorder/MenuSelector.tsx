'use client'
import type { MenuItem } from '@/lib/sanity/types'

interface SelectedItem { id: string; name: string; qty: number; price: number }

interface Props {
  menuItems: MenuItem[]
  selected: SelectedItem[]
  onChange: (items: SelectedItem[]) => void
}

export function MenuSelector({ menuItems, selected, onChange }: Props) {
  const selectedIds = new Set(selected.map(i => i.id))

  const add = (item: MenuItem) => {
    if (!selectedIds.has(item._id)) {
      onChange([...selected, { id: item._id, name: item.name, qty: 1, price: item.price }])
    }
  }

  const remove = (id: string) => onChange(selected.filter(i => i.id !== id))

  const setQty = (id: string, qty: number) => {
    if (qty < 1) return
    onChange(selected.map(i => i.id === id ? { ...i, qty } : i))
  }

  return (
    <div className="flex flex-col gap-3">
      {menuItems.map(item => {
        const sel = selected.find(i => i.id === item._id)
        return (
          <div key={item._id} className="flex items-center justify-between border-b border-brand-black/10 pb-3">
            <div>
              <p className="text-sm font-bold text-brand-black">{item.name}</p>
              <p className="text-xs text-brand-black/50">Rp {item.price.toLocaleString('id-ID')}</p>
            </div>
            {sel ? (
              <div className="flex items-center gap-2">
                <button onClick={() => setQty(item._id, sel.qty - 1)} className="w-7 h-7 border-2 border-brand-black/20 text-brand-black font-bold hover:bg-brand-black hover:text-brand-yellow transition-colors">−</button>
                <span data-testid={`qty-${item._id}`} className="w-6 text-center text-sm font-bold text-brand-black">{sel.qty}</span>
                <button onClick={() => setQty(item._id, sel.qty + 1)} className="w-7 h-7 border-2 border-brand-black/20 text-brand-black font-bold hover:bg-brand-black hover:text-brand-yellow transition-colors">+</button>
                <button data-testid={`remove-item-${item._id}`} onClick={() => remove(item._id)} className="ml-2 text-xs text-red-400 hover:text-red-600">✕</button>
              </div>
            ) : (
              <button data-testid={`add-item-${item._id}`} onClick={() => add(item)}
                className="text-[10px] font-bold tracking-[3px] uppercase text-brand-orange border-2 border-brand-orange/40 px-3 py-1 hover:border-brand-orange hover:bg-brand-orange hover:text-white transition-colors">
                + Tambah
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
