import { auth } from '@/auth';
import { prisma } from '@/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { id } = await req.json();
  if (!id)
    return NextResponse.json({ error: 'Id is required' }, { status: 400 });
  console.log(id);
  const session = await auth();
  if (!session || !session.user || !session.user.email)
    return NextResponse.redirect('/login');
  const remove = await prisma.link.delete({ where: { id: id } });
  return NextResponse.json(remove);
}
