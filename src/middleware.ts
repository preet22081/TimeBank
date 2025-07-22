import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  return NextResponse.next();
}

// Apply middleware only on /admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
