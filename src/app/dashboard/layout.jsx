import { redirect } from 'next/navigation';
import { auth } from '../../../auth';
import Navigation from '@/components/navigation/navigation';
import { fetchChannels, fetchUsers } from '@/lib/data';
import { Box, Typography } from '@mui/material';
import Background from '../../../public/assets/images/bg-welcome-01.png';

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
    <Box
      component='main'
      sx={{
        boxSizing: 'border-box',
        flex: 1,
        p: '2rem',
        m: 0,
        height: '100vh',
        width: '100%',
        overflowY: 'auto',
        backgroundImage: `url(${Background.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        aspectRatio: '16/9',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row'}
      }}>
      <img src='/assets/images/bg-corner-topleft-01.png' style={{ position: 'absolute', top: 40, left: 40, width: '40px', height: '40px' }} alt="Top left corner design" />
      <img src='/assets/images/bg-corner-topright-01.png' style={{ position: 'absolute', top: 40, right: 40, width: '40px', height: '40px' }} alt="Top right corner design" />
      <img src='/assets/images/bg-corner-bottomleft-01.png' style={{ position: 'absolute', bottom: 40, left: 40, width: '40px', height: '40px' }} alt="Bottom left corner design" />
      <img src='/assets/images/bg-corner-bottomright-01.png' style={{ position: 'absolute', bottom: 40, right: 40, width: '40px', height: '40px' }} alt="Bottom right corner design" />
      
      <Box component='main' 
        sx={{
          flex: 1,
          w: '100%',
          display: 'flex',
          justifyContent: 'center',
          // alignItems: 'center',
          gap: 1,
          flexDirection: 'row',
          mx: '40px',
          my: '70px',
          border: '2px solid #FF7300'
      }}>
        <Box component='section'
          sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
          <Box sx={{}}>
            <Typography variant='h7'>./MAIN_MENU</Typography>
          </Box>
          <Navigation channels={channels} users={users} />
        </Box>
        <Box component='section'
          sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
          <Box sx={{}}>
            <Typography variant='h7'>.//USER_LIST</Typography>
          </Box>
          {children}
        </Box>
        <Box style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
          {/* {children} */}
        </Box>
      </Box>
    </Box>
  );
}
