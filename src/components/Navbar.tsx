'use client';

import Link from 'next/link';

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('timebank_token'); // Clear login token
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <nav className="bg-white text-gray-800 px-6 py-4 shadow-md flex justify-between items-center fixed w-full top-0 z-50">
      <div className="flex gap-6 font-semibold text-lg">
        <Link
          href="/dashboard"
          className="hover:text-[#3EB489] transition duration-300"
        >
          Dashboard
        </Link>
        <Link
          href="/search"
          className="hover:text-[#3EB489] transition duration-300"
        >
          Search
        </Link>
        <Link
          href="/admin"
          className="hover:text-[#3EB489] transition duration-300"
        >
          Admin
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-[#3EB489] text-white font-semibold text-lg px-4 py-2 rounded hover:bg-[#32a17b] transition duration-300"
      >
        Logout
      </button>
    </nav>
  );
}
