import { auth } from '@/auth';
import { prisma } from '@/prisma';

import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  if (!session || !session.user || !session.user.email)
    return NextResponse.redirect('/login');

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      links: true,
    },
  });
  if (!user) {
    return NextResponse.json(null, { status: 500 });
  }
  return NextResponse.json(user.links);
}
