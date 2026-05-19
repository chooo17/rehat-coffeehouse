'use client'

const CATEGORIES = [
  { value: 'all', label: 'Semua' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'non-coffee', label: 'Non-Coffee' },
  { value: 'food', label: 'Makanan' },
  { value: 'snack', label: 'Snack' },
]

export function CategoryFilter({ active, onChange }: { active: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {CATEGORIES.map(cat => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`px-5 py-2 text-xs font-bold tracking-widest uppercase border-2 transition-colors ${
            active === cat.value
              ? 'bg-brand-black text-brand-yellow border-brand-black'
              : 'border-brand-black/30 text-brand-black/60 hover:border-brand-black hover:text-brand-black'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
