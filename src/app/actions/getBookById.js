'use server'
import client from '@/lib/redis'

export async function getBookById(id) {
    const data = await client.get(id)
    return data ? JSON.parse(data) : null
}
