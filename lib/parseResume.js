import fs from "fs/promises";
import pdfParse from "pdf-parse";
import path from "path";

export async function extractTextFromFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".pdf") {
    const buffer = await fs.readFile(filePath);
    const data = await pdfParse(buffer);
    return data.text;
  }

  throw new Error("Unsupported file type");
}
