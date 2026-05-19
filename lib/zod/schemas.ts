import { z } from 'zod'

export const bookingSchema = z.object({
  name:   z.string().min(1, 'Nama wajib diisi'),
  phone:  z.string().regex(/^\d{9,15}$/, 'Nomor HP tidak valid'),
  date:   z.string().min(1, 'Tanggal wajib diisi'),
  time:   z.string().min(1, 'Jam wajib diisi'),
  guests: z.number().int().min(1, 'Minimal 1 tamu'),
  notes:  z.string().default(''),
})

export const preorderItemSchema = z.object({
  id:    z.string(),
  name:  z.string(),
  qty:   z.number().int().min(1, 'Minimal 1'),
  price: z.number(),
})

export const preorderSchema = z.object({
  name:        z.string().min(1, 'Nama wajib diisi'),
  arrivalTime: z.string().default(''),
  notes:       z.string().default(''),
  items:       z.array(preorderItemSchema).min(1, 'Pilih minimal 1 item'),
})

export type BookingInput  = z.infer<typeof bookingSchema>
export type PreorderInput = z.infer<typeof preorderSchema>
