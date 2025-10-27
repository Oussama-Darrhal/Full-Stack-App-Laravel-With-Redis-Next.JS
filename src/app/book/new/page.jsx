'use client'

import { createBook } from '@/app/actions/createBook'
import { useState } from "react"
import { useRouter } from 'next/navigation'

export default function Create() {
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(formData) {
    const result = await createBook(formData)

    if (result?.error) {
      setError(result.error)
    } else {
      router.push('/')
    }
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <form 
        action={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-lg shadow-sm border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add a New Book</h2>

        <div className="space-y-4">
          <input 
            type="text" 
            name="title" 
            placeholder="Book title" 
            className="w-full border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />

          <input 
            type="text" 
            name="author" 
            placeholder="Author" 
            className="w-full border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />

          <input 
            type="number" 
            name="rating" 
            max={10} 
            min={1} 
            placeholder="Rating (1–10)" 
            className="w-full border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />

          <textarea 
            name="blurb" 
            placeholder="Book description..." 
            className="w-full border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[120px]"
            required
          ></textarea>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition font-medium"
          >
            Add Book
          </button>
        </div>
      </form>
    </main>
  )
}
