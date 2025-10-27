import { getRedisClient } from "@/lib/redis";
import Link from "next/link";

async function getBook(id) {
  const client = await getRedisClient();
  const book = await client.hGetAll(`book:${id}`);
  return book;
}

export default async function BookPage({ params }) {
  const book = await getBook(params.id);

  if (!book || !book.title) {
    return (
      <div className="text-center mt-20 text-gray-600 text-lg">
        Book not found 😕
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto bg-white p-8 mt-10 rounded-xl shadow-md">
      <h1 className="text-4xl font-bold mb-2 text-gray-800">{book.title}</h1>
      <p className="text-gray-600 mb-2 italic text-lg">by {book.author}</p>
      <p className="text-yellow-500 mb-4 font-semibold text-lg">⭐ {book.rating}/10</p>
      <p className="text-gray-700 mb-6 leading-relaxed text-md">{book.blurb}</p>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/book/${params.id}/edit`}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-5 rounded-md shadow-md transition"
        >
          Edit
        </Link>

        {/* Delete button with modern style */}
        <form action={`/book/${params.id}/delete`} method="POST">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-md shadow-md transition"
          >
            Delete
          </button>
        </form>

        <Link
          href="/"
          className="text-gray-600 hover:text-gray-800 py-2 px-5 rounded-md border border-gray-300 transition"
        >
          Back
        </Link>
      </div>
    </main>
  );
}
