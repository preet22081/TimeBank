'use client';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white pt-24 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 tracking-tight drop-shadow">
        Your Time Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 bg-[#1e293b] rounded-2xl shadow-md">
          <h2 className="text-lg text-gray-300">Total Hours</h2>
          <p className="text-3xl font-bold text-green-400 mt-1">120 hrs</p>
        </div>

        <div className="p-6 bg-[#1e293b] rounded-2xl shadow-md">
          <h2 className="text-lg text-gray-300">Hours Given</h2>
          <p className="text-3xl font-bold text-blue-400 mt-1">80 hrs</p>
        </div>

        <div className="p-6 bg-[#1e293b] rounded-2xl shadow-md">
          <h2 className="text-lg text-gray-300">Hours Received</h2>
          <p className="text-3xl font-bold text-purple-400 mt-1">40 hrs</p>
        </div>
      </div>

      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-cyan-400">🩺</span> Recent Activity
        </h2>
        <ul className="space-y-3 text-sm text-gray-300">
          <li>
            <span className="text-green-400">✅</span> You gave{' '}
            <span className="text-green-300 font-semibold">2 hours</span> to{' '}
            <span className="text-white font-medium">Alice</span> for tutoring
          </li>
          <li>
            <span className="text-purple-400">✅</span> You received{' '}
            <span className="text-purple-300 font-semibold">1 hour</span> from{' '}
            <span className="text-white font-medium">Bob</span> for gardening help
          </li>
        </ul>
      </div>
    </div>
  );
}
