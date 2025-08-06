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
  const detailedChannels = await Promise.all(
    channels.map(channel => fetchChannelDetails(channel.id))
  );

  console.log('ServerMainlayout detailedChannels:', detailedChannels);

  // Gets channel details and user details so I have a full view of channel_members
  // When I prop-drill the crap into my navigation specifically
  // So I can display their emails properly on my navbar
  // Because it'll look so good for QOL purposes
  const fullChannelDetails = detailedChannels.map((channel) => {
    console.log(`ServerMainlayout processing channel ${channel.id}:`, channel);
    if (channel.channel_members) {
      console.log(`Channel ${channel.id} has members:`, channel.channel_members);
      // Ensures that channel member user_ids have all of their details
      // Will filter these details so any that doesn't match will be removed
      // Finally sort them here instead
      const allMembers = channel.channel_members.map((member) => {
        const fullUserDetails = users.find((user) => user.id === member.user_id);
        console.log('ServerMainlayout fullUserDetails:', fullUserDetails, typeof fullUserDetails);
        return {...member, user: fullUserDetails};
      }).filter((member) => member.user)
        .sort((a,b) => a.user.id - b.user.id);
      console.log('ServerMainlayout allMembers:', allMembers, typeof allMembers);

      return {...channel, channel_members: allMembers};
    } else {
      console.log(`ServerMainlayout channel ${channel.id} has no channel_members`);
      return channel;    
    }
  });
  console.log('ServerMainlayout fullChannelDetails:', fullChannelDetails, typeof fullChannelDetails);

  return (
    // <MainLayout>
    <DashboardLayout channels={fullChannelDetails} users={users} channelMembers={[]} sx={{display:'flex'}}>
      {children}
    </DashboardLayout>
  );
}