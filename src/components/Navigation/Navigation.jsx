'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { logout } from '../../lib/actions';
import { Button } from '@mui/material';

export default function Navigation({ channels = [], users = [], children }) {
  const pathname = usePathname();

  return (
    <nav>
      {children}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/dashboard/dm/${user.id}`} style={{ color: pathname === `/dashboard/dm/${user.id}` ? 'blue' : 'inherit' }}>
              {user.email}
            </Link>
          </li>
        ))} 
        {/* <li>dir_msg
        </li> */}
      </ul>
      <ul>
        {channels.map((channel) => (
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