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
                <p className="text-red-600">❌ {res.error}</p>
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
    </div>
  );
}
