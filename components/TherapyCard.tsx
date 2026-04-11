import { Card } from "@/components/ui/Card"

export function TherapyCard({ title, suggestion }: { title: string; suggestion: string }) {
  return (
    <Card className="space-y-2 border-cyan-400/20 bg-cyan-400/10">
      <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/70">{title}</p>
      <p className="text-sm text-white/90">{suggestion}</p>
    </Card>
  )
}
