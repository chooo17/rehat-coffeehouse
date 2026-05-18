'use client'
import { useState } from 'react'
import { CategoryFilter } from './CategoryFilter'
import { MenuCard } from './MenuCard'
import type { MenuItem } from '@/lib/sanity/types'

export function MenuGrid({ items }: { items: MenuItem[] }) {
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? items : items.filter(i => i.category === active)

  return (
    <div>
      <CategoryFilter active={active} onChange={setActive} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map(item => <MenuCard key={item._id} item={item} />)}
      </div>
    </div>
  )
}
