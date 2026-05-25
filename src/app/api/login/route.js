import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password required" }, { status: 400 });
    }

    let rows;
    try {
      [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    } catch (err) {
      return NextResponse.json({ message: "Database error" }, { status: 500 });
    }

    if (rows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({ message: "Login successful" }, { status: 200 });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // local pe bhi kaam karega ab
      sameSite: "lax", // CSRF protection
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;

  } catch (err) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}