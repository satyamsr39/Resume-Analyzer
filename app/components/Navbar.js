// components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          IntelliHire
        </Link>
        <div className="space-x-6 text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/upload">Upload Resume</Link>
        </div>
      </div>
    </nav>
  );
}
