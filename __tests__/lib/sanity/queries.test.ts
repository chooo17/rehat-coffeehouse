import { getMenuItems, getActiveEvents } from '@/lib/sanity/queries'
import { client } from '@/lib/sanity/client'

jest.mock('@/lib/sanity/client', () => ({
  client: { fetch: jest.fn() },
  urlFor: jest.fn(),
}))

const mockFetch = client.fetch as jest.Mock

describe('getMenuItems', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('returns only available items', async () => {
    mockFetch.mockResolvedValueOnce([
      { _id: '1', name: 'Espresso', isAvailable: true, category: 'coffee', price: 20000 },
    ])
    const result = await getMenuItems()
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('isAvailable == true')
    )
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Espresso')
  })
})

describe('getActiveEvents', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('passes current ISO date as parameter', async () => {
    mockFetch.mockResolvedValueOnce([])
    await getActiveEvents()
    const callArgs = mockFetch.mock.calls[0]
    expect(callArgs[0]).toContain('date >= $now')
    expect(callArgs[1]).toHaveProperty('now')
    expect(typeof callArgs[1].now).toBe('string')
  })
})
