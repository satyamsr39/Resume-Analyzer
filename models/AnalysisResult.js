// models/AnalysisResult.js
import mongoose from "mongoose";

const AnalysisResultSchema = new mongoose.Schema({
    name:String,
    email:String,
  matched_roles: [String],
  skills_found: [String],
  missing_keywords: [String],
  summary: String,
  recommendations: String,
}, {
  timestamps: true,
});

export default mongoose.models.AnalysisResult || mongoose.model("AnalysisResult", AnalysisResultSchema);
