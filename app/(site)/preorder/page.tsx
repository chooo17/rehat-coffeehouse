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
            <p className="text-[10px] font-bold tracking-[4px] uppercase text-brand-orange mb-2">Pesan Sebelum Datang</p>
            <h1 className="text-5xl font-black italic uppercase text-brand-black leading-none mb-4">PRE-ORDER</h1>
            <p className="text-sm text-brand-black/70">Pilih menu yang ingin kamu pesan. Setelah submit, kami akan konfirmasi via WhatsApp.</p>
          </div>
          <div className="reveal">
            <PreorderForm menuItems={menuItems} />
          </div>
        </div>
      </div>
    </ScrollRevealWrapper>
  )
}
