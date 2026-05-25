import { NextResponse } from "next/server";
import db from "@/lib/db";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: "Email required" }, { status: 400 });
    }

    let rows;
    try {
      [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    } catch (err) {
      return NextResponse.json({ message: "Database error" }, { status: 500 });
    }

    if (rows.length === 0) {
      return NextResponse.json({ message: "Email not found" }, { status: 404 });
    }

    const token = jwt.sign(
      { userId: rows[0].id, email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    const resetLink = `${baseUrl}/forgot-password/reset?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // await hata diya — background mein chalegi, timeout nahi aayega
    transporter.sendMail({
      from: `"Lumina" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your password",
      html: `
        <h2>Reset your password</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    }).catch(console.error);

    // email ka wait nahi — turant response
    return NextResponse.json({ message: "Reset email sent!" }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}