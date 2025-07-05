import { NextResponse } from "next/server";
import { extractTextFromFile } from "@/lib/parseResume";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { GoogleGenAI } from "@google/genai";

import { dbConnect } from "@/lib/dbConnect";
import AnalysisResult from "@/models/AnalysisResult";
console.log(process.env.MONGODB_URI)

export async function POST(req) {
  await dbConnect();
  try {
    const formData = await req.formData();
    const file = formData.get("resume");
    const jobDescription = formData.get("job_description");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!jobDescription || typeof jobDescription !== "string") {
      return NextResponse.json({ error: "Job description is missing" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, file.name);
    await fs.writeFile(filePath, buffer);

    const resumeText = await extractTextFromFile(filePath);

    // const ai = new GoogleGenerativeAI({
    //   apiKey: process.env.GEMINI_API_KEY,
    // });

    const ai = new GoogleGenAI({ apiKey:process.env.GEMINI_API_KEY})

   const prompt = `
You are an AI specialized in resume-job matching. Analyze the following resume and compare it with the given job description.

Do not just match keywords—understand the resume contextually, identify relevant experience, skills, and alignment with the job role.

Return ONLY valid JSON — no markdown, no triple backticks, no extra text.

Keep the summary and recommendations concise, clear, and specific.

Job Description:
${jobDescription}

Resume:
${resumeText}

Expected Output Format:
{
  "name": "...",
  "email": "...",
  "matched_roles": [...],
  "skills_found": [...],
  "missing_keywords": [...],
  "summary": "...",
  "recommendations": "..."
}
`;


    // const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    // const result = await model.generateContent(prompt);

     const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
    let text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    // console.log(text)
    // const text=response.text

    text = text.trim()
  .replace(/^```(?:json)?\n?/i, '')  // remove starting ```
  .replace(/\n?```$/i, ''); 

    if (!text) {
      throw new Error("AI returned no content");
    }

//     const parsed = JSON.parse(text);
//  const newResult = await AnalysisResult.create(parsed);
//     // return NextResponse.json(text);
//     return NextResponse.json({ id: newResult._id });

const parsed = JSON.parse(text);

const total = parsed.skills_found.length + parsed.missing_keywords.length;
const matchPercent = total ? Math.round((parsed.skills_found.length / total) * 100) : 0;

const newResult = await AnalysisResult.create(parsed);

return NextResponse.json({ id: newResult._id, matchPercent });

  } catch (err) {
    console.error("❌ Error in /api/analyze:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}


