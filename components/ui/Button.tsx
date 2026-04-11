import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/components/ui/utils"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost"
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", ...props },
  ref
) {
  const variants = {
    primary: "bg-white text-slate-900 hover:bg-slate-100 shadow-glow",
    secondary: "bg-slate-800 text-white hover:bg-slate-700",
    ghost: "bg-transparent text-white hover:bg-white/10"
  }
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
