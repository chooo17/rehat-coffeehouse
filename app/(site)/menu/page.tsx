import { MenuGrid } from '@/components/menu/MenuGrid'
import { ScrollRevealWrapper } from '@/components/layout/ScrollRevealWrapper'
import { getMenuItems } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function MenuPage() {
  const items = await getMenuItems()
  return (
    <ScrollRevealWrapper>
      <div className="pt-32 pb-24 section-padding">
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest2 uppercase text-brand-accent mb-3">Apa yang Kami Sajikan</p>
          <h1 className="text-5xl font-serif text-brand-dark">Menu</h1>
        </div>
        <MenuGrid items={items} />
      </div>
    </ScrollRevealWrapper>
  )
}
