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
          className={`px-5 py-2 text-xs tracking-widest uppercase border transition-colors ${active === cat.value ? 'bg-brand-dark text-brand-light border-brand-dark' : 'border-brand-mid text-brand-mid hover:border-brand-dark hover:text-brand-dark'}`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
