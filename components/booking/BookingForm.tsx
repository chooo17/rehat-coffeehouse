'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema, type BookingInput } from '@/lib/zod/schemas'
import { Input } from '@/components/ui/Input'

export function BookingForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
  })

  const onSubmit = async (data: BookingInput) => {
    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      const { waUrl } = await res.json()
      window.location.assign(waUrl)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 max-w-lg">
      <Input label="Nama" aria-label="Nama" placeholder="Nama lengkap" error={errors.name?.message} {...register('name')} />
      <Input label="No. HP" aria-label="No. HP" placeholder="081234567890" error={errors.phone?.message} {...register('phone')} />
      <Input label="Tanggal" aria-label="Tanggal" type="date" error={errors.date?.message} {...register('date')} />
      <Input label="Jam" aria-label="Jam" type="time" error={errors.time?.message} {...register('time')} />
      <Input label="Jumlah Tamu" aria-label="Jumlah Tamu" type="number" min={1} error={errors.guests?.message} {...register('guests', { valueAsNumber: true })} />
      <Input label="Catatan (opsional)" aria-label="Catatan" placeholder="Permintaan khusus..." {...register('notes')} />
      <button type="submit" disabled={isSubmitting}
        className="px-8 py-4 bg-brand-accent text-brand-dark text-sm font-bold tracking-widest uppercase hover:bg-brand-mid hover:text-brand-light transition-colors disabled:opacity-50">
        {isSubmitting ? 'Mengirim...' : 'Booking Meja'}
      </button>
    </form>
  )
}
