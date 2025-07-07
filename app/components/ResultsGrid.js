"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResultsGrid({ results }) {
  const [deletingId, setDeletingId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const router = useRouter();

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this analysis?");
    if (!confirmed) return;

    try {
      setDeletingId(id);
      const res = await fetch(`/api/results/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        window.location.reload();
      } else {
        alert("Failed to delete result.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting result.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleCardClick = (id) => {
    setLoadingId(id);
    router.push(`/result/${id}`);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((res) => {
        const total = res.skills_found.length + res.missing_keywords.length;
        const matchPercent = total ? Math.round((res.skills_found.length / total) * 100) : 0;
        const isLoading = loadingId === res._id;

        return (
          <div
            key={res._id}
            onClick={() => handleCardClick(res._id)}
            className={`relative block border border-gray-300 p-4 rounded shadow hover:shadow-md transition cursor-pointer ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <h2 className="font-semibold text-lg">{res.name || "Unnamed Candidate"}</h2>
            <p className="text-gray-600 text-sm">{res.email || "No email provided"}</p>
            <p className="mt-2 text-blue-700 font-medium">
              Match Score: <span className="font-bold">{matchPercent}%</span>
            </p>

            {/* Individual Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering card click
                handleDelete(res._id);
              }}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm"
              disabled={deletingId === res._id}
            >
              {deletingId === res._id ? "Deleting..." : "🗑 Delete"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
