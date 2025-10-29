
'use client';
import { useState } from 'react';

export default function BookForm({ onSubmit, initialData = {}, isSubmitting = false }) {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        author: initialData.author || '',
        rating: initialData.rating || '',
        blurb: initialData.blurb || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-800 mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900"
                    />
                </div>
                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-800 mb-1">
                        Author
                    </label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-800 mb-1">
                    Rating (1-10)
                </label>
                <input
                    type="number"
                    name="rating"
                    id="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                    min="1"
                    max="10"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900"
                />
            </div>

            <div>
                <label htmlFor="blurb" className="block text-sm font-medium text-gray-800 mb-1">
                    Blurb
                </label>
                <textarea
                    name="blurb"
                    id="blurb"
                    value={formData.blurb}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Saving...' : 'Save Book'}
            </button>
        </form>
    );
}