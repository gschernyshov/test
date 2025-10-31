import prisma from "@/app/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { fromWallet, toWallet, postId, amount, txHash } = body;

  if (!fromWallet || !toWallet || !postId || !amount)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const fromUser = await prisma.user.findUnique({ where: { wallet: fromWallet } });
  const toUser = await prisma.user.findUnique({ where: { wallet: toWallet } });

  if (!fromUser || !toUser)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  try {
    const tip = await prisma.tip.create({
      data: {
        fromUserId: fromUser.id,
        toUserId: toUser.id,
        postId,
        amount,
        txHash,
      },
    });

    return NextResponse.json(tip);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create tip" }, { status: 500 });
  }
}
