'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define routes where navbar should be hidden
  const hideNavbarRoutes = ['/','/login', '/register'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8FAFC] text-[#334155]">
        {shouldShowNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}
