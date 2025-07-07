import { dbConnect } from "@/lib/dbConnect";
import AnalysisResult from "@/models/AnalysisResult";
import ResultsGrid from "../components/ResultsGrid";
import ClearAllButton from "../components/ClearAllButton";

export const dynamic = "force-dynamic";

export default async function AllResultsPage() {
  await dbConnect();

  let results = await AnalysisResult.find({}, "_id name email skills_found missing_keywords createdAt")
    .sort({ createdAt: -1 })
    .lean();

  // ✅ Convert _id and createdAt to strings
  results = results.map((res) => ({
    ...res,
    _id: res._id.toString(),
    createdAt: res.createdAt?.toISOString(),
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">📋 All Resume Analysis Results</h1>

      {results.length > 0 && <ClearAllButton />}

      {results.length === 0 ? (
        <p className="text-center text-gray-500">No analyses available yet.</p>
      ) : (
        <ResultsGrid results={results} />
      )}
    </div>
  );
}
