"use client"

import { useCallback, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Message } from "@/components/Message"
import { useThreadSocket } from "@/hooks/useThreadSocket"
import { toast } from "sonner"

export default function ThreadPage() {
  const params = useParams<{ id: string }>()
  const threadId = params?.id
  const [thread, setThread] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [content, setContent] = useState("")
  const { socket, emitTyping } = useThreadSocket(threadId)

  const load = useCallback(async () => {
    const res = await fetch(`/api/messages?threadId=${threadId}`)
    const data = await res.json()
    setMessages(data.messages || [])
    const t = await fetch("/api/threads")
    const td = await t.json()
    setThread((td.threads || []).find((x: any) => x.id === threadId) || null)
  }, [threadId])

  useEffect(() => { if (threadId) load() }, [threadId, load])

  useEffect(() => {
    if (!socket) return
    const onMessage = (msg: any) => {
      if (msg.threadId === threadId) setMessages((prev) => [...prev, msg])
    }
    socket.on("receive-message", onMessage)
    return () => {
      socket.off("receive-message", onMessage)
    }
  }, [socket, threadId])

  const send = async () => {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threadId, content })
    })
    const data = await res.json()
    if (!res.ok) {
      toast.error(data.error || "Could not send.")
      return
    }
    setContent("")
    setMessages((prev) => [...prev, data.message])
    socket?.emit("send-message", data.message)
  }

  const react = async (id: string, type: string) => {
    await fetch(`/api/messages/${id}/react`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type })
    })
    toast.success("Reaction sent.")
  }

  const report = async (id: string) => {
    await fetch(`/api/messages/${id}/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason: "Report from thread page" })
    })
    toast.success("Reported.")
  }

  return (
    <main className="mx-auto max-w-4xl space-y-4 px-6 py-8">
      <Card>
        <h1 className="text-3xl font-semibold">{thread?.title || "Thread"}</h1>
      </Card>

      <div className="space-y-4">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            onReact={(type) => react(message.id, type)}
            onReport={() => report(message.id)}
          />
        ))}
      </div>

      <Card className="space-y-3">
        <Input
          value={content}
          placeholder="Say something anonymous"
          onChange={(e) => { setContent(e.target.value); emitTyping(e.target.value.length > 0) }}
        />
        <div className="flex justify-end">
          <Button onClick={send}>Send</Button>
        </div>
      </Card>
    </main>
  )
}
