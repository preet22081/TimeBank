'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 text-white">
      {/* Glassmorphic Card */}
      <div className="backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center transition duration-300 hover:scale-[1.02]">
        <img
          src="/hero.png"
          alt="Time Bank Logo"
          className="w-24 h-24 mx-auto mb-6 rounded-full shadow-lg border border-white/20"
        />

        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
          Welcome to <span className="text-[#00ffcc]">Time Bank</span>
        </h1>
        <p className="text-gray-300 text-md mb-6 leading-relaxed">
          Exchange your time for services and grow your community together. Save time, help others, and connect meaningfully.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/login')}
            className="bg-[#00ffcc] hover:bg-[#00e6b8] text-[#0f172a] font-semibold px-6 py-2 rounded-lg transition shadow-md"
          >
            Login
          </button>
          <button
            onClick={() => router.push('/register')}
            className="border border-[#00ffcc] text-[#00ffcc] hover:bg-[#00ffcc1a] px-6 py-2 rounded-lg transition shadow-md"
          >
            Register
          </button>
        </div>
      </div>

      {/* Glow effect at bottom */}
      <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-[#00ffcc]/10 to-transparent pointer-events-none" />
    </div>
  );
}
