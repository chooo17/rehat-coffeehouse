import { PreorderForm } from '@/components/preorder/PreorderForm'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getMenuItems } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function PreorderPage() {
  const menuItems = await getMenuItems()
  return (
    <ScrollRevealWrapper>
      {/* Page hero band */}
      <div className="bg-brand-orange pt-28 pb-16 section-padding">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-white/70 mb-3">✦ Pesan Sebelum Datang</p>
        <h1 className="text-7xl md:text-9xl font-black italic uppercase text-white leading-none">PRE-ORDER.</h1>
      </div>

      {/* Content */}
      <div className="py-20 section-padding bg-brand-cream">
        <div className="max-w-lg mx-auto">
          <p className="text-sm text-brand-black/70 mb-10">Pilih menu yang ingin kamu pesan. Setelah submit, kami akan konfirmasi via WhatsApp.</p>
          <PreorderForm menuItems={menuItems} />
        </div>
      </div>
    </ScrollRevealWrapper>
  )
}
