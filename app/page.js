import Link from "next/link";

export default function Home() {
  return (
    <section className="text-center mt-20 px-4">
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

      {/* ✅ About Section */}
      <div className="mt-12 bg-gray-100 p-6 rounded-lg shadow-sm max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-2 text-blue-700">
          🤝 Why Use IntelliHire?
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold text-green-700 mb-2">📌 For Recruiters</h3>
            <ul className="list-disc ml-5 space-y-1 text-left">
              <li>Quickly screen multiple resumes with skill-match scores.</li>
              <li>Save time by instantly identifying top candidates.</li>
              <li>Get structured insights without manual reading.</li>
              <li>Visually compare match percentages to shortlist faster.</li>
              <li>Spot the right fit instantly—no more endless scrolling.</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold text-purple-700 mb-2">🧑‍💼 For Candidates</h3>
            <ul className="list-disc ml-5 space-y-1 text-left">
              <li>Understand how well your resume fits a role.</li>
              <li>Get AI-powered suggestions to improve your resume.</li>
              <li>Stand out with targeted skills and keywords.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
