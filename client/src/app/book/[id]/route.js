import { getRedisClient } from "@/lib/redis";
import { NextResponse } from "next/server";

// GET a single book by ID
export async function GET(_, { params }) {
    const client = await getRedisClient();
    const book = await client.hGetAll(`book:${params.id}`);

    if (!book || Object.keys(book).length === 0) {
        return NextResponse.json(
            { error: "Book not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(book);
}

// UPDATE (PUT)
export async function PUT(req, { params }) {
    const client = await getRedisClient();
    const formData = await req.formData();
    const data = Object.fromEntries(formData);

    await client.hSet(`book:${params.id}`, data);

    return NextResponse.json({
        success: true,
        message: "Book updated successfully",
        book: data,
    });
}

// DELETE
export async function DELETE(_, { params }) {
    const client = await getRedisClient();

    await client.del(`book:${params.id}`);
    await client.sRem("books", params.id);

    return NextResponse.json({
        success: true,
        message: "Book deleted successfully",
    });
}
