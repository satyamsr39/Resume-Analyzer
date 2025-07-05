import React from "react";
import { dbConnect } from "@/lib/dbConnect";
import AnalysisResult from "@/models/AnalysisResult";
import mongoose from "mongoose";





export default async function ResultPage({ params }) {
  const { id } = await params;

  await dbConnect(); // connect to MongoDB

  let result = null;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format.");
    }

    result = await AnalysisResult.findById(id).lean();

    if (!result) {
      return (
        <div className="text-center mt-20 text-red-600">
          ❌ Analysis not found for this ID.
        </div>
      );
    }
  } catch (error) {
    return (
      <div className="text-center mt-20 text-red-600">
        ❌ Failed to load analysis: {error.message}
      </div>
    );
  }

  const {
    name="",
    email="",
    matched_roles = [],
    skills_found = [],
    missing_keywords = [],
    summary,
    recommendations,
  } = result;

  const total = skills_found.length + missing_keywords.length;
  const matchPercent = total
    ? Math.round((skills_found.length / total) * 100)
    : 0;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6 px-4">
      <h1 className="text-3xl font-bold text-center">📊 Resume Analysis Report</h1>

     <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
  <div
    className="bg-blue-600 h-4 rounded-full transition-all duration-300"
    style={{ width: `${matchPercent}%` }}
  />
</div>
<p className="text-center text-sm mt-1 text-gray-600">
  Match Score: <span className="font-bold text-blue-800">{matchPercent}%</span>
</p>


      <section>
        <h2 className="text-xl font-semibold text-blue-600">✅ Matched Roles</h2>
        {matched_roles.length ? (
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            {matched_roles.map((role, i) => (
              <li key={i}>{role}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No matched roles found.</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-green-600">🛠 Skills Found</h2>
        {skills_found.length ? (
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
        ) : (
          <p className="text-gray-500 mt-2">No skills found.</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-yellow-600">⚠️ Missing Keywords</h2>
        {missing_keywords.length ? (
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
        ) : (
          <p className="text-gray-500 mt-2">No missing keywords identified.</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-purple-600">📄 Summary</h2>
        <p className="mt-2 text-gray-800 whitespace-pre-line">
          {summary || "No summary provided."}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-red-600">💡 Recommendations</h2>
        <p className="mt-2 text-gray-800 whitespace-pre-line">
          {recommendations || "No recommendations available."}
        </p>
      </section>
    </div>
  );
}
