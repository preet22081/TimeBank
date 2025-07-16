'use client';

import { useEffect, useState } from 'react';

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('/api/service-requests')
      .then(res => res.json())
      .then(data => setRequests(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Service Requests</h1>
      <ul className="space-y-2">
        {requests.map((req: any) => (
          <li key={req._id} className="border p-4 rounded bg-white text-black">
            <strong>{req.title}</strong> - {req.category} - Requested by {req.user?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
