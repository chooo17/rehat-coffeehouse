import { bookingSchema, preorderSchema } from '@/lib/zod/schemas'

describe('bookingSchema', () => {
  const valid = {
    name: 'Budi', phone: '081234567890',
    date: '2026-06-01', time: '14:00', guests: 2, notes: '',
  }

  it('accepts a valid booking', () => {
    expect(() => bookingSchema.parse(valid)).not.toThrow()
  })

  it('rejects missing name', () => {
    expect(() => bookingSchema.parse({ ...valid, name: '' })).toThrow()
  })

  it('rejects phone shorter than 9 digits', () => {
    expect(() => bookingSchema.parse({ ...valid, phone: '12345' })).toThrow()
  })

  it('rejects non-numeric phone', () => {
    expect(() => bookingSchema.parse({ ...valid, phone: 'abcdefghij' })).toThrow()
  })

  it('rejects guests less than 1', () => {
    expect(() => bookingSchema.parse({ ...valid, guests: 0 })).toThrow()
  })
})

describe('preorderSchema', () => {
  const valid = {
    name: 'Sari',
    arrivalTime: '15:00',
    notes: '',
    items: [{ id: 'abc', name: 'Espresso', qty: 1, price: 20000 }],
  }

  it('accepts a valid pre-order', () => {
    expect(() => preorderSchema.parse(valid)).not.toThrow()
  })

  it('rejects empty items array', () => {
    expect(() => preorderSchema.parse({ ...valid, items: [] })).toThrow()
  })

  it('rejects item qty less than 1', () => {
    expect(() => preorderSchema.parse({
      ...valid,
      items: [{ id: 'abc', name: 'Espresso', qty: 0, price: 20000 }],
    })).toThrow()
  })
})
