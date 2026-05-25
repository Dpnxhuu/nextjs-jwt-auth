import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export async function POST(request) {
  const { token, password } = await request.json();

  // Token verify karo
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return NextResponse.json(
      { message: "Link expired ya invalid hai!" },
      { status: 401 }
    );
  }

  // Naya password hash karo
  const hashedPassword = await bcrypt.hash(password, 10);

  // DB mein password update karo
  await db.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [hashedPassword, decoded.userId]
  );

  return NextResponse.json(
    { message: "Password reset successful!" },
    { status: 200 }
  );
}