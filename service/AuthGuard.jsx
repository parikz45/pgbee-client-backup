'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getAccessToken } from '@/utils/auth';

// Routes that require authentication (booking, settings, etc.)
const protectedRoutes = ['/settings', '/booking', '/profile', '/my-bookings'];
// Routes that should redirect to dashboard if user is already logged in
const authRoutes = ['/auth/login', '/auth/signup'];

export default function AuthGuard({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const token = getAccessToken();

    // If user is authenticated and tries to access auth pages, redirect to dashboard
    if (token && authRoutes.includes(pathname)) {
      router.push('/');
    } 
    // If user is not authenticated and tries to access protected routes, redirect to login
    else if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
      router.push('/auth/login');
    }
  }, [pathname, isMounted, router]);

  // Always render children to avoid hydration mismatch
  // The routing logic will handle redirects if needed
  return <>{children}</>;
}
