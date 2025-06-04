import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-50 text-center px-4">
        <h1 className="text-4xl font-extrabold text-emerald-700 mt-12">
          Welcome to TimeBank
        </h1>
        <p className="mt-3 text-emerald-900 max-w-md">
          Exchange time, share skills, and build community connections.
        </p>

        {/* Hero Image */}
        <div className="mt-8">
          <Image
            src="/hero.png"
            alt="Community helping each other"
            width={300}
            height={300}
            className="rounded shadow-lg"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/login"
            className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-white border border-emerald-600 text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-emerald-100 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
}
