"use client"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="grid min-h-screen place-items-center p-6 text-center">
      <div className="max-w-md space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-2xl font-semibold">Something rippled sideways.</h2>
        <p className="text-white/70">{error.message}</p>
        <button onClick={reset} className="rounded-2xl bg-white px-4 py-2 text-slate-900">Try again</button>
      </div>
    </div>
  )
}
