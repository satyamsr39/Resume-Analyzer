// components/AnalysisReport.js
export default function AnalysisReport({ result }) {
  const { matched_roles, skills_found, missing_keywords, summary, recommendations } = result;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold text-blue-600">✅ Matched Roles</h2>
        <ul className="list-disc ml-6 mt-2 text-gray-700">
          {matched_roles.map((role, i) => <li key={i}>{role}</li>)}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-green-600">🛠 Skills Found</h2>
        <ul className="flex flex-wrap gap-2 mt-2">
          {skills_found.map((skill, i) => (
            <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-yellow-600">⚠️ Missing Keywords</h2>
        <ul className="flex flex-wrap gap-2 mt-2">
          {missing_keywords.map((kw, i) => (
            <span key={i} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
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
