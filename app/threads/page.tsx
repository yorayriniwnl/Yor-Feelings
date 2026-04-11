"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Sidebar } from "@/components/ui/Sidebar"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { NewThreadModal } from "@/components/NewThreadModal"

export default function ThreadsPage() {
  const [threads, setThreads] = useState<any[]>([])
  const [open, setOpen] = useState(false)

  const load = async () => {
    const res = await fetch("/api/threads")
    const data = await res.json()
    setThreads(data.threads || [])
  }

  useEffect(() => { load() }, [])

  return (
    <main className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[240px_1fr]">
      <Sidebar />
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Threads</h1>
          <Button onClick={() => setOpen(true)}>New Thread</Button>
        </div>
        <div className="grid gap-4">
          {threads.map((thread) => (
            <Card key={thread.id}>
              <Link href={`/threads/${thread.id}`} className="block">
                <h2 className="text-lg font-medium">{thread.title}</h2>
                <p className="mt-1 text-sm text-white/65">{thread._count?.messages || 0} messages</p>
              </Link>
            </Card>
          ))}
        </div>
      </section>
      <NewThreadModal open={open} onClose={() => setOpen(false)} onCreated={load} />
    </main>
  )
}
