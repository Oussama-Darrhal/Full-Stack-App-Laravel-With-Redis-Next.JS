// src/app/book/[id]/edit/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Import useParams
import { getBookById, updateBook } from '@/lib/api';
import BookForm from '@/components/BookForm';
import Link from 'next/link';

export default function EditBookPage() {
    const router = useRouter();
    const { id } = useParams(); // Use the hook to get the ID

    const [book, setBook] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const handleSubmit = async (formData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await updateBook(id, formData);
            router.push('/');
            router.refresh();
        } catch (err) {
            setError(err.message);
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <main className="max-w-6xl mx-auto p-4 md:p-8">
                <p className="text-center text-gray-600">Loading book data...</p>
            </main>
        );
    }

    return (
        <main className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Edit Book</h1>
                <Link
                    href={id ? `/book/${id}` : '/'} // Handle case where id might be loading
                    className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
                >
                    &larr; Back to view
                </Link>
            </div>

            {error && (
                <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6 text-center">
                    {error}
                </p>
            )}

            {book ? (
                <BookForm
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    initialData={book}
                />
            ) : (
                <p className="text-center text-gray-600">Book data could not be loaded.</p>
            )}
        </main>
    );
}