'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '../../lib/actions';

export default function Navigation({ channels = [], users = [] }) {
  const pathname = usePathname();

  return (
    <nav style={{ width: '250px', borderRight: '1px solid #ccc', padding: '1rem' }}>
      <h2>Direct Messages</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/dm/${user.id}`} style={{ color: pathname === `/dm/${user.id}` ? 'blue' : 'inherit' }}>
              {user.email}
            </Link>
          </li>
        ))}
      </ul>
      <h2>Channels</h2>
      <hr />
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>
            <Link href={`/channels/${channel.id}`} style={{ color: pathname === `/channels/${channel.id}` ? 'blue' : 'inherit' }}>
              # {channel.name}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
      <form action={logout}>
        <button type="submit">Log Out</button>
      </form>
    </nav>
  );
}