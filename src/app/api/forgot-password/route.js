import { NextResponse } from "next/server";
import db from "@/lib/db";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function POST(request) {
  const { email } = await request.json();

  // DB mein check karo email exist karta hai?
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    return NextResponse.json(
      { message: "Email not found" },
      { status: 404 }
    );
  }

  // Reset token banao — 15 min ke liye
  const token = jwt.sign(
    { userId: rows[0].id, email },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  // Reset link banao
  const resetLink = `http://localhost:3000/forgot-password/reset?token=${token}`;

  // Email bhejo
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Lumina" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset your password",
    html: `
      <h2>Reset your password</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  });

  return NextResponse.json(
    { message: "Reset email sent!" },
    { status: 200 }
  );
}