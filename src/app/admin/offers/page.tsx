'use client';

import { useEffect, useState } from 'react';

export default function AdminOffersPage() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch('/api/service-offers')
      .then(res => res.json())
      .then(data => setOffers(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Service Offers</h1>
      <ul className="space-y-2">
        {offers.map((offer: any) => (
          <li key={offer._id} className="border p-4 rounded bg-white text-black">
            <strong>{offer.title}</strong> - {offer.category} - Posted by {offer.user?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
