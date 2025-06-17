'use client';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#334155] p-6">
      <h1 className="text-3xl font-extrabold text-[#1E293B] text-center mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold">Total Hours</h2>
          <p className="text-2xl font-bold text-green-600">120 hrs</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold">Hours Given</h2>
          <p className="text-2xl font-bold text-blue-600">80 hrs</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold">Hours Received</h2>
          <p className="text-2xl font-bold text-purple-600">40 hrs</p>
        </div>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          <li>✅ You gave 2 hours to Alice for tutoring</li>
          <li>✅ You received 1 hour from Bob for gardening help</li>
        </ul>
      </div>
    </div>
  );
}
