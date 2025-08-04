import { redirect } from 'next/navigation';
import { auth } from '../../../auth';
import { fetchChannels, fetchUsers } from '@/lib/data';
// import MainLayout from './page';
import DashboardLayout from '@/ui/dashboard/dashboard-layout';

// Moved async here at layout as server component
// Because client and server components must be separated in Next
export default async function ServerMainLayout({ children }) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const [channels, users] = await Promise.all([
    fetchChannels(session),
    fetchUsers(session)
  ]);

  return (
    // <MainLayout>
    <DashboardLayout channels={channels} users={users}>
      {children}
    </DashboardLayout>
  );
}