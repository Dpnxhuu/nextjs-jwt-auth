import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import db from "@/lib/db";

export async function DELETE(request) {

  // Cookie se token nikalo
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Not authenticated" },
      { status: 401 }
    );
  }

  // Token verify karo
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // DB se user delete karo
  await db.query(
    "DELETE FROM users WHERE id = ?",
    [decoded.userId]
  );

  // Cookie bhi delete karo
  const response = NextResponse.json(
    { message: "Account deleted" },
    { status: 200 }
  );

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    maxAge: 0,
    path: "/",
  });

  return response;
}