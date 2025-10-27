'use server'
import client from '@/lib/redis'
import { redirect } from 'next/navigation'

export async function deleteBook(id) {
    // Remove from Redis
    await client.del(id)
    // Remove its ID from the list
    await client.lRem('books', 1, id)
    redirect('/')
}
