"use client"

import { useState } from "react"
import { Modal } from "@/components/ui/Modal"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { threadSchema } from "@/lib/validations"
import { toast } from "sonner"

export function NewThreadModal({
  open,
  onClose,
  onCreated
}: {
  open: boolean
  onClose: () => void
  onCreated?: () => void
}) {
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)

  const createThread = async () => {
    const parsed = threadSchema.safeParse({ title })
    if (!parsed.success) {
      toast.error("Title needs at least 3 characters.")
      return
    }

    setLoading(true)
    const res = await fetch("/api/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    })
    setLoading(false)

    if (!res.ok) {
      toast.error("Could not create thread.")
      return
    }

    toast.success("Thread created.")
    setTitle("")
    onCreated?.()
    onClose()
  }

  return (
    <Modal open={open}>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">New Thread</h3>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Give this room a title" />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={createThread} disabled={loading}>{loading ? "Creating..." : "Create"}</Button>
        </div>
      </div>
    </Modal>
  )
}
