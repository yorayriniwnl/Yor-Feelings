"use client"

export function PresenceBar({ count = 0 }: { count?: number }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      {count} people online
    </div>
  )
}
