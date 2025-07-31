'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getAccessToken } from '@/utils/auth';

const publicRoutes = ['/auth/login', '/auth/signup'];

export default function AuthGuard({ children }) {
  const [checking, setChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();

    if (!token && !publicRoutes.includes(pathname)) {
      router.push('/auth/login');
    } else if (token && publicRoutes.includes(pathname)) {
      router.push('/');
    } else {
      setChecking(false);
    }
  }, [pathname]);

  if (checking) return null; // Or a loading spinner
  return <>{children}</>;
}
