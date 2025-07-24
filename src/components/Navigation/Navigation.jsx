'use client'

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { useData } from '@/context/DataProvider';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { handleLogout } = useData();
  
  const onLogout = () => {
    handleLogout();
    router.push('/login');
  };

  return (
    <nav>
      <Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
      <Link href="/directMessages" className={pathname === '/directMessages' ? 'active' : ''}>Direct Messages</Link>
      <Link href="/channels" className={pathname === '/channels' ? 'active' : ''}>Channels</Link>
      <button onClick={onLogout}>Logout</button>
    </nav>
  );
}