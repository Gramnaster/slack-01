import NextAuth from 'next-auth';
import { authConfig } from './auth.config.js';

console.log('Middleware has loaded');
 
export default NextAuth(authConfig).auth;

console.log(authConfig);
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};