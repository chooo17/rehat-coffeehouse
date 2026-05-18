import { PreorderForm } from '@/components/preorder/PreorderForm'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getMenuItems } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function PreorderPage() {
  const menuItems = await getMenuItems()
  return (
    <ScrollRevealWrapper>
      <div className="pt-32 pb-24 section-padding">
        <div className="max-w-lg mx-auto">
          <div className="mb-12 reveal">
            <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Pesan Sebelum Datang</p>
            <h1 className="text-5xl font-serif text-brand-dark mb-4">Pre-order</h1>
            <p className="text-brand-mid">Pilih menu yang ingin kamu pesan. Setelah submit, kami akan konfirmasi via WhatsApp.</p>
          </div>
          <div className="reveal">
            <PreorderForm menuItems={menuItems} />
          </div>
        </div>
      </div>
    </ScrollRevealWrapper>
  )
}
