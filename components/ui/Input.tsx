import { InputHTMLAttributes, forwardRef } from "react"
import { cn } from "@/components/ui/utils"

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-indigo-400/70",
        className
      )}
      {...props}
    />
  )
})
