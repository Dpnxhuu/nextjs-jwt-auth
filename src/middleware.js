import { NextResponse } from "next/server";

const AUTH_PAGES = new Set([
  "/login",
  "/signup",
  "/signup/email",
  "/forgot-password",
  "/forgot-password/reset",
]);

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = AUTH_PAGES.has(pathname);
  const isProtected = pathname === "/home" || pathname.startsWith("/home/");

  if (isProtected) {
    if (!token) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (isAuthPage) {
    if (token) {
      const homeUrl = request.nextUrl.clone();
      homeUrl.pathname = "/home";
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/login",
    "/signup",
    "/signup/email",
    "/forgot-password",
    "/forgot-password/:path*",
  ],
};
