'use client'
import React, { useState } from 'react'

export default function DeleteBookButton({ bookId }) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        if (!confirm("⚠️ Are you sure you want to delete this book? This action cannot be undone.")) return;

        setLoading(true);

        try {
            const res = await fetch(`/book/${bookId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                alert("✅ Book deleted successfully");
                location.reload();
            } else {
                alert("❌ Failed to delete the book");
            }
        } catch (err) {
            console.error(err);
            alert("❌ Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className={`
        ml-auto flex items-center justify-center gap-2
        px-3 py-1 rounded-md font-medium text-sm
        transition-colors duration-200
        ${loading ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}
        text-white shadow-sm hover:shadow-md
    `}
        >
            {loading ? 'Deleting...' : 'Delete'}
        </button>
    )
}
