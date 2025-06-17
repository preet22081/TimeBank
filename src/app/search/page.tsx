'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

type Service = {
  id: number;
  name: string;
  skill: string;
  rating: number;
};

export default function SearchPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Service[]>([]);
  const router = useRouter();

  const dummyServices: Service[] = [
    { id: 1, name: 'John Doe', skill: 'Dog Walking', rating: 4.5 },
    { id: 2, name: 'Jane Smith', skill: 'Tutoring', rating: 4.8 },
    { id: 3, name: 'Bob Johnson', skill: 'Gardening', rating: 4.2 },
  ];

  useEffect(() => {
    const token = localStorage.getItem('timebank_token');
    if (!token) {
      router.push('/login');
    } else {
      setLoggedIn(true);
      setResults(dummyServices);
    }
  }, []);

  const handleSearch = () => {
    const filtered = dummyServices.filter((s) =>
      `${s.name} ${s.skill}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  };

  if (!loggedIn) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#334155] p-6">
      <h1 className="text-3xl font-extrabold text-[#1E293B] text-center mb-6">
        Search for Services
      </h1>

      <div className="flex justify-center mb-6 space-x-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or skill"
          className="border p-3 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-[#3EB489] placeholder-gray-600"
        />
        <button
          onClick={handleSearch}
          className="bg-[#3EB489] px-4 py-2 rounded hover:bg-[#32a17b] text-white"
        >
          Search
        </button>
        <button
          onClick={() => {
            setSearchTerm('');
            setResults(dummyServices);
          }}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-black"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.map((s) => (
          <div key={s.id} className="p-5 bg-white rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-bold text-[#1E293B]">{s.name}</h2>
            <p>{s.skill}</p>
            <p className="text-yellow-600">⭐ {s.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
