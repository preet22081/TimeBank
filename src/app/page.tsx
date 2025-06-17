'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC] text-[#334155] p-6">
      <img src="/hero.png" alt="Site Logo" className="w-32 h-32 mb-6" /> {/* Replace with your actual logo path */}

      <h1 className="text-4xl font-extrabold text-[#1E293B] mb-4">Welcome to Time Bank</h1>
      <p className="text-lg mb-6 text-center max-w-md">Exchange time, grow together. Join now to give or receive services in your community.</p>

      <div className="flex space-x-4">
        <button
          onClick={() => router.push('/login')}
          className="bg-[#3EB489] text-white px-6 py-2 rounded hover:bg-[#32a17b]"
        >
          Login
        </button>
        <button
          onClick={() => router.push('/register')}
          className="bg-white border border-[#3EB489] text-[#3EB489] px-6 py-2 rounded hover:bg-[#f0fdf9]"
        >
          Register
        </button>
      </div>
    </div>
  );
}
