'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { preorderSchema, type PreorderInput } from '@/lib/zod/schemas'
import { MenuSelector } from './MenuSelector'
import { Input } from '@/components/ui/Input'
import type { MenuItem } from '@/lib/sanity/types'

interface SelectedItem { id: string; name: string; qty: number; price: number }

export function PreorderForm({ menuItems }: { menuItems: MenuItem[] }) {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<PreorderInput>({
    resolver: zodResolver(preorderSchema),
    defaultValues: { items: [] },
  })

  const onSubmit = async (data: PreorderInput) => {
    if (selectedItems.length === 0) {
      setError('items', { message: 'Pilih minimal 1 item' })
      return
    }
    const payload: PreorderInput = { ...data, items: selectedItems }
    const res = await fetch('/api/preorder', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const { waUrl } = await res.json()
      window.location.assign(waUrl)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 max-w-lg">
      <div>
        <h3 className="font-serif text-brand-dark text-xl mb-4">Pilih Menu</h3>
        <MenuSelector menuItems={menuItems} selected={selectedItems} onChange={setSelectedItems} />
        {errors.items && <p className="text-xs text-red-500 mt-2">{errors.items.message}</p>}
      </div>
      <div className="flex flex-col gap-6">
        <Input label="Nama" aria-label="Nama" placeholder="Nama lengkap" error={errors.name?.message} {...register('name')} />
        <Input label="Jam Kedatangan" aria-label="Jam Kedatangan" type="time" error={errors.arrivalTime?.message} {...register('arrivalTime')} />
        <Input label="Catatan (opsional)" aria-label="Catatan" placeholder="Alergi, permintaan khusus..." {...register('notes')} />
      </div>
      {selectedItems.length > 0 && (
        <div className="border border-brand-mid/30 p-4">
          <p className="text-xs tracking-widest uppercase text-brand-mid mb-3">Ringkasan Pesanan</p>
          {selectedItems.map(i => (
            <div key={i.id} className="flex justify-between text-sm text-brand-dark py-1">
              <span>{i.name} x{i.qty}</span>
              <span>Rp {(i.price * i.qty).toLocaleString('id-ID')}</span>
            </div>
          ))}
          <div className="border-t border-brand-mid/30 mt-3 pt-3 flex justify-between font-semibold text-sm text-brand-dark">
            <span>Total</span>
            <span>Rp {selectedItems.reduce((s, i) => s + i.price * i.qty, 0).toLocaleString('id-ID')}</span>
          </div>
        </div>
      )}
      <button type="submit" disabled={isSubmitting}
        className="px-8 py-4 bg-brand-accent text-brand-dark text-sm font-bold tracking-widest uppercase hover:bg-brand-mid hover:text-brand-light transition-colors disabled:opacity-50">
        {isSubmitting ? 'Mengirim...' : 'Konfirmasi Pre-order via WhatsApp'}
      </button>
    </form>
  )
}
