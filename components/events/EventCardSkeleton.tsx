export function EventCardSkeleton() {
  return (
    <div className="bg-white border-2 border-brand-black/10 overflow-hidden animate-pulse">
      <div className="aspect-video bg-brand-black/10" />
      <div className="p-6 flex flex-col gap-3">
        <div className="h-2 w-24 bg-brand-black/10 rounded" />
        <div className="h-5 w-40 bg-brand-black/10 rounded" />
        <div className="h-3 w-full bg-brand-black/10 rounded" />
        <div className="h-3 w-3/4 bg-brand-black/10 rounded" />
      </div>
    </div>
  )
}
