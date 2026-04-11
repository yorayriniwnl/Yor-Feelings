"use client"

import { useEffect, useMemo, useState } from "react"
import { io, Socket } from "socket.io-client"

type SocketEventMap = {
  "receive-message": (payload: any) => void
  "typing": (payload: { threadId: string; userId?: string; isTyping: boolean }) => void
  "reaction-added": (payload: any) => void
  "report-added": (payload: any) => void
  "mood:update": (payload: any) => void
}

let socketInstance: Socket | null = null

export function useSocket() {
  const [connected, setConnected] = useState(false)

  const socket = useMemo(() => {
    if (socketInstance) return socketInstance
    const url = process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin
    socketInstance = io(url, { path: "/socket.io", transports: ["websocket"] })
    return socketInstance
  }, [])

  useEffect(() => {
    if (!socket) return
    const onConnect = () => setConnected(true)
    const onDisconnect = () => setConnected(false)
    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
    }
  }, [socket])

  return { socket, connected }
}
