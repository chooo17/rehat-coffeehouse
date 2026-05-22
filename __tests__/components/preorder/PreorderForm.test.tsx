import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PreorderForm } from '@/components/preorder/PreorderForm'
import type { MenuItem } from '@/lib/sanity/types'
import type { SanityImageSource } from '@sanity/image-url'

global.fetch = jest.fn()

const mockItems: MenuItem[] = [
  { _id: '1', name: 'Espresso', category: 'coffee', price: 20000, image: {} as SanityImageSource, isAvailable: true },
  { _id: '2', name: 'Croissant', category: 'food', price: 15000, image: {} as SanityImageSource, isAvailable: true },
]

describe('PreorderForm', () => {
  beforeEach(() => jest.clearAllMocks())

  it('shows error when submitting with no items selected', async () => {
    render(<PreorderForm menuItems={mockItems} />)
    await userEvent.type(screen.getByLabelText(/nama/i), 'Sari')
    await userEvent.type(screen.getByLabelText(/jam kedatangan/i), '15:00')
    fireEvent.click(screen.getByRole('button', { name: /pre-order/i }))
    await waitFor(() => {
      expect(screen.getByText(/minimal 1 item/i)).toBeInTheDocument()
    })
  })

  it('can add and remove items', async () => {
    render(<PreorderForm menuItems={mockItems} />)
    fireEvent.change(screen.getByDisplayValue('Pilih kategori...'), { target: { value: 'coffee' } })
    fireEvent.change(screen.getByDisplayValue('Pilih menu...'), { target: { value: '1' } })
    fireEvent.click(screen.getByText('+ Tambah'))
    expect(screen.getByTestId('qty-1')).toHaveTextContent('1')
    fireEvent.click(screen.getByTestId('remove-item-1'))
    expect(screen.queryByTestId('qty-1')).not.toBeInTheDocument()
  })
})
