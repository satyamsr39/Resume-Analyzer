import pdf from "pdf-parse/lib/pdf-parse.js";

/**
 * @param {Buffer} buffer 
 * @returns {Promise<string>} 
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
