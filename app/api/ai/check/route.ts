import { NextResponse } from "next/server"
import { z } from "zod"
import { moderateText } from "@/lib/ai/moderator"
import { analyzeSentiment } from "@/lib/ai/sentiment"
import { therapyLayer } from "@/lib/ai/therapyLayer"

const bodySchema = z.object({ content: z.string().min(1) })

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const moderation = moderateText(parsed.data.content)
  const sentiment = analyzeSentiment(parsed.data.content)
  const therapy = therapyLayer({
    sentiment: sentiment.mood,
    toxicity: moderation.toxicity,
    content: parsed.data.content
  })

  return NextResponse.json({
    moderation,
    sentiment,
    therapy
  })
}
