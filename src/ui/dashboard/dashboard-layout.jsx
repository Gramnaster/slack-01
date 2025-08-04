'use client';

// import { redirect } from 'next/navigation';
// import { auth } from '../../../auth';
import Navigation from '@/components/navigation/navigation';
// import { fetchChannels, fetchUsers } from '@/lib/data';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import Background from '../../../public/assets/images/bg-welcome-01.png';
import { Suspense, useMemo, useState } from 'react';
import { logout } from '@/lib/actions';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import diamond from '../../../public/assets/images/list-diamondchevron-01.png';

// Channels and users are fetcehd from dashboard/layout.jsx - the server component
// Added default arrays because if they don't, it will crash
export default function DashboardLayout({ children, channels = [], users = [] }) {
  // const [currentPage, setCurrentPage] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const pathname = usePathname();
  const theme = useTheme();
  
  // Check authentication on the server side
  // const session = await auth();
  
  // console.log('Dashboard session check:', !!session);
  
  // If no session, redirect to login
  // Should ideally be universal instead, but middleware doesn't work for some reason
  // Users never see protected content since it runs before component mounts
  // if (!session) {
  //   console.log('Dashboard no session found, redirecting to login');
  //   redirect('/login');
  // }

  // console.log('Dashboard user authenticated, fetching data');
  
  // User is authenticated, fetch the data on the server
  // const channels = await fetchChannels();
  // const users = await fetchUsers();
  // Parallel data fetch so logging in is faster
  // const [channels, users] = await Promise.all([
  //   fetchChannels(session),
  //   fetchUsers(session)
  // ]);

  const handleSearchBar = (e) => {
    setSearchWord(e.target.value);
  };

   // Moved sorting above Navigation
   // useMemo prevents re-sorting on every render.
   // Create a (shallow) copy before sorting to avoid mutating the original prop
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => a.id - b.id);
  }, [users]);

  const sortedChannels = useMemo(() => {
    return [...channels].sort((a, b) => b.id - a.id);
  }, [channels]);

  // Get first id from already sorted lists for navigation purposes
  // So dmLink and chLink, when clicked, automatically goes to the first on the list
  const firstUserId = sortedUsers.length > 0 ? sortedUsers[0].id : null;
  const firstChannelId = sortedChannels.length > 0 ? sortedChannels[0].id : null;

  // If userId/channelId not found, redirect to empty page
  const dmLink = firstUserId ? `/dashboard/dm/${firstUserId}` : '/dashboard/dm';
  const chLink = firstChannelId ? `/dashboard/ch/${firstChannelId}` : '/dashboard/ch';

  // Standard Next check for pathname, useful for determining whether Link is active
  const isDmActive = pathname.startsWith('/dashboard/dm');
  const isChActive = pathname.startsWith('/dashboard/ch');

  // Styles for the link's active and non-active state
  const baseLinkStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 4px',
    textDecoration: 'none',
    color: 'inherit',
    fontFamily: "var(--font-roboto-mono), monospace",
    fontSize: '12px',
  };

  const activeLinkStyle = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  };

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
      {/* Background Details */}
      <img src='/assets/images/bg-corner-topleft-01.png' style={{ position: 'absolute', top: 40, left: 40, width: '40px', height: '40px' }} alt="Top left corner design" />
      <img src='/assets/images/bg-corner-topright-01.png' style={{ position: 'absolute', top: 40, right: 40, width: '40px', height: '40px' }} alt="Top right corner design" />
      <img src='/assets/images/bg-corner-bottomleft-01.png' style={{ position: 'absolute', bottom: 40, left: 40, width: '40px', height: '40px' }} alt="Bottom left corner design" />
      <img src='/assets/images/bg-corner-bottomright-01.png' style={{ position: 'absolute', bottom: 40, right: 40, width: '40px', height: '40px' }} alt="Bottom right corner design" />
      <img src='/assets/images/bg-dots-squaretop-01.png' style={{ position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%)' }} alt="Center three dots" />
      <img src='/assets/images/bg-dots-bottom-01.png' style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }} alt="Center three dots" />
      
      {/* Primary container */}
      <Box component='main' 
        sx={{
          flex: 1,
          w: '100%',
          display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          gap: 0,
          flexDirection: 'row',
          mx: '40px',
          my: '70px',
          border: '2px solid #FF7300',
          backgroundColor: '#251A1399'
      }}>
        {/* Main Menu Section */}
        <Box component='section'
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            w:'180px',
            border: '1px solid #FF7300',
            minWidth: 0,
        }}>
          <Box 
            sx={{
              h: '100%',
              p: '4px',
              borderBottom: '1px solid #FF7300',
              borderRight: '1px solid #1A1A1A',
              backgroundColor: '#FF7300'
            }}>
            <Typography variant='body2' color='text.secondary'>./MAIN_MENU</Typography>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Suspense>
              {/* <Navigation channels={channels} users={users} /> */}
              {/* Active link styling with reusable components */}
              <Link href={dmLink} style={{ ...baseLinkStyle, ...(isDmActive && activeLinkStyle), height:'40px'  }}>
                dir_msg
                {isDmActive && <Image src={diamond} alt="active indicator" width={24} height={24} style={{marginLeft: 'auto'}} />}
              </Link>
              <Link href={chLink} style={{ ...baseLinkStyle, ...(isChActive && activeLinkStyle), height:'40px'  }}>
                user_ch
                {isChActive && <Image src={diamond} alt="active indicator" width={24} height={24} style={{marginLeft: 'auto'}} />}
              </Link>
              <Box sx={{display: 'flex', flexDirection: 'column', overflowY: 'auto', pb: '50px'}}>
                <Navigation channels={sortedChannels} users={sortedUsers} hideUsers searchWord={searchWord}/>
              </Box>
            </Suspense>
          </Box>
          <Box sx={{display: 'flex', justifyContent:'flex-end', mt: 'auto'}}>
            <form action={logout}>
              <Button variant='contained' type='submit' sx={{w:'100px', h:'42px', borderRadius: 0, gap: 1}}>
                <img src='/assets/images/button-logout-01.png' style={{ width: '20px', height: '20px' }}/>  LOG_OUT
              </Button>
            </form>
          </Box>
        </Box>

        {/* User List Section */}
        <Box component='section'
          sx={{
            display: 'flex',
            flex: 2,
            flexDirection: 'column',
            w:'180px',
            border: '1px solid #FF7300'
        }}>
          <Box sx={{
            h: '100%',
            p: '4px',
            borderBottom: '1px solid #FF7300',
            borderLeft: '1px solid #1A1A1A',
            borderRight: '1px solid #1A1A1A',
            backgroundColor: '#FF7300',
            minWidth: 0,
          }}>
            <Typography variant='body2' color='text.secondary'>.//USER_LIST</Typography>
          </Box>
          <Box sx={{overflowY:'auto'}}>
            <Box>
              <TextField
                fullWidth
                placeholder='Search_user...'
                value={searchWord}
                onChange={handleSearchBar}
                sx={{
                  h: '40px',
                  '& .MuiOutlinedInput-root': {
                  backgroundColor: 'transparent',
                  '& fieldset': { borderColor: '#FF7300' },
                  '&:hover fieldset': { borderColor: '#FF7300' },
                  '&.Mui-focused fieldset': { borderColor: '#FF7300' }},
                  '& input': { color: '#FF7300' },
                  '& input::placeholder': { color: 'rgba(255, 115, 0, 0.5)', opacity: 1 }
                }}
              />
          </Box>
            <Navigation users={sortedUsers} channels={sortedChannels} hideChannels searchWord={searchWord}/>
          </Box>
        </Box>
        {/* Messages Section */}
        <Box component='section'
          sx={{
            display: 'flex',
            flex: 5,
            flexDirection: 'column',
            w:'180px',
            border: '1px solid #FF7300'
        }}>
          <Box sx={{
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'space-between',
              h: '100%',
              p: '4px',
              borderBottom: '1px solid #FF7300',
              borderLeft: '1px solid #1A1A1A',
              borderRight: '1px solid #1A1A1A',
              backgroundColor: '#FF7300'}}>
            <Typography variant='body2' color='text.secondary'>.///DIRECT_MESSAGES</Typography>
            <Typography variant='body2' color='text.secondary'>TO::/RYAN_JAVS_ALEA@YAHOO.COM</Typography>
          </Box>
          <Box>
            {children}
          </Box>
          
        </Box>
        {/* Console Section */}
        <Box component='section'
          sx={{
            display: 'flex',
            flex: 3,
            flexDirection: 'column',
            w:'180px',
            border: '1px solid #FF7300'
        }}>
          <Box sx={{
            h: '100%',
            p: '4px',
            borderBottom: '1px solid #FF7300',
            borderLeft: '1px solid #1A1A1A',
            backgroundColor: '#FF7300'
          }}>
            <Typography variant='body2' color='text.secondary' 
              sx={{display:'flex', justifyContent:'flex-end'}}>
                ./CONSOLE_LOG
            </Typography>
          </Box>
          Console_Format
        </Box>
      </Box>
    </Box>
  );
}
