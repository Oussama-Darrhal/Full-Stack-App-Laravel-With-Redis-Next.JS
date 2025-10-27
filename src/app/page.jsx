import Link from "next/link";
import { getRedisClient } from "@/lib/redis";
import DeleteBookButton from "./actions/DeleteBookButton";

// Fetch books from Redis
async function getBooks() {
  const client = await getRedisClient();
  const ids = await client.sMembers("books");

  const books = [];
  for (const id of ids) {
    const book = await client.hGetAll(`book:${id}`);
    books.push({ id, ...book });
  }

  return books;
}

export default async function Home() {
  const books = await getBooks();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white shadow px-6 py-4 rounded-lg mb-10">
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
          📚 <span>Books on Redis</span>
        </h1>

        <Link
          href="/book/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200"
        >
          + Add New Book
        </Link>
      </nav>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-6">
        <input
          type="text"
          placeholder="🔍 Search books by title..."
          className="w-full p-3 rounded-md border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {/* Books List */}
      <section className="max-w-5xl mx-auto">
        {books.length === 0 ? (
          <div className="text-center text-gray-600 text-lg mt-20">
            <p className="text-5xl mb-4">📖</p>
            <p>No books found yet.</p>
            <p className="text-gray-500">Be the first to add one!</p>
          </div>
        ) : (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <li
                key={book.id}
                className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-gray-100"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-indigo-600 transition">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm italic mb-2">
                      by {book.author}
                    </p>
                    <p className="text-yellow-500 font-medium mb-3">
                      ⭐ {book.rating}/10
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                      {book.blurb}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/book/${book.id}/view`}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      View
                    </Link>
                    <Link
                      href={`/book/${book.id}/edit`}
                      className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <DeleteBookButton bookId={book.id} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
