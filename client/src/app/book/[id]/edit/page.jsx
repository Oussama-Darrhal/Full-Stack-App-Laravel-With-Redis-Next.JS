'use client'

import { useState, useEffect } from 'react'

export default function EditBook({ params }) {
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetch(`/book/${params.id}`)
      .then(res => res.json())
      .then(setBook)
  }, [params.id])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const formData = new FormData(e.target)

    try {
      const res = await fetch(`/book/${params.id}`, {
        method: 'PUT',
        body: formData,
      })

      if (res.ok) {
        setMessage({ text: 'Book updated successfully!', type: 'success' })
        setTimeout(() => window.location.href = '/', 1200)
      } else {
        setMessage({ text: 'Failed to update book.', type: 'error' })
      }
    } catch (err) {
      console.error(err)
      setMessage({ text: 'Something went wrong.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  if (!book) return <p className="text-center mt-10 text-gray-500">Loading...</p>

  return (
    <main className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Book</h2>

      {message && (
        <div className={`mb-4 px-4 py-2 rounded-md font-medium text-white ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            defaultValue={book.title}
            name="title"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Author</label>
          <input
            defaultValue={book.author}
            name="author"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Rating</label>
          <input
            defaultValue={book.rating}
            name="rating"
            type="number"
            max="10"
            min="1"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Blurb</label>
          <textarea
            defaultValue={book.blurb}
            name="blurb"
            rows="4"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md font-semibold text-white shadow-md transition 
            ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
          `}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </main>
  )
}
