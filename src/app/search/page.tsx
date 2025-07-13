'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';

export default function SearchPage() {
  const [skill, setSkill] = useState('');
  const [date, setDate] = useState('');
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ fetch all offers + requests (no filters)
  const fetchAll = async () => {
    setLoading(true);
    try {
      const offerRes = await fetch('/api/service-offers');
      const requestRes = await fetch('/api/service-requests');

      if (!offerRes.ok || !requestRes.ok) {
        throw new Error('Failed to load data');
      }

      const offerData = await offerRes.json();
      const requestData = await requestRes.json();

      setOffers(offerData);
      setRequests(requestData);
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Something went wrong while loading offers and requests.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ fetch with search filters
  const handleSearch = async () => {
    setLoading(true);
    try {
      const offerRes = await fetch(`/api/service-offers?skill=${skill}&date=${date}`);
      const requestRes = await fetch(`/api/service-requests?skill=${skill}&date=${date}`);

      if (!offerRes.ok || !requestRes.ok) {
        throw new Error('Search request failed');
      }

      const offerData = await offerRes.json();
      const requestData = await requestRes.json();

      setOffers(offerData);
      setRequests(requestData);
    } catch (err) {
      console.error('Search error:', err);
      alert('Search failed.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ load on page mount
  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-24 px-4">
      <h1 className="text-3xl font-bold mb-6">Search Offers & Requests</h1>

      {/* Search Bar */}
      <div className="bg-white shadow p-6 rounded-lg mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Skill (e.g. Tutoring)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-4 py-2 rounded w-full md:max-w-[200px]"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Skill Offers Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-3 text-blue-600">Skill Offers</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {offers.map((offer: any) => (
            <Card
              key={offer._id}
              id={offer._id}
              title={offer.title}
              description={offer.description}
              tags={[
                offer.category,
                offer.availableDate ?? 'No Date',
                `${offer.timeRequired}h`
              ]}
              userId={offer.userId}
              type="offer"
            />
          ))}
          {!loading && offers.length === 0 && <p className="text-gray-500">No offers found.</p>}
        </div>
      </div>

      {/* Service Requests Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-3 text-green-600">Service Requests</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {requests.map((req: any) => (
            <Card
              key={req._id}
              id={req._id}
              title={req.title}
              description={req.description}
              tags={[req.category, req.preferredDate]}
              userId={req.user}
              type="request"
            />
          ))}
          {!loading && requests.length === 0 && <p className="text-gray-500">No requests found.</p>}
        </div>
      </div>
    </div>
  );
}
