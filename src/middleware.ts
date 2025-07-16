import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Protect all /admin routes
  if (url.pathname.startsWith('/admin')) {
    const token = req.cookies.get('timebank_token')?.value;

    // If token is missing, redirect to login
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    try {
      // Decode and verify JWT token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

      // If the user is not admin, redirect to login
      if (decoded.role !== 'admin') {
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }
    } catch (err) {
      console.error('JWT verification error:', err);
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Apply middleware only on /admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
