import { redirect } from 'next/navigation';
import { auth } from '../../../auth';
import { fetchChannels, fetchUsers } from '@/lib/data';
import DashboardClientLayout from './dashboard-client-layout'; // Import the new client layout

export default async function MainLayout({ children }) {
  // 1. Authenticate and fetch data on the server
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const [channels, users] = await Promise.all([
    fetchChannels(session),
    fetchUsers(session)
  ]);

  // 2. Render the Client Component and pass the fetched data as props
  return (
    <DashboardClientLayout channels={channels} users={users}>
      {children}
    </DashboardClientLayout>
  );
}