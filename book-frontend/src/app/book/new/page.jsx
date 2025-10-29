'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBook } from '@/lib/api';
import BookForm from '@/components/BookForm';
import Link from 'next/link';

export default function NewBookPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (formData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await createBook(formData);
            router.push('/');
            router.refresh();
        } catch (err) {
            setError(err.message);
            setIsSubmitting(false);
        }
    };

    return (
        <main className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900">Add a New Book</h1>
                <Link
                    href="/"
                    className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
                >
                    &larr; Back to library
                </Link>
            </div>

            {error && (
                <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6 text-center">
                    {error}
                </p>
            )}

            <BookForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </main>
    );
}