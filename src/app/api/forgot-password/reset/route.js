import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export async function POST(request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json({ message: "Token and password required" }, { status: 400 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ message: "Link expired ya invalid hai!" }, { status: 401 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password too short" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await db.query("UPDATE users SET password = ? WHERE id = ?", [
        hashedPassword,
        decoded.userId,
      ]);
    } catch (err) {
      return NextResponse.json({ message: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ message: "Password reset successful!" }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}