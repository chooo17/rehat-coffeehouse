export function MenuMarqueeSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-hidden">
        <div className="flex gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="shrink-0 w-44 bg-white border-2 border-transparent overflow-hidden animate-pulse">
              <div className="aspect-square bg-brand-black/10" />
              <div className="p-3 flex flex-col gap-2">
                <div className="h-2 w-16 bg-brand-black/10 rounded" />
                <div className="h-3 w-28 bg-brand-black/10 rounded" />
                <div className="h-3 w-20 bg-brand-black/10 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="h-12 w-48 bg-brand-black/10 animate-pulse" />
      </div>
    </div>
  )
}
