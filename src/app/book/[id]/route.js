import { getRedisClient } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
    const client = await getRedisClient();
    const formData = await req.formData();
    const data = Object.fromEntries(formData);

    await client.hSet(`book:${params.id}`, data);
    return NextResponse.json({ success: true });
}

export async function DELETE(_, { params }) {
    const client = await getRedisClient();

    await client.del(`book:${params.id}`);
    await client.sRem("books", params.id);

    return NextResponse.json({ success: true });
}
