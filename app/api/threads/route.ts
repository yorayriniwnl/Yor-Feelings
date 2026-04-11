import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { threadSchema } from "@/lib/validations"

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export async function GET() {
  const threads = await prisma.thread.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      messages: { take: 1, orderBy: { createdAt: "desc" } },
      _count: { select: { messages: true } }
    }
  })
  return NextResponse.json({ threads })
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const parsed = threadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid thread title" }, { status: 400 })
  }

  const author = await prisma.user.upsert({
    where: { email: session.user.email },
    update: {},
    create: { email: session.user.email, name: session.user.name || session.user.email.split("@")[0] }
  })

  const thread = await prisma.thread.create({
    data: {
      title: parsed.data.title,
      slug: `${slugify(parsed.data.title)}-${Date.now()}`,
      authorId: author.id
    }
  })

  return NextResponse.json({ thread }, { status: 201 })
}
