// lib/parseResume.js
import pdf from "pdf-parse/lib/pdf-parse.js";

/**
 * Extracts plain text from a PDF buffer (no disk access).
 * @param {Buffer} buffer - Buffer containing the PDF file content.
 * @returns {Promise<string>} - Extracted resume text.
 */
export async function extractTextFromFileBuffer(buffer) {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (err) {
    console.error("❌ Failed to extract text from PDF buffer:", err);
    throw err;
  }
}
