'use client';

import { useState } from "react";

export default function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!onClick) return;
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition duration-300 transform hover:scale-105 hover:bg-blue-700 focus:outline-none shadow ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      disabled={loading}
    >
      {loading ? "Processing..." : children}
    </button>
  );
}
