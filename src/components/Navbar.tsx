'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserCircle } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('timebank_token');
    router.push('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f172a] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left links */}
        <div className="flex gap-6 font-medium text-base">
          {[
            ['Dashboard', '/dashboard'],
            ['Search', '/search'],
            ['Add Offer', '/add-offer'],
            ['Add Request', '/add-request'],
            ['Bookings', '/bookings'],
          ].map(([label, path]) => (
            <Link
              key={path}
              href={path}
              className="hover:text-cyan-400 transition duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right section: profile and logout */}
        <div className="flex items-center gap-4">
          <Link
            href="/profile"
            className="flex items-center gap-2 text-sm hover:text-cyan-300 transition"
          >
            <UserCircle className="w-5 h-5" />
            <span className="font-medium">Profile</span>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
