'use client';

// import { Suspense, useActionState } from 'react';
// import { authenticate } from '@/lib/actions';
import LoginForm from '@/ui/login-form';
import { Suspense } from 'react';

export default function LoginPage() {
  // useActionState imported from base React for React 19+
  // Parameters: authenticate and undefined init state
  // Returns: errorMessage from server, formAction that handles state, isPending if action is running
  // Needs 'use client' since it's a React hook
  // const [errorMessage, formAction, isPending] = useActionState(
  //   authenticate,
  //   undefined,
  // );

  // formAction passes data to authenticate @/lib/actions Server Comp
  // Server Comp processes login and returns result to useActionState as 'authenticate'
  // Component re-renders with new state
  return (
    <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
      <Suspense>
        <LoginForm/>
      </Suspense>
    </div>
  );
}