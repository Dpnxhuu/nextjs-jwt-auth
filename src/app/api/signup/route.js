import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { name, email, password } = await request.json();

  const [existing] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (existing.length > 0) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
  );

  const token = jwt.sign(
    { userId: result.insertId, email, name },  // ← name add kiya
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const response = NextResponse.json(
    { message: "User created successfully" },
    { status: 201 }
  );

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}