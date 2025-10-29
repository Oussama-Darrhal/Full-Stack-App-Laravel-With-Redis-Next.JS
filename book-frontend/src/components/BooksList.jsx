'use client';

import { useState } from 'react';
import Link from 'next/link';
import { deleteBook } from '@/lib/api';

export default function BooksList({ initialBooks }) {
    const [books, setBooks] = useState(initialBooks || []);
    const [error, setError] = useState(null);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this book?')) {
            return;
        }

        setError(null);
        try {
            await deleteBook(id);
            setBooks(books.filter((book) => book.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            {error && (
                <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6 text-center">
                    {error}
                </p>
            )}
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                            >
                                Title
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                            >
                                Author
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                            >
                                Rating
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {books.map((book) => (
                            <tr key={book.id} className="even:bg-gray-50 hover:bg-gray-100 transition">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-700">{book.author}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                        {book.rating} / 10
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                    <Link
                                        href={`/book/${book.id}`}
                                        className="text-indigo-600 hover:text-indigo-800 transition"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={`/book/${book.id}/edit`}
                                        className="text-emerald-600 hover:text-emerald-800 transition"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(book.id)}
                                        className="text-red-600 hover:text-red-800 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}