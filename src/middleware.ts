import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Restrict all /admin routes
  if (url.pathname.startsWith('/admin')) {
    const token = req.cookies.get('timebank_token')?.value;

    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

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
