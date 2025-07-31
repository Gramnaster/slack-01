import { redirect } from 'next/navigation';
import { auth } from '../../../auth';
import Navigation from '@/components/navigation/navigation';
import { fetchChannels, fetchUsers } from '@/lib/data';

export default async function MainLayout({ children }) {
  // Check authentication on the server side
  const session = await auth();
  
  console.log('Dashboard session check:', !!session);
  
  // If no session, redirect to login
  // Should ideally be universal instead, but middleware doesn't work for some reason
  // Users never see protected content since it runs before component mounts
  if (!session) {
    console.log('Dashboard no session found, redirecting to login');
    redirect('/login');
  }

  console.log('Dashboard user authenticated, fetching data');
  
  // User is authenticated, fetch the data on the server
  const channels = await fetchChannels();
  const users = await fetchUsers();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Navigation channels={channels} users={users} />
      <main style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
