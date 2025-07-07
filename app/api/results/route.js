import { dbConnect } from "@/lib/dbConnect";
import AnalysisResult from "@/models/AnalysisResult";

export async function DELETE() {
  await dbConnect();

  try {
    await AnalysisResult.deleteMany({});
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Error clearing results:", err);
    return new Response(JSON.stringify({ error: "Failed to delete results." }), { status: 500 });
  }
}
