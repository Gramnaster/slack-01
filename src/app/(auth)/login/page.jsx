'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export default function LoginPage() {
  // useActionState imported from base React for React 19+
  // Parameters: authenticate and undefined init state
  // Returns: errorMessage from server, formAction that handles state, isPending if action is running
  // Needs 'use client' since it's a React hook
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  // formAction passes data to authenticate @/lib/actions Server Comp
  // Server Comp processes login and returns result to useActionState as 'authenticate'
  // Component re-renders with new state
  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
      <h1>Please log in to continue.</h1>
      <form action={formAction}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit" aria-disabled={isPending}>
          {isPending ? 'Logging in...' : 'Log in'}
        </button>
        {errorMessage && (
          <p style={{ color: 'red' }}>{errorMessage}</p>
        )}
      </form>
    </div>
  );
}