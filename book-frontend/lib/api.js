const API_URL = process.env.NEXT_PUBLIC_API_URL;


// Fetches all books from the Laravel API.

export async function getAllBooks() {
    console.log('Fetching all books from:', `${API_URL}/books`);

    const res = await fetch(`${API_URL}/books`, {
        cache: 'no-store' // We want fresh data, our Laravel backend handles caching
    });

    if (!res.ok) {
        // This will be caught by the nearest error.js boundary
        throw new Error('Failed to fetch books');
    }

    return res.json();
}
