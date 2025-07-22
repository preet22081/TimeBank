'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNavbar() {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? 'text-[#3EB489] font-semibold' : 'hover:text-[#3EB489]';

  const handleLogout = () => {
    localStorage.removeItem('timebank_token');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-[#0f172a] text-white px-6 py-4 shadow-md flex justify-between items-center fixed w-full top-0 z-50">
      <div className="flex gap-6 font-medium text-lg">
        <Link href="/admin/dashboard" className={isActive('/admin/dashboard')}>
          Dashboard
        </Link>
        <Link href="/admin/users" className={isActive('/admin/users')}>
          Users
        </Link>
        <Link href="/admin/bookings" className={isActive('/admin/bookings')}>
          Bookings
        </Link>
        
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">👤 Admin</span>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white font-medium px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
