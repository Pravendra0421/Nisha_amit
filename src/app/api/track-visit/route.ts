import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST() {
  try {
    const stat = await prisma.siteStat.upsert({
      where: {
        id: "654321654321654321654321"
      },
      update: {
        visits: { increment: 1 }
      },
      create: {
        id: "654321654321654321654321",
        visits: 1
      }
    });

    return NextResponse.json({ success: true, visits: stat.visits });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}