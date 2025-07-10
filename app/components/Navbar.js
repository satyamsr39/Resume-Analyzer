"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/upload", label: "Upload Resume" },
    { href: "/all-results", label: "Analyzed Resumes" },
    { href: "/AboutUs", label: "About Us" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-extrabold text-blue-700 hover:text-blue-800 transition-colors duration-200"
        >
          Intelli<span className="text-gray-800">Hire</span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-gray-600 focus:outline-none"
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 text-gray-700 font-medium">
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-md text-gray-700 transition ${
                pathname === item.href
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
