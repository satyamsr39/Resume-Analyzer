// app/page.js
import Link from "next/link";

export default function Home() {
  return (
    <section className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">IntelliHire — AI Resume Analyzer</h1>
      <p className="text-lg mb-8 text-gray-600">
        Upload your resume and get job-matching insights using AI.
      </p>
      <Link
        href="/upload"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Upload Resume
      </Link>
    </section>
  );
}
