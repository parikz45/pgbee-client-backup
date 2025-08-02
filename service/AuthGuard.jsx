'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
// import { getAccessToken } from '@/utils/auth';

export default function AuthGuard({ children }) {
  const [checking, setChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // TEMPORARILY SKIPPING AUTH
    // const token = getAccessToken();
    // const publicRoutes = ['/auth/login', '/auth/signup'];

    // Skip auth logic for testing
    setChecking(false);
  }, [pathname]);

  if (checking) return null;
  return <>{children}</>;
}
