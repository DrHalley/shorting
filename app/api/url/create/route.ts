import { prisma } from "@/prisma";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { url } = await req.json();
  if (!url)
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  const shortUrl = nanoid(6);
  const newLink = await prisma.link.create({
    data: {
      original: url,
      shortUrl,
    },
  });
  return NextResponse.json({
    shortUrl: `https://shorting-alpha.vercel.app/${newLink.shortUrl}`,
  });
}
