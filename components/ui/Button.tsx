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
    primary: "bg-[#e84b4b] text-black shadow-glow",
    secondary: "bg-[#671515] text-[#f5eaea] hover:bg-[#8c1616]",
    ghost: "bg-transparent text-[#f5eaea] hover:bg-[#671515]"
  }
  return (
    <button
      ref={ref}
      className={cn(
        "yor-button inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})
