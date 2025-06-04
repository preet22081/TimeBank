export default function SearchPage() {
  const dummyServices = [
    { id: 1, name: "John Doe", skill: "Dog Walking", rating: 4.5 },
    { id: 2, name: "Jane Smith", skill: "Tutoring", rating: 4.8 },
    { id: 3, name: "Bob Johnson", skill: "Gardening", rating: 4.2 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search for Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dummyServices.map((service) => (
          <div
            key={service.id}
            className="p-4 border rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{service.name}</h2>
            <p className="text-gray-600">{service.skill}</p>
            <p className="text-yellow-500">Rating: {service.rating}</p>
            <button className="mt-2 bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
              Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
