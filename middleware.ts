import NextAuth from 'next-auth';
import { authConfig } from './auth.config.js';

console.log('Middleware has loaded');
 
export default NextAuth(authConfig).auth;
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};