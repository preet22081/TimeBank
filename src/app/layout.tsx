'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import AdminNavbar from '@/components/AdminNavbar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNavbarRoutes = ['/', '/login', '/register'];
  const isAdminRoute = pathname.startsWith('/admin');

  const shouldShowNavbar = !hideNavbarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8FAFC] text-[#334155]">
        {shouldShowNavbar && (
          isAdminRoute ? <AdminNavbar /> : <Navbar />
        )}
        <main className="pt-20 px-4 md:px-8">{children}</main>
      </body>
    </html>
  );
}
