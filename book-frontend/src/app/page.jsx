import { getAllBooks } from '@/lib/api';
import BooksList from '@/components/BooksList';
import Link from 'next/link';

export default async function HomePage() {
  const books = await getAllBooks();

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Book Library</h1>
        <Link
          href="/book/new"
          className="bg-indigo-600 text-white py-2 px-5 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition duration-300"
        >
          + Add New Book
        </Link>
      </div>

      <BooksList initialBooks={books} />
    </main>
  );
}