import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';
import { authConfig } from './auth.config';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    // Next-Auth needs all these for reasons only known to the documentation
    Credentials({
      // This function validates user credentials 
      // Validates user/pass against Axios backend
      async authorize(credentials) {
        console.log("Auth is authorising...");
        console.log("Auth - email:", credentials.email);
        console.log("Auth - password:", credentials.password);
        try {
          // Standard post response to Axio for logging in
          // Passes email/password and requires headers
          const response = await axios.post(
            `${API_URL}/auth/sign_in`,
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: { 'Content-Type': 'application/json' },
            }
          );

          // Axios returns standard response.data.data
          // Attaches data.data to user for ease of key:value assignment
          console.log("Auth API response status", response.status);
          const user = response.data.data;
          console.log('Auth user data:', user);
          
          // Attaches headers to be used for .GET and .POST in lib/data.js fetches
          // Replacement-ish for the dataproviders in CRA
          if (user) {
            console.log("Auth.js is successful. Attaching headers.");
            user.apiHeaders = {
              'access-token': response.headers['access-token'],
              'client': response.headers['client'],
              'uid': response.headers['uid'],
              'expiry': response.headers['expiry'],
              'token-type': response.headers['token-type'],
            };
            return user;
          }
          
          console.error("Auth login failed. No (user) found.");
          return null;
        } catch (e) {
          // Error handling for the API since so far it's been huge PITA
          console.error("Auth login error");
          if (e.response) {
            console.error("Auth API responded with an error.");
            console.error("Auth Status:", e.response.status);
            console.error("Auth Data:", JSON.stringify(e.response.data, null, 2));
            console.error("Auth Headers:", JSON.stringify(e.response.headers, null, 2));
          } else if (e.request) {
            console.error("Auth no response from API server.");
          } else {
            console.error("Auth error setting up the API request:", e.message);
          }
          return null;
        }
      },
    }), 
  ],
  callbacks: {
    // JWT and session callbacks for cookie / sesh persistence purposes 
    // Admittedly not sure why we need both of them
    // User comes from the response.data.data
    // Token persists even if user is gone (like subsequent visits without logging in)
    async jwt({ token, user }) {
      console.log('Auth.js: JWT callback triggered.');
      if (user) {
        console.log('Auth.js: User object received in JWT callback:', user);
        token.id = user.id;
        token.email = user.email;
        token.apiHeaders = user.apiHeaders;
      }
      if (user?.apiHeaders) {
        token.apiHeaders = user.apiHeaders;
      }
      console.log('Auth.js: Returning token:', token);
      return token;
    },
    // Session callback to make the token data available to the rest of the pages
    // Every auth() call returns this session object
    async session({ session, token }) {
      console.log('Auth.js: Session callback triggered with token:', token);
      session.user.id = token.id;
      session.user.email = token.email;
      session.apiHeaders = token.apiHeaders;
      console.log('Auth.js: Returning session:', session);
      if (token?.id) {
        session.user.id = token.id;
      }
      if (token?.apiHeaders) {
        session.user.apiHeaders = token.apiHeaders;
      }
      return session;
    },
  },
});
