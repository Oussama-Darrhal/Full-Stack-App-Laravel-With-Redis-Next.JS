'use client'

import { useState, useEffect } from 'react'

export default function EditBook({ params }) {
  const [book, setBook] = useState(null)

  useEffect(() => {
    fetch(`/book/${params.id}`)
      .then(res => res.json())
      .then(setBook)
  }, [params.id])

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)

    await fetch(`/book/${params.id}`, {
      method: 'PUT',
      body: formData,
    })

    window.location.href = '/'
  }

  if (!book) return <p className="text-center mt-10">Loading...</p>

  return (
    <main className="max-w-xl mx-auto bg-white p-8 mt-10 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input defaultValue={book.title} name="title" className="input" />
        <input defaultValue={book.author} name="author" className="input" />
        <input defaultValue={book.rating} name="rating" type="number" max="10" min="1" className="input" />
        <textarea defaultValue={book.blurb} name="blurb" className="input"></textarea>
        <button className="btn bg-indigo-600 hover:bg-indigo-700 text-white">Save Changes</button>
      </form>
    </main>
  )
}
