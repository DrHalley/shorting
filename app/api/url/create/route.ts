import { auth } from '@/auth';
import { prisma } from '@/prisma';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { url } = await req.json();
  if (!url)
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  const session = await auth();
  if (!session || !session.user || !session.user.email)
    return NextResponse.redirect('/login');

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!user) {
    return NextResponse.json({ error: 'cannot find user' }, { status: 500 });
  }
  const shortUrl = nanoid(6);
  const newLink = await prisma.link.create({
    data: {
      original: url,
      shortUrl,
      userId: user.id,
    },
  });
  return NextResponse.json({
    shortUrl: `https://shorting-alpha.vercel.app/${newLink.shortUrl}`,
  });
}
