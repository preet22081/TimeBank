'use client';

import { motion } from "framer-motion";

interface CardProps {
  title: string;
  description: string;
  tags?: string[];
}

export default function Card({ title, description, tags }: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="p-5 border rounded-xl shadow-md bg-white hover:shadow-xl transition"
    >
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      {tags && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 flex flex-wrap gap-2"
        >
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
