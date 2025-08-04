'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { logout } from '../../lib/actions';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

export default function Navigation({ channels = [], users = [], children }) {
  const pathname = usePathname();
  const [searchWord, setSearchWord] = useState('');

  // Filters through the current user list and sorts by descending id with standard sort
  const filteredUsers = users
    .filter((user) => user.email.toLowerCase().includes(searchWord.toLowerCase()))
    .sort((a,b) => b.id - a.id);

  // Filters through the current channel list and sorts by id descending
  const filteredChannels = channels
    .filter((channel) => channel.name.toLowerCase().includes(searchWord.toLowerCase()))
    .sort((a,b) => b.id - a.id);


  const handleSearchBar = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <nav>
      {children}

      <Box>
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
      </Box>

      {/* Users List */}
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <Link href={`/dashboard/dm/${user.id}`} style={{ color: pathname === `/dashboard/dm/${user.id}` ? 'blue' : 'inherit' }}>
              {user.email}
            </Link>
          </li>
        ))} 
      </ul>

      {/* Channels List */}
      <ul>
        {filteredChannels.map((channel) => (
          <li key={channel.id}>
            <Link href={`/dashboard/ch/${channel.id}`} style={{ color: pathname === `/dashboard/ch/${channel.id}` ? 'blue' : 'inherit' }}>
              # {channel.name}
            </Link>
          </li>
        ))}
      </ul>
      
    </nav>
  );
}