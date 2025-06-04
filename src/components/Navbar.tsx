import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-4">
      <Link href="/" className="font-semibold hover:underline">Home</Link>
      <Link href="/dashboard" className="hover:underline">Dashboard</Link>
      <Link href="/search" className="hover:underline">Search</Link>
      <Link href="/admin" className="hover:underline">Admin</Link>
    </nav>
  );
}
