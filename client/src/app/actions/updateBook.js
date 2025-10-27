'use server'
import client from '@/lib/redis'
import { redirect } from 'next/navigation'

export async function updateBook(id, formData) {
    const { title, author, rating, blurb } = Object.fromEntries(formData)
    const book = { id, title, author, rating, blurb }

    await client.set(id, JSON.stringify(book))
    redirect('/')
}
