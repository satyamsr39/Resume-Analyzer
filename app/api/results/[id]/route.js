import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import AnalysisResult from "@/models/AnalysisResult";
import mongoose from "mongoose";

// GET /api/results/[id] - Fetch a specific result
export async function GET(req, { params }) {
  await dbConnect();

  const { id } =await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const result = await AnalysisResult.findById(id).lean();

    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...result,
      _id: result._id.toString(),
      createdAt: result.createdAt?.toISOString(),
    });
  } catch (err) {
    console.error("❌ GET /api/results/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/results/[id] - Delete a specific result
export async function DELETE(req, { params }) {
  await dbConnect();

  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  try {
    const deleted = await AnalysisResult.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully", id });
  } catch (err) {
    console.error("❌ DELETE /api/results/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
