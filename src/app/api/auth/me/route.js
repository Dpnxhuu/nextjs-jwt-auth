import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json(
      { userId: decoded.userId, email: decoded.email, name: decoded.name },  // ← name add kiya
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
  }
}