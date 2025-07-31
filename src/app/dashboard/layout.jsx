import { redirect } from 'next/navigation';
import { auth } from '../../../auth';
import Navigation from '@/components/navigation/navigation';
import { fetchChannels, fetchUsers } from '@/lib/data';

export default async function MainLayout({ children }) {
  // Check authentication on the server side
  const session = await auth();
  
  console.log('Dashboard layout: Server-side session check:', !!session);
  
  if (!session) {
    console.log('Dashboard layout: No session found, redirecting to login');
    redirect('/login');
  }

  console.log('Dashboard layout: User authenticated, fetching data');
  
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
