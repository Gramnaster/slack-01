'use server';

// import { revalidatePath } from 'next/cache';
import { signIn, signOut } from '../../auth';
// import { redirect } from 'next/navigation';

export async function authenticate(prevState, formData) {
  try {
    // Object.fromEntries(formData) from form submission as FormData object
    // FormData { email: 'user@email.com', password: '123' }
    // Converts to plain object (not FormData object anymore)
    // { email: 'user@email.com', password: '123' }
    const credentials = Object.fromEntries(formData);
    // Auth.js handles redirect after success, which is why signIn/Out is imported from there
    // We could also redirect from Next.js manually
    await signIn('credentials', { 
      ...credentials,
      redirectTo: '/dashboard'
    });
  } catch (error) {
    // CredentialsSignIn is built-in, recognisable error from Next-Auth
    if (error.type === 'CredentialsSignin') {
      return 'Invalid credentials.';
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: '/login' });
}
