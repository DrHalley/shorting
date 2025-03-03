import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { shortUrl: string } }
) {
  const { shortUrl } = await params;
  const link = await prisma.link.findUnique({ where: { shortUrl } });

  if (!link) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.redirect(link.original);
}
