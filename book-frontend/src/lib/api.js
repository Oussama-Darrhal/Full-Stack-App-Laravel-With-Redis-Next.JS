const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllBooks() {
    const res = await fetch(`${API_URL}/books`, {
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch books');
    return res.json();
}

export async function getBookById(id) {
    const res = await fetch(`${API_URL}/books/${id}`, {
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch book');
    return res.json();
}

export async function createBook(data) {
    const res = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to create book');
    }

    return res.json();
}

export async function updateBook(id, data) {
    const res = await fetch(`${API_URL}/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to update book');
    }

    return res.json();
}

export async function deleteBook(id) {
    const res = await fetch(`${API_URL}/books/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Failed to delete book');
    }
    return true;
}