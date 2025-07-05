// app/api/analyze/route.js
import { NextResponse } from "next/server";
import { extractTextFromFile } from "@/lib/parseResume";
import formidable from "formidable";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const form = formidable({ multiples: false });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const file = files.resume?.[0];

    if (!file || !file.filepath.endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Please upload a valid PDF resume." },
        { status: 400 }
      );
    }

    const resumeText = await extractTextFromFile(file.filepath);
    console.log(resumeText)

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
You are a resume analysis assistant. Analyze the following resume and return:

- Matched Roles
- Skills Found
- Missing Keywords
- Summary
- Recommendations

Resume:
${resumeText}

Respond ONLY in this strict JSON format:
{
  "matched_roles": [ ... ],
  "skills_found": [ ... ],
  "missing_keywords": [ ... ],
  "summary": "...",
  "recommendations": "..."
}
`;

    const result = await model.generateContent(prompt);
    const text =  result.response.text();

    const json = JSON.parse(text); // might need to sanitize if Gemini adds extra text
    return NextResponse.json(json);
  } catch (error) {
    console.error("Error in /api/analyze:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume", detail: error.message },
      { status: 500 }
    );
  }
}
