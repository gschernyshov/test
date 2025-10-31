"use server"

import { NextResponse } from "next/server"
import prisma from "@/app/utils/prisma"
import { PostWithTips } from "@/app/types/Post"

export async function GET() {
  try {
    const rawPosts = await prisma.post.findMany({
      include: {
        author: true,
        tips: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    const posts: PostWithTips[] = rawPosts.map((post) => ({
      id: post.id,
      content: post.content,
      author: {
        id: post.author.id,
        wallet: post.author.wallet,
        name: post.author.name || undefined,
      },
      totalTips: post.tips.reduce((sum, tip) => sum + tip.amount, 0),
      tipsCount: post.tips.length,
      createdAt: post.createdAt.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }))

    return NextResponse.json(
      { 
        success: true, 
        posts,
      })
  } catch (error: unknown) {
    console.error("При загрузке постов возникла ошибка: ", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "При загрузке постов возникла ошибка",
      }, 
      { 
        status: 500 
      }
    )
  }
}