import { NextResponse } from 'next/server'

export async function middleware(request) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/signup/email'
  const isProtected = pathname.startsWith('/home')

  if (isProtected) {
    if (!token) return NextResponse.redirect(new URL('/login', request.url))
    return NextResponse.next()
  }

  if (isAuthPage) {
    if (token) return NextResponse.redirect(new URL('/home', request.url))
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/home/:path*', '/login', '/signup', '/signup/email']
}