const MARQUEE_TEXT =
  'SPECIALTY COFFEE ❖ REHAT COFFEEHOUSE ❖ MALANG EAST JAVA ❖ GOOD VIBES ❖ HANDCRAFTED DRINKS ❖ OPEN DAILY ❖ '

export function MarqueeStrip() {
  return (
    <div
      className="bg-brand-black text-brand-yellow py-2.5 overflow-hidden whitespace-nowrap select-none"
      aria-label="Specialty Coffee · Rehat Coffeehouse · Malang East Java · Good Vibes · Handcrafted Drinks · Open Daily"
    >
      <div className="animate-marquee hover:[animation-play-state:paused] inline-block text-[11px] font-bold tracking-[4px] uppercase cursor-default">
        <span aria-hidden="true">{MARQUEE_TEXT}{MARQUEE_TEXT}</span>
      </div>
    </div>
  )
}
