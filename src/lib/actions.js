'use server';

// import { revalidatePath } from 'next/cache';
import { signIn, signOut } from '../../auth';
// import { redirect } from 'next/navigation';

export async function authenticate(prevState, formData) {
  try {
    const credentials = Object.fromEntries(formData);
    await signIn('credentials', { 
      ...credentials,
      redirectTo: '/dashboard'
    });
  } catch (error) {
    if (error.type === 'CredentialsSignin') {
      return 'Invalid credentials.';
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: '/login' });
}
