<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessBookWordCount;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class BookController extends Controller
{
    public function index()
    {
        // Try getting from Redis first
        $cachedBooks = Redis::get('books:all');
        if ($cachedBooks) {
            return response()->json(json_decode($cachedBooks, true));
        }

        // Otherwise fetch from DB
        $books = Book::all();

        // Cache it for 10 minutes
        Redis::setex('books:all', 600, $books->toJson());

        return response()->json($books);
    }

    public function show($id)
    {
        $cacheKey = "book:$id";

        if ($cached = Redis::get($cacheKey)) {
            return response()->json(json_decode($cached, true));
        }

        $book = Book::find($id);

        if (!$book) {
            return response()->json(['error' => 'Book not found'], 404);
        }

        Redis::setex($cacheKey, 600, $book->toJson());

        return response()->json($book);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'rating' => 'required|numeric|min:1|max:10',
            'blurb' => 'required|string',
        ]);

        $book = Book::create($validated);

        // Dispatch the word count processing job
        ProcessBookWordCount::dispatch($book);

        // Invalidate cache
        Redis::del('books:all');

        return response()->json(['success' => true, 'book' => $book], 201);
    }

    public function update(Request $request, $id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['error' => 'Book not found'], 404);
        }

        $book->update($request->only('title', 'author', 'rating', 'blurb'));

        // Dispatch the word count processing job
        ProcessBookWordCount::dispatch($book);

        // Update caches
        Redis::setex("book:$id", 600, $book->toJson());
        Redis::del('books:all');

        return response()->json(['success' => true, 'book' => $book]);
    }

    public function destroy($id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['error' => 'Book not found'], 404);
        }

        $book->delete();

        // Clear cache
        Redis::del("book:$id");
        Redis::del('books:all');

        return response()->json(['success' => true]);
    }
}
