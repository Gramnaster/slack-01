'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { logout } from '../../lib/actions';
import { Box, TextField, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import diamond from '../../../public/assets/images/list-diamondchevron-01.png';
import Image from 'next/image';

export default function Navigation({ 
  channels = [], 
  users = [], 
  // searchWord = '', 
  children, 
  hideUsers = false, 
  hideChannels = false, 
  // channelMembers = []  
}) {

  const [searchWord, setSearchWord] = useState('');
  const handleSearchBar = (e) => {
    setSearchWord(e.target.value);
  };

  console.log('Navigation received channels:', channels);
  console.log('Navigation channels sample:', channels[0]);
  console.log('Navigation channel 89 check:', channels.find(ch => ch.id === 89));
  
  const theme = useTheme();
  const pathname = usePathname();
  // const [searchWord, setSearchWord] = useState('');
  // const [isClient, setIsClient] = useState(false);

  // I'm getting re-hydration issues with the userlist so we'll run
  // Client-side checks to ensure it rehydrates properly each time a change happens
  // Runs only on client after component mounts
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // Filters through the current user list and sorts by descending id with standard sort
  const filteredUsers = users
    .filter((user) => user.email.toLowerCase().includes(searchWord.toLowerCase()))
    // .sort((a,b) => a.id - b.id);

  // Filters through the current channel list and sorts by id descending
  const filteredChannels = channels
    .filter((channel) => channel.name.toLowerCase().includes(searchWord.toLowerCase()))
    // .sort((a,b) => b.id - a.id);

  // We gotta know if we're viewing a channel using pathname
  const isChannelSelected = pathname.startsWith('/dashboard/ch/');
  const channelId = isChannelSelected ? pathname.split('/dashboard/ch/')[1] : null;
  console.log('Navigation isChannelSelected:', isChannelSelected);
  console.log('Navigation channelId:', channelId);

  // Get channelMembers
  const currentChannel = channels.find((ch) => ch.id === parseInt(channelId));
  const channelMembers = currentChannel?.channel_members || [];
  console.log('Navigation currentChannel:', currentChannel);
  console.log('Navigation channelMembers:', channelMembers);

  // Filters through channel members when a channel is selected and sorts by id descending
  const filteredChannelMembers = channelMembers
    .filter((member) => member.user?.email.toLowerCase().includes(searchWord.toLowerCase()));
  console.log('Navigation filteredChannelMembers:', filteredChannelMembers);

  // Determines what to show
  const showChannelMembers = isChannelSelected && !hideUsers && filteredChannelMembers.length > 0;
  const showUsersList = !isChannelSelected && !hideUsers;
  console.log('Navigation showChannelMembers:', showChannelMembers);
  console.log('Navigation showUsersList:', showUsersList);

  // Applies sorting on client-side to prevent hydration mismatch
  // How do I even know what goes on client-side and server-side?
  // if (isClient) {
  //   filteredUsers.sort((a,b) => a.id - b.id);
  //   filteredChannels.sort((a,b) => b.id - a.id);
  // }

  // const handleSearchBar = (e) => {
  //   setSearchWord(e.target.value);
  // };

  // Themed style just like MUI's createTheme
  // But for vanilla
  // const linkStyle = { 
  //   fontFamily: "var(--font-roboto-mono), monospace", 
  //   fontSize: '12px',
  //   display: 'block',
  //   whiteSpace: 'nowrap',
  //   overflow: 'hidden',
  //   textOverflow: 'ellipsis',
  //   paddingRight: '10px',
  // };
  
  // Normal and Active styles for the links
  const baseLinkStyle = { 
    fontFamily: "var(--font-roboto-mono), monospace", 
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 4px',
    textDecoration: 'none',
    color: 'inherit',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  };

  const activeLinkStyle = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  };

  const textSpanStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };
  
  // I need to import a dialog here which would let me add members to a channel

  return (
    <Box sx={{display:'flex', flexDirection:'column', height:'100%'}}>
      {/* <nav> */}
        {children}

        {/* Header + Search Bar for when users are visible */}
        {!hideUsers && (
        <Box>
        {/* Section Header */}
          <Box sx={{
            display:'flex',
            h: '100%',
            flexShrink: 0, 
            p: '4px',
            borderBottom: '1px solid #FF7300',
            borderLeft: '1px solid #1A1A1A',
            borderRight: '1px solid #1A1A1A',
            backgroundColor: '#FF7300',
            minWidth: 0,
          }}>
            <Typography variant='body2' color='text.secondary'>
              {showChannelMembers ? './/CHANNEL_MEMBERS' : './/USER_LIST'}
            </Typography>
          </Box>
          {/* <Box> */}
            {/* Search Bar for UserList */}
            <Box sx={{ flexShrink: 0 }}>
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
            </Box>
          {/* </Box> */}
        </Box>
        )}

        <Box 
          sx={{
            display: 'flex', 
            flexDirection:'column', 
            // px: 3, 
            // py: 1, 
            flex:1, 
            overflowY: 'auto', 
            minHeight: 0,
            // flexDirection: 'column-reverse'
          // justifyContent:'flex-end'
        }}>
          {/* <Box sx={{ flex: 1, minHeight: 0 }}> */}
          {/* Users List for Non-Channels */}
          {showUsersList && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {filteredUsers.map((user) => {
                const isActive = pathname === `/dashboard/dm/${user.id}`;
                return (
                <li key={user.id} style={{height:'40px', border: '1px solid #FF7300'}}>
                  {/* Hover and active effects */}
                  {/* Box with component=Link replaces the Link so we can use sx */}
                  <Box 
                    component={Link}
                    href={`/dashboard/dm/${user.id}`} 
                    // onClick={(e) => set}
                    sx={{ 
                      ...baseLinkStyle, 
                      ...(isActive && activeLinkStyle), 
                      height:'40px',
                      border: '1px solid #FF7300',
                      ...(!isActive && {
                        '&:hover': {
                          backgroundColor: '#ff73003e',
                        },
                      }),
                    }}>
                    {/* <Box sx={{display:'flex', justifyContent:'space-between'}}> */}
                      <span style={textSpanStyle}>id:{user.id}-{user.email}</span>
                      {isActive && 
                        <Image src={diamond} alt="active indicator" width={18} height={18} style={{marginLeft: 'auto'}}/>}
                    {/* </Box> */}
                  </Box>
                </li>
                );
              })} 
            </ul>
          )}

          {/* Channels List */}
          {!hideChannels && (
            <Box>
              {/* <Box sx={{
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                // h: '100%',
                flexShrink: 0, 
                p: '4px',
                borderBottom: '1px solid #FF7300',
                // borderLeft: '1px solid #010101ff',
                // borderRight: '1px solid #1A1A1A',
                backgroundColor: '#FF7300',
              }}>
                <Typography variant='body2' color='text.secondary'>
                  .//CHANNEL_LIST
                </Typography>
              </Box> */}
              <TextField
                fullWidth
                placeholder='Search_channels...'
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
                }}/>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {filteredChannels.map((channel) => {
                const isActive = pathname === `/dashboard/ch/${channel.id}`;
                return (
                  <li key={channel.id} style={{height:'40px', border: '1px solid #FF7300'}}>
                    {/* Hover and active effects */}
                    <Box
                      component={Link} 
                      href={`/dashboard/ch/${channel.id}`} 
                      sx={{ 
                      ...baseLinkStyle, 
                      ...(isActive && activeLinkStyle), 
                      height:'40px',
                      border: '1px solid #FF7300',
                      ...(!isActive && {
                        '&:hover': {
                          backgroundColor: '#ff73003e',
                        },
                      }),
                    }}>
                      <span style={textSpanStyle}>ch/:{channel.name}</span>
                      {isActive && 
                        <Image src={diamond} alt="active indicator" width={18} height={18} style={{marginLeft: 'auto'}}/>}
                    </Box>
                  </li>
                );
              })}
            </ul>
          </Box>
          )}

          {/* Channel Members List */}
          {showChannelMembers && (
            <Box>
              {/* <Box sx={{py:'8px', px:'4px' fontSize:'12px'}}>
              </Box> */}
              <ul style={{ listStyle:'none', padding: 0, margin: 0}}>
                {filteredChannelMembers.map((member) => {
                  const isActive = pathname === `/dashboard/dm/${member.user.id}`;
                  return (
                    <li key={member.id} style={{height:'40px', border: '1px solid #FF7300'}}>
                      <Box
                        component={Link}
                        href={`/dashboard/dm/${member.user.id}`}
                        sx={{
                          ...baseLinkStyle,
                          ...(isActive && activeLinkStyle),
                          height: '40px',
                          border: '1px solid #FF7300',
                          ...(!isActive && {
                            '&:hover': {
                              backgroundColor: '#FF7400e',
                            },
                          }),
                        }}>
                          <span style={textSpanStyle}>id:{member.user.id}-{member.user.email}</span>
                          {isActive &&
                            <Image src={diamond} alt='active indiciator' width={18} height={18} style={{marginLeft: 'auto'}}/>
                          }
                        </Box>
                    </li>
                  );
                })}
              </ul>
            </Box>
            )
          }
          {/* </Box> */}
        </Box>
      {/* </nav> */}
    </Box>
  );
}