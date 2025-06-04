interface CardProps {
  title: string;
  description: string;
  tags?: string[];
}

export default function Card({ title, description, tags }: CardProps) {
  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">{description}</p>
      {tags && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
