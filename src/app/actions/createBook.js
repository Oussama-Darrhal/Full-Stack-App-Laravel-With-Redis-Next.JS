'use server'

import { redirect } from 'next/navigation'
import { getRedisClient } from '@/lib/redis'

export async function createBook(formData) {
  const { title, author, rating, blurb } = Object.fromEntries(formData)

  if (!title || !author || !rating) {
    return { error: 'All fields are required' }
  }

  const client = await getRedisClient()

  const id = Date.now().toString()
  const book = { id, title, author, rating, blurb }

  try {
    await client.hSet(`book:${id}`, book)
    await client.sAdd('books', id)
  } catch (error) {
    console.error('Redis Error:', error)
    return { error: 'Failed to save book' }
  }

  redirect('/')
}
