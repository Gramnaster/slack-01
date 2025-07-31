import { NextResponse } from 'next/server';
 
// This file does route protection and page config
// Just redirects you to other pages if you're not authenticated
// Authconofig has three main sections: pages, callbacks, and providers
export const authConfig = {
  // Pages configuration according to docs
  // Custom auth pages, which is at /login
  // When authentication fails, users are (supposedly) redirected to login
  pages: {
    signIn: '/login',
  },
  // Callback config according to docs. Does route protection
  // Three parameters: auth, request, nextUrl
  // Auth - Contains user sesh data. Request - incoming HTTP request object. NextUrl - URL user's accessing
  // Every request SHOULD go through middleware, before page component renders
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {

      // auth?.user safely access user object from auth session
      // !! double negation converts truthy/falsy to true/false bool
      // true if user = authenticated; false otherwise
      const isLoggedIn = !!auth?.user;
      console.log(`Auth.config success: Checking URL: ${nextUrl.pathname}`);
      console.log(`Auth.config success: User is ${isLoggedIn ? 'logged in' : 'not logged in'}.`);
      console.log(`Auth.config success: Auth object:`, auth);

      // Route classification so we know if a URL ends with /dashboard or /login
      // startsWith() catches nested routes, which is magic
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLoginPage = nextUrl.pathname.startsWith('/login');

      // Dashboard protection, now it requires authentication
      // If logged in, redirects to /dashboard
      // If not logged in, return false redirects to /login
      if (isOnDashboard) {
        if (isLoggedIn) {
          console.log('Auth.config success: Allowing access to dashboard.');
          return true;
        }
        console.log('Auth.config (authorized): Denying access to dashboard, redirecting to login.');
        return false;

      // If the user is logged in and user is on the login page, redirect to dashboard
      } else if (isLoggedIn && isOnLoginPage) {
        console.log('Auth.config success: User is logged in and on login page, redirecting to dashboard.');
        return NextResponse.redirect(new URL('/dashboard', nextUrl));
      }

      // For any other page not mentioned above, allow access.
      // This covers cases where the user is not logged in and is on the login page,
      // or any other public page.
      console.log('Auth.config success: Allowing access to current page.');
      return true;
    },
  },
  // Empty array as placeholder, but since we don't use auth providers like Google, etc.
  // We don't use this. We also separate provider logic at auth.js instead
  providers: [], // Add providers with an empty array for now
};