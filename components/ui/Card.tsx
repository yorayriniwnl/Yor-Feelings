import { HTMLAttributes, forwardRef } from "react"
import { cn } from "@/components/ui/utils"

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Card(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={cn("yor-card p-5 backdrop-blur-xl", className)} {...props} />
})

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-4", className)} {...props} />
}
