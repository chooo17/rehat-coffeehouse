import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BookingForm } from '@/components/booking/BookingForm'

global.fetch = jest.fn()

describe('BookingForm', () => {
  beforeEach(() => jest.clearAllMocks())

  it('shows error when name is empty on submit', async () => {
    render(<BookingForm />)
    fireEvent.click(screen.getByRole('button', { name: /booking/i }))
    await waitFor(() => {
      expect(screen.getByText(/nama wajib/i)).toBeInTheDocument()
    })
  })

  it('shows error for invalid phone', async () => {
    render(<BookingForm />)
    await userEvent.type(screen.getByLabelText(/nama/i), 'Budi')
    await userEvent.type(screen.getByLabelText(/no\. hp/i), 'abc')
    fireEvent.click(screen.getByRole('button', { name: /booking/i }))
    await waitFor(() => {
      expect(screen.getByText(/nomor hp tidak valid/i)).toBeInTheDocument()
    })
  })

  it('submits successfully with valid data', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ waUrl: 'https://wa.me/628123?text=test' }),
    })

    render(<BookingForm />)
    await userEvent.type(screen.getByLabelText(/nama/i), 'Budi')
    await userEvent.type(screen.getByLabelText(/no\. hp/i), '081234567890')
    await userEvent.type(screen.getByLabelText(/tanggal/i), '2026-06-01')
    await userEvent.type(screen.getByLabelText(/jam/i), '14:00')
    await userEvent.type(screen.getByLabelText(/jumlah tamu/i), '2')
    fireEvent.click(screen.getByRole('button', { name: /booking/i }))
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/booking', expect.objectContaining({
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: expect.stringContaining('Budi'),
      }))
    })
  })
})
