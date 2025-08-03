'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '../../lib/actions';
import { Button } from '@mui/material';

export default function Navigation({ channels = [], users = [], children }) {
  const pathname = usePathname();

  return (
    <nav style={{ borderRight: '1px solid #ccc'}}>
      {children}
      <ul>
        {/* {users.map((user) => (
          <li key={user.id}>
            <Link href={`/dm/${user.id}`} style={{ color: pathname === `/dm/${user.id}` ? 'blue' : 'inherit' }}>
              {user.email}
            </Link>
          </li>
        ))} */} 
        <li>dir_msg
        </li>
      </ul>
      <hr />
      <ul>
        {/* {channels.map((channel) => (
          <li key={channel.id}>
            <Link href={`/channels/${channel.id}`} style={{ color: pathname === `/channels/${channel.id}` ? 'blue' : 'inherit' }}>
              # {channel.name}
            </Link>
          </li>
        ))} */} user_ch
      </ul>
      <hr />
      <form action={logout}>
        <Button variant='contained' type='submit' sx={{w:'100px', h:'42px', borderRadius: 0, gap: 1}}>
          <img src='/assets/images/button-logout-01.png' style={{ width: '20px', height: '20px' }}/>  LOG_OUT
        </Button>
      </form>
    </nav>
  );
}