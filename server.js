const http = require("http")
const next = require("next")
const { Server } = require("socket.io")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()
const port = parseInt(process.env.PORT || "3000", 10)

app.prepare().then(() => {
  const server = http.createServer((req, res) => handle(req, res))
  const io = new Server(server, {
    path: "/socket.io",
    cors: {
      origin: true,
      credentials: true
    }
  })

  io.on("connection", (socket) => {
    socket.on("join-thread", ({ threadId }) => {
      if (threadId) socket.join(threadId)
    })

    socket.on("leave-thread", ({ threadId }) => {
      if (threadId) socket.leave(threadId)
    })

    socket.on("typing", (payload) => {
      if (payload?.threadId) io.to(payload.threadId).emit("typing", payload)
    })

    socket.on("send-message", (payload) => {
      if (payload?.threadId) {
        io.to(payload.threadId).emit("receive-message", payload)
      }
    })

    socket.on("react-message", (payload) => {
      if (payload?.threadId) io.to(payload.threadId).emit("reaction-added", payload)
    })

    socket.on("report-message", (payload) => {
      if (payload?.threadId) io.to(payload.threadId).emit("report-added", payload)
    })

    socket.on("mood:update", (payload) => {
      io.emit("mood:update", payload)
    })
  })

  server.listen(port, () => {
    console.log(`> Echo running on http://localhost:${port}`)
  })
})
