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
      <div className="text-center mt-20 text-gray-600">
        Book not found 😕
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto bg-white p-8 mt-10 rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">{book.title}</h1>
      <p className="text-gray-600 mb-2 italic">by {book.author}</p>
      <p className="text-yellow-500 mb-3 font-medium">⭐ {book.rating}/10</p>
      <p className="text-gray-700 mb-6 leading-relaxed">{book.blurb}</p>

      <div className="flex gap-3">
        <Link
          href={`/book/${params.id}/edit`}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
        >
          Edit
        </Link>
        <form action={`/book/${params.id}/delete`} method="POST">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          >
            Delete
          </button>
        </form>
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-800 py-2 px-4 rounded-md border"
        >
          Back
        </Link>
      </div>
    </main>
  );
}
