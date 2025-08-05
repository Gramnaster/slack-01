'use client';

// import { redirect } from 'next/navigation';
// import { auth } from '../../../auth';
import Navigation from '@/components/navigation/navigation';
// import { fetchChannels, fetchUsers } from '@/lib/data';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import Background from '../../../public/assets/images/bg-welcome-01.png';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { logout } from '@/lib/actions';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import diamond from '../../../public/assets/images/list-diamondchevron-01.png';
import Codegen from '@/components/main-menu/codegen';
import { formatDateToLocal } from '@/lib/utils';

// Channels and users are fetcehd from dashboard/layout.jsx - the server component
// Added default arrays because if they don't, it will crash
export default function DashboardLayout({ children, channels = [], users = [], }) {
  // const [currentPage, setCurrentPage] = useState('');
  // const [searchWord, setSearchWord] = useState('');
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

  // const handleSearchBar = (e) => {
  //   setSearchWord(e.target.value);
  // };

  // Moved sorting above Navigation
  // useMemo prevents re-sorting on every render.
  // Create a (shallow) copy before sorting to avoid mutating the original prop
  const sortedUsers = useMemo(() => {
    // Returns mutated array where b is larger than a
    // Returns array of increasing id
    return [...users].sort((a, b) => a.id - b.id);
  }, [users]);

  const sortedChannels = useMemo(() => {
    return [...channels].sort((a, b) => b.id - a.id);
  }, [channels]);

  // Sorting is moved to Parent Layout directly instead
  // const sortedChannelMembers = useMemo(() => {
  //   // Returns mutated array where b is larger than a
  //   // Returns array of increasing id
  //   return [...channelMembers].sort((a, b) => a.id - b.id);
  // }, [users]);

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
    borderTop: '1px solid #1A1A1A',
    borderBottom: '1px solid #1A1A1A'
  };

  const [triNumber, setTriNumber] = useState('000 000 000 000');
    
  useEffect(() => {
    // const handleStart = () => setIsLoading(true);
    // const handleComplete = () => setIsLoading(false);
    setTriNumber(Codegen());
  }, []);

  return (
    <Box
      component='main'
      sx={{
        boxSizing: 'border-box',
        position: 'relative',
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
        flexDirection: { xs: 'column', sm: 'row'},
        // height: 'calc(100vh - 140px)',
        overflow: 'hidden'
    }}>
      {/* Background Details */}
      <img src='/assets/images/bg-corner-topleft-01.png' style={{ position: 'absolute', top: 40, left: 40, width: '40px', height: '40px' }} alt="Top left corner design" />
      <img src='/assets/images/bg-corner-topright-01.png' style={{ position: 'absolute', top: 40, right: 40, width: '40px', height: '40px' }} alt="Top right corner design" />
      <img src='/assets/images/bg-corner-bottomleft-01.png' style={{ position: 'absolute', bottom: 40, left: 40, width: '40px', height: '40px' }} alt="Bottom left corner design" />
      <img src='/assets/images/bg-corner-bottomright-01.png' style={{ position: 'absolute', bottom: 40, right: 40, width: '40px', height: '40px' }} alt="Bottom right corner design" />
      <img src='/assets/images/bg-dots-squaretop-01.png' style={{ position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%)' }} alt="Center three dots" />
      <img src='/assets/images/bg-dots-bottom-01.png' style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)' }} alt="Center three dots" />
      
      <Typography sx={{ position: 'absolute', top: 60, left: 60 }}> USER-ACCESS-GRANTED // </Typography>
      {/* eslint-disable-next-line */}
      <Typography sx={{ position: 'absolute', bottom: 60, left: 60 }}>{triNumber} // </Typography>
      <Typography sx={{ position: 'absolute', top: 60, right: 60 }}>{formatDateToLocal()} </Typography>
      {/* eslint-disable-next-line */}
      <Typography sx={{ position: 'absolute', bottom: 60, right: 60 }}>// {formatDateToLocal('yearFormat')}-ALLRIGHTSRESERVED-COPYRIGHT:JPVILLALON </Typography>

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
            minWidth: '150px',
            maxWidth: '180px',
            border: '1px solid #FF7300',
            // minWidth: 0,
        }}>
          {/* Section Header */}
          <Box 
            sx={{
              h: '100%',
              p: '4px',
              borderBottom: '1px solid #FF7300',
              borderRight: '1px solid #1A1A1A',
              backgroundColor: '#FF7300'
            }}>
            <Box component={Link} href='/dashboard'>
              <Typography variant='body2' color='text.secondary'>./MAIN_MENU</Typography>
            </Box>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Suspense>
              {/* Active link styling with reusable components */}
              <Box component={Link} href={dmLink} 
                sx={{ ...baseLinkStyle, ...(isDmActive && activeLinkStyle), height:'40px', border: '1px solid #FF7300',
                  ...(!isDmActive && {'&:hover': { backgroundColor: '#ff73003e' }}),
              }}>
                dir_msg
                {isDmActive && <Image src={diamond} alt="active indicator" width={18} height={18} style={{marginLeft: 'auto'}} />}
              </Box>
              <Box component={Link} href={chLink} 
                sx={{ ...baseLinkStyle, ...(isChActive && activeLinkStyle), height:'40px', border: '1px solid #FF7300',
                  ...(!isChActive && {'&:hover': { backgroundColor: '#ff73003e' }}),
              }}>
                user_ch
                {isChActive && <Image src={diamond} alt="active indicator" width={18} height={18} style={{marginLeft: 'auto'}} />}
              </Box>
              <Box sx={{display: 'flex', flexDirection: 'column', overflowY: 'auto', pb: '50px'}}>
                <Navigation channels={sortedChannels} users={sortedUsers} hideUsers/>
              </Box>
            </Suspense>
          </Box>
          <Box sx={{display: 'flex', justifyContent:'center', mt: 'auto', pb: 1}}>
            <form action={logout}>
              <Button variant='contained' type='submit' fullWidth sx={{width:'100%', height:'42px', borderRadius:0, gap:1, display:'flex', justifyContent:'center'}}>
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
            border: '1px solid #FF7300',
            // height: '100%',
            minHeight: 0,
            overflowY:'hidden'
        }}>
          {/* Section Header */}
          {/* <Box sx={{
            h: '100%',
            p: '4px',
            borderBottom: '1px solid #FF7300',
            borderLeft: '1px solid #1A1A1A',
            borderRight: '1px solid #1A1A1A',
            backgroundColor: '#FF7300',
            minWidth: 0,
          }}>
            <Typography variant='body2' color='text.secondary'>.//USER_LIST</Typography>
          </Box> */}
          {/* {/* <Box sx={{overflowY:'auto'}}> */}
            {/* Search Bar for UserList */}
            {/* <Box>
              <TextField
                fullWidth
                placeholder='Search_user...'
                value={searchWord}
                size='small'
                onChange={handleSearchBar}
                sx={{
                  h: '40px',
                  '& .MuiOutlinedInput-root': {
                  backgroundColor: 'transparent',
                  '& fieldset': { borderColor: '#FF7300' },
                  '&:hover fieldset': { borderColor: '#FF7300' },
                  '&.Mui-focused fieldset': { borderColor: '#FF7300' }},
                  '& input': { color: '#FF7300', fontSize: '12px' },
                  '& input::placeholder': { color: 'rgba(255, 115, 0, 0.5)', opacity: 1, fontSize: '12px' }
                }}
              /> 
          </Box> */}
          <Box sx={{flex:1, overflow:'hidden', minHeight: 0}}>
            <Navigation users={sortedUsers} channels={sortedChannels} hideChannels/>
          </Box>
        </Box>

        {/* Messages Section */}
        <Box component='section'
          sx={{
            display: 'flex',
            flex: 5,
            flexDirection: 'column',
            w:'180px',
            border: '1px solid #FF7300',
            // height: '100%',
            minHeight: 0,
            overflowY:'hidden'
        }}>
          {/* Section Header */}
          {/* <Box sx={{
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'space-between',
              // h: '100%',
              flexShrink: 0, 
              p: '4px',
              borderBottom: '1px solid #FF7300',
              borderLeft: '1px solid #1A1A1A',
              borderRight: '1px solid #1A1A1A',
              backgroundColor: '#FF7300'
          }}>
            <Typography variant='body2' color='text.secondary'>.///DIRECT_MESSAGES</Typography>
            <Typography variant='body2' color='text.secondary'>TO::/RYAN_JAVS_ALEA@YAHOO.COM</Typography>
          </Box> */}

          <Box sx={{flex:1, overflow:'hidden', minHeight: 0}}>
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
          {/* Section Header */}
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
