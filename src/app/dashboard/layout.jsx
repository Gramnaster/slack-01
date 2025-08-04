import { redirect } from 'next/navigation';
import { auth } from '../../../auth';
import { fetchChannels, fetchUsers } from '@/lib/data';
import MainLayout from './page';

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
    <MainLayout channels={channels} users={users}>
      {children}
    </MainLayout>
  );
}