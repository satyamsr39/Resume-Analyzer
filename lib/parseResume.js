import fs from "fs/promises";
import pdfParse from "pdf-parse";
import path from "path";
import { statSync } from "fs";

/**
 * Extracts plain text from a PDF file.
 * @param {string} filePath - Absolute path to the uploaded resume file.
 * @returns {Promise<string>} - Extracted resume text.
 */
export async function extractTextFromFile(filePath) {
  try {
    // Ensure the path exists and is a file
    if (statSync(filePath).isDirectory()) {
      throw new Error("Path is a directory, not a file: " + filePath);
    }

    const ext = path.extname(filePath).toLowerCase();

    if (ext !== ".pdf") {
      throw new Error("Unsupported file type: " + ext);
    }

    const buffer = await fs.readFile(filePath);
    const data = await pdfParse(buffer);

    return data.text;
  } catch (err) {
    console.error("❌ Failed to extract text from resume:", err);
    throw err;
  }
}
