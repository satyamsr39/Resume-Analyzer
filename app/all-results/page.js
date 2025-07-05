import Link from "next/link";
import {dbConnect} from "@/lib/dbConnect";
import AnalysisResult from "@/models/AnalysisResult";

export const dynamic = "force-dynamic"; // ensures always fresh results

export default async function AllResultsPage() {
  await dbConnect();

  const results = await AnalysisResult.find({}, "_id name email skills_found missing_keywords createdAt")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="max-w-5xl mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">📋 All Resume Analysis Results</h1>

      {results.length === 0 ? (
        <p className="text-center text-gray-500">No analyses available yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((res) => {
            const total = res.skills_found.length + res.missing_keywords.length;
            const matchPercent = total
              ? Math.round((res.skills_found.length / total) * 100)
              : 0;

            return (
              <Link
                key={res._id}
                href={`/result/${res._id}`}
                className="block border border-gray-300 p-4 rounded shadow hover:shadow-md transition"
              >
                <h2 className="font-semibold text-lg">{res.name || "Unnamed Candidate"}</h2>
                <p className="text-gray-600 text-sm">{res.email || "No email provided"}</p>
                <p className="mt-2 text-blue-700 font-medium">
                  Match Score: <span className="font-bold">{matchPercent}%</span>
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
