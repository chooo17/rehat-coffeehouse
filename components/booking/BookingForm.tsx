'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { bookingSchema, type BookingInput } from '@/lib/zod/schemas'
import { Input } from '@/components/ui/Input'

type BookingFormInput = z.input<typeof bookingSchema>

export function BookingForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BookingFormInput, unknown, BookingInput>({
    resolver: zodResolver(bookingSchema),
  })

  const onSubmit = async (data: BookingInput) => {
    setServerError(null)
    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      const { waUrl } = await res.json()
      window.location.assign(waUrl)
    } else {
      setServerError('Gagal mengirim. Silakan coba lagi atau hubungi kami via WhatsApp.')
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
        className="px-8 py-4 bg-brand-orange text-white text-sm font-bold tracking-widest uppercase hover:bg-orange-600 transition-colors disabled:opacity-50">
        {isSubmitting ? 'Mengirim...' : 'Booking Meja'}
      </button>
      {serverError && <p className="text-sm text-red-500 text-center">{serverError}</p>}
    </form>
  )
}
