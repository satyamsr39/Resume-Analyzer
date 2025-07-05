// components/Navbar.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/upload", label: "Upload Resume" },
    { href: "/all-results", label: "Analyzed Resumes" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold text-blue-700 hover:text-blue-800 transition-colors duration-200">
          Intelli<span className="text-gray-800">Hire</span>
        </Link>

        <div className="space-x-4 text-gray-700 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-md transition-all duration-200 ${
                pathname === item.href
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
