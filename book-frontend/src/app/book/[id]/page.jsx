// src/app/book/[id]/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getBookById } from '@/lib/api';
import Link from 'next/link';

export default function BookDetailPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchBook = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const data = await getBookById(id);
                    setBook(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchBook();
        }
    }, [id]);

    if (isLoading) {
        return (
            <main className="max-w-6xl mx-auto p-4 md:p-8">
                <p className="text-center text-gray-600">Loading book details...</p>
            </main>
        );
    }

    if (error || !book) {
        return (
            <main className="max-w-6xl mx-auto p-4 md:p-8">
                <h1 className="text-4xl font-bold text-red-600">Book Not Found</h1>
                <p className="text-gray-700 mt-4">
                    Sorry, we couldnt find a book with ID {id}.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-block text-indigo-600 font-semibold hover:text-indigo-800 transition"
                >
                    &larr; Back to library
                </Link>
            </main>
        );
    }

    return (
        <main className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 truncate">
                    {book.title}
                </h1>
                <Link
                    href="/"
                    className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
                >
                    &larr; Back to library
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">{book.author}</h2>
                        <span className="mt-2 px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                            Rating: {book.rating} / 10
                        </span>
                    </div>
                    <Link
                        href={`/book/${id}/edit`}
                        className="bg-emerald-600 text-white py-2 px-5 rounded-lg font-semibold shadow-md hover:bg-emerald-700 transition duration-300"
                    >
                        Edit this book
                    </Link>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900">Blurb</h3>
                    <p className="mt-2 text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {book.blurb}
                    </p>
                </div>
            </div>
        </main>
    );
}