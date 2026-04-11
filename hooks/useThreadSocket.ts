"use client"

import { useEffect } from "react"
import { useSocket } from "@/hooks/useSocket"

export function useThreadSocket(threadId?: string) {
  const { socket, connected } = useSocket()

  useEffect(() => {
    if (!socket || !threadId || !connected) return
    socket.emit("join-thread", { threadId })
    return () => {
      socket.emit("leave-thread", { threadId })
    }
  }, [socket, threadId, connected])

  const emitTyping = (isTyping: boolean) => {
    if (!socket || !threadId) return
    socket.emit("typing", { threadId, isTyping })
  }

  const emitMessage = (payload: any) => {
    if (!socket || !threadId) return
    socket.emit("send-message", { ...payload, threadId })
  }

  return { socket, connected, emitTyping, emitMessage }
}
