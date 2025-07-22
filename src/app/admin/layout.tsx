'use client';

import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      {/* <nav className="flex gap-4 mb-8">
        <Link href="/admin" className="hover:underline">Dashboard</Link>
        <Link href="/admin/users" className="hover:underline">Users</Link>
        <Link href="/admin/offers" className="hover:underline">Offers</Link>
        <Link href="/admin/requests" className="hover:underline">Requests</Link>
        <Link href="/admin/bookings" className="hover:underline">Bookings</Link>
      </nav> */}
      {children}
    </div>
  );
}
