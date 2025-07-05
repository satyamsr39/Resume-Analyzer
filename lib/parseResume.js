// lib/parseResume.js
import pdfParse from "pdf-parse";

/**
 * Extracts plain text from a PDF buffer (no disk access).
 * @param {Buffer} buffer - Buffer containing the PDF file content.
 * @returns {Promise<string>} - Extracted resume text.
 */
export async function extractTextFromFileBuffer(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (err) {
    console.error("❌ Failed to extract text from PDF buffer:", err);
    throw err;
  }
}
