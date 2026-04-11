import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { messageSchema } from "@/lib/validations"
import { moderateText } from "@/lib/ai/moderator"
import { analyzeSentiment } from "@/lib/ai/sentiment"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const threadId = searchParams.get("threadId")
  if (!threadId) return NextResponse.json({ messages: [] })

  const messages = await prisma.message.findMany({
    where: { threadId },
    orderBy: { createdAt: "asc" },
    include: {
      author: true,
      reactions: true,
      reports: true
    }
  })

  return NextResponse.json({ messages })
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const parsed = messageSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 })
  }

  const moderation = moderateText(parsed.data.content)
  const sentiment = analyzeSentiment(parsed.data.content)

  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    update: {},
    create: { email: session.user.email, name: session.user.name || session.user.email.split("@")[0] }
  })

  const message = await prisma.message.create({
    data: {
      threadId: parsed.data.threadId,
      authorId: user.id,
      content: parsed.data.content,
      moderation: moderation.decision,
      sentiment: sentiment.mood,
      emotionScore: Math.abs(sentiment.score),
      isAnonymous: true
    },
    include: {
      author: true,
      reactions: true,
      reports: true
    }
  })

  return NextResponse.json({ message }, { status: 201 })
}
