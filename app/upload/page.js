// app/upload/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const router=useRouter();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select a resume file");

    const formData = new FormData();
    formData.append("resume", file);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Analysis Result:", data);
    const encoded = encodeURIComponent(JSON.stringify(data));
router.push(`/result/${Date.now()}?data=${encoded}`);
    // You can redirect or display result here
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Upload Your Resume</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Analyze Resume
        </button>
      </form>
    </div>
  );
}
