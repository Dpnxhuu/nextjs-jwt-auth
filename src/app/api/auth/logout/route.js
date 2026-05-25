import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    maxAge: 0,      // ← 0 matlab cookie abhi delete karo
    path: "/",
  });

  return response;
}