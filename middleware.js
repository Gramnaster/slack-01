import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check authentication (cookies, tokens, etc.)
  const isAuthenticated = request.cookies.get('access-token') || 
                          request.headers.get('authorization');
  
  const { pathname } = request.nextUrl;
  
  // Redirect to login if not authenticated and trying to access protected routes
  if (!isAuthenticated && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Redirect to home if authenticated and trying to access login
  if (isAuthenticated && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};