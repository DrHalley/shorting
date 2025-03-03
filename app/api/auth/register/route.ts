// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // JSON verisini al
    const { email, password } = await req.json();

    // Basit doğrulama
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kullanıcıyı veritabanına kaydet
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Başarılı yanıt
    return NextResponse.json(
      { message: "User created successfully!" },
      {
        status: 201,
      }
    );
  } catch (error) {
    // Hata yönetimi
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "This email is already using" },
      { status: 500 }
    );
  }
}
