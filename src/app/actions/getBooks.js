'use server'
import client from '@/lib/redis'

export async function getBooks() {
    const ids = await client.lRange('books', 0, -1)
    const books = await Promise.all(ids.map(id => client.get(id)))
    return books.map(JSON.parse)
}
