import { redirect } from 'next/navigation';
import { auth } from '../../../auth';
import { fetchChannelDetails, fetchChannels, fetchUsers } from '@/lib/data';
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
    fetchUsers(session),
  ]);

  console.log('ServerMainlayout channels:', channels, typeof channels);
  console.log('ServerMainlayout users:', users, typeof users);

  // Fetch detailed channel data for each channel to get channel_members
  const detailedChannelsData = await Promise.all(
    channels.map(channel => fetchChannelDetails(channel.id))
  );

  console.log('ServerMainlayout detailedChannels:', detailedChannelsData);

  const usersById = new Map(users.map(user => [user.id, user]));

  const fullChannelDetails = detailedChannelsData.map(channel => {
    if (!channel.channel_members) {
      return channel;
    }

    const allMembers = channel.channel_members
      .map(member => ({
        ...member,
        user: usersById.get(member.user_id) || null
      }))
      .filter(member => member.user)
      .sort((a, b) => a.user.id - b.user.id);

      return {
      ...channel,
      channel_members: allMembers,
    };
  });

  return (
    // <MainLayout>
    <DashboardLayout channels={fullChannelDetails} users={users} channelMembers={[]} sx={{display:'flex'}}>
      {children}
    </DashboardLayout>
  );
}