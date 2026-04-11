"use client"

import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Avatar } from "@/components/ui/Avatar"
import { formatDistanceToNow } from "date-fns"

export function Message({
  message,
  onReact,
  onReport
}: {
  message: any
  onReact?: (type: string) => void
  onReport?: () => void
}) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start gap-3">
        <Avatar name={message.author?.name || "A"} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-white">{message.author?.name || "Anonymous"}</p>
            <p className="text-xs text-white/40">{message.createdAt ? formatDistanceToNow(new Date(message.createdAt), { addSuffix: true }) : "just now"}</p>
          </div>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/80">{message.content}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {["like", "love", "clap", "fire", "sad", "support"].map((reaction) => (
          <Button key={reaction} variant="ghost" onClick={() => onReact?.(reaction)} className="rounded-full border border-white/10 px-3 py-1 text-xs capitalize">
            {reaction}
          </Button>
        ))}
        <Button variant="ghost" onClick={onReport} className="rounded-full border border-rose-400/20 px-3 py-1 text-xs text-rose-200">
          Report
        </Button>
      </div>
    </Card>
  )
}
