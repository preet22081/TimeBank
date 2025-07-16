'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';

export default function SearchPage() {
  const [skill, setSkill] = useState('');
  const [date, setDate] = useState('');
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const offerRes = await fetch('/api/service-offers');
      const requestRes = await fetch('/api/service-requests');

      if (!offerRes.ok || !requestRes.ok) throw new Error('Failed to load data');

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

  const handleSearch = async () => {
    setLoading(true);
    try {
      const offerRes = await fetch(`/api/service-offers?skill=${skill}&date=${date}`);
      const requestRes = await fetch(`/api/service-requests?skill=${skill}&date=${date}`);

      if (!offerRes.ok || !requestRes.ok) throw new Error('Search request failed');

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

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 mt-28 text-white">
      <h1 className="text-3xl font-extrabold mb-8">🔍 Search Offers & Requests</h1>

      {/* Search Bar */}
      <div className="bg-[#1e293b] shadow-lg p-6 rounded-lg mb-10 flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Skill (e.g. Tutoring)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded w-full md:max-w-[300px] placeholder:text-gray-400 placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded w-full md:w-[200px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 invert-calendar"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Skill Offers */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">📘 Skill Offers</h2>
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
          {!loading && offers.length === 0 && <p className="text-gray-400">No offers found.</p>}
        </div>
      </div>

      {/* Service Requests */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">🟢 Service Requests</h2>
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
          {!loading && requests.length === 0 && <p className="text-gray-400">No requests found.</p>}
        </div>
      </div>
    </div>
  );
}
