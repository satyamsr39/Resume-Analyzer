"use client";

export default function ClearAllButton() {
  const handleClick = async () => {
    const confirmed = confirm("Are you sure you want to delete all results?");
    if (!confirmed) return;

    try {
      const res = await fetch("/api/results", {
        method: "DELETE",
      });

      if (res.ok) {
        window.location.reload(); // Refresh the page after deletion
      } else {
        alert("Failed to delete all results.");
      }
    } catch (error) {
      console.error("Error deleting results:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="text-right mb-4">
      <button
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        onClick={handleClick}
      >
        Clear All
      </button>
    </div>
  );
}
