// app/result/[id]/page.js
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    try {
      const data = JSON.parse(searchParams.get("data"));
      setResult(data);
    } catch (err) {
      console.error("Invalid result data", err);
    }
  }, [searchParams]);

  if (!result) {
    return <p className="mt-10 text-gray-600">Loading analysis...</p>;
  }

  const { matched_roles, skills_found, missing_keywords, summary, recommendations } = result;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold">📊 Resume Analysis Report</h1>

      <section>
        <h2 className="text-xl font-semibold text-blue-600">✅ Matched Roles</h2>
        <ul className="list-disc ml-6 mt-2 text-gray-700">
          {matched_roles.map((role, i) => (
            <li key={i}>{role}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-green-600">🛠 Skills Found</h2>
        <ul className="flex flex-wrap gap-2 mt-2">
          {skills_found.map((skill, i) => (
            <span
              key={i}
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-yellow-600">⚠️ Missing Keywords</h2>
        <ul className="flex flex-wrap gap-2 mt-2">
          {missing_keywords.map((kw, i) => (
            <span
              key={i}
              className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
            >
              {kw}
            </span>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-purple-600">📄 Summary</h2>
        <p className="mt-2 text-gray-800">{summary}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-red-600">💡 Recommendations</h2>
        <p className="mt-2 text-gray-800">{recommendations}</p>
      </section>
    </div>
  );
}
