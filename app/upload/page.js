"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (files.length === 0) return alert("Please select at least one resume file");
    if (!jobDescription.trim()) return alert("Please enter the job description");

    setLoading(true);
    const allResults = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("job_description", jobDescription);

      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (res.ok) {
          allResults.push({
            fileName: file.name,
            matchPercent: data.matchPercent,
            id: data.id,
          });
        } else {
          allResults.push({
            fileName: file.name,
            error: data.error || "Failed to analyze",
          });
        }
      } catch (err) {
        allResults.push({
          fileName: file.name,
          error: "Network error",
        });
      }
    }

    setResults(allResults);
    setLoading(false);
  };

  return (
    <div className="mt-10 max-w-3xl mx-auto space-y-6 px-4">
      <h2 className="text-2xl font-semibold">Upload Resumes</h2>

      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFiles(Array.from(e.target.files))}
          className="block w-full border border-gray-300 p-2 rounded"
        />

        <textarea
          rows="6"
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="block w-full border border-gray-300 p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Resumes"}
        </button>
      </form>

      {results.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {results.map((res, idx) => (
            <div
              key={idx}
              className="border p-4 rounded shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg mb-2">{res.fileName}</h3>
              {res.error ? (
                <p className="text-red-600">{res.error}</p>
              ) : (
                <>
                  <p className="text-green-700 font-medium">
                    Match Score: {res.matchPercent}%
                  </p>
                  <a
                    href={`/result/${res.id}`}
                    className="text-blue-600 underline text-sm mt-1 inline-block"
                  >
                    View Detailed Report
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Why IntelliHire Section */}
      <div className="mt-16 bg-gray-50 border border-gray-200 p-6 rounded">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          Why Use IntelliHire?
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-sm">
          <div>
            <h3 className="font-semibold mb-2 text-gray-900">For Recruiters</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Analyze multiple resumes in one go.</li>
              <li>Instantly see how well candidates align with your job requirements.</li>
              <li>Eliminate manual screening and reduce hiring time.</li>
              <li>Easily identify top profiles with skill-match scores.</li>
              <li>Structured, clear reports make evaluation easier.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-gray-900">For Candidates</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Get immediate feedback on how well your resume fits the role.</li>
              <li>Identify missing keywords and skills to improve your profile.</li>
              <li>Boost your chances by optimizing based on AI suggestions.</li>
              <li>Make your applications more targeted and effective.</li>
              <li>Stand out in competitive hiring pipelines.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
