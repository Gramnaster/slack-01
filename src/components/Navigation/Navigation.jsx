// 'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { logout } from '../../lib/actions';
import { Box, useTheme } from '@mui/material';
// import { useEffect, useState } from 'react';
import diamond from '../../../public/assets/images/list-diamondchevron-01.png';
import Image from 'next/image';

export default function Navigation({ channels = [], users = [], searchWord = '', children, hideUsers = false, hideChannels = false  }) {
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

  return (
    <nav>
      {children}

      <Box>
        {/* {!hideUsers && (
          <TextField
            fullWidth
            placeholder='Search_user...'
            value={searchWord}
            onChange={handleSearchBar}
            sx={{
              '& .MuiOutlinedInput-root': {
              backgroundColor: 'transparent',
              '& fieldset': {
                borderColor: '#FF7300',
              },
              '&:hover fieldset': {
                borderColor: '#FF7300',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FF7300',
              }},
              '& input': {
                color: '#FF7300',
              },
              '& input::placeholder': {
                color: 'rgba(255, 115, 0, 0.5)',
                opacity: 1,
              }
          }}/>
        )} */}
      </Box>

      {/* Users List */}
      {!hideUsers && (
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
                  <span style={textSpanStyle}>./+/:{channel.name}</span>
                  {isActive && 
                    <Image src={diamond} alt="active indicator" width={18} height={18} style={{marginLeft: 'auto'}}/>}
                </Box>
              </li>
            );
          })}
        </ul>
      )}
      
    </nav>
  );
}