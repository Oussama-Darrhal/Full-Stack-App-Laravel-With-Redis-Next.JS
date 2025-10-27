'use client'

import { createBook } from '@/app/actions/createBook'
import { useState } from "react"
import { useRouter } from 'next/navigation'

export default function Create() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const router = useRouter()

  async function handleSubmit(formData) {
    setLoading(true)
    setError('')
    setMessage(null)

    const result = await createBook(formData)

    if (result?.error) {
      setError(result.error)
    } else {
      setMessage({ text: 'Book added successfully!', type: 'success' })
      setTimeout(() => router.push('/'), 1200)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <form 
        action={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add a New Book</h2>

        {message && (
          <div className={`mb-4 px-4 py-2 rounded-md font-medium text-white ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {message.text}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <input 
              type="text" 
              name="title" 
              placeholder="Book title" 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          <div>
            <input 
              type="text" 
              name="author" 
              placeholder="Author" 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          <div>
            <input 
              type="number" 
              name="rating" 
              max={10} 
              min={1} 
              placeholder="Rating (1–10)" 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          <div>
            <textarea 
              name="blurb" 
              placeholder="Book description..." 
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition min-h-[120px] resize-none"
              required
            ></textarea>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold text-white shadow-md transition 
              ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
            `}
          >
            {loading ? 'Adding...' : 'Add Book'}
          </button>
        </div>
      </form>
    </main>
  )
}
