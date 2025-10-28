<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Book;
use Illuminate\Support\Facades\Redis;

class BookTest extends TestCase
{
    use RefreshDatabase; // resets the DB for each test

    /** @test */
    public function can_create_and_fetch_a_book()
    {
        // Clear Redis
        Redis::flushall();

        // Create a book
        $book = Book::factory()->create([
            'title' => 'Test Book',
            'author' => 'John Doe',
            'rating' => 8,
            'blurb' => 'Testing Redis cache'
        ]);

        // store it in Redis as the app would
        Redis::set("book:{$book->id}", json_encode($book->toArray()));

        // Check if Redis has the key
        $cached = Redis::get("book:{$book->id}");
        $this->assertNotNull($cached);

        // Check if Redis content matches
        $cachedData = json_decode($cached, true);
        $this->assertEquals('Test Book', $cachedData['title']);
    }

    public function testBookCanBeUpdatedInDatabaseAndRedis()
    {
        Redis::flushall(); // clean Redis

        // Create a book
        $book = Book::factory()->create([
            'title' => 'Old Title',
            'author' => 'Jane Doe',
            'rating' => 5,
            'blurb' => 'Old blurb'
        ]);

        // Store in Redis
        Redis::set("book:{$book->id}", json_encode($book->toArray()));

        // Update book data
        $updatedData = [
            'title' => 'New Title',
            'author' => 'Jane Doe',
            'rating' => 9,
            'blurb' => 'Updated blurb'
        ];

        // Update in DB
        $book->update($updatedData);

        // Update Redis
        Redis::set("book:{$book->id}", json_encode($book->toArray()));

        // Fetch updated Redis data
        $cached = json_decode(Redis::get("book:{$book->id}"), true);

        $this->assertEquals('New Title', $cached['title']);
        $this->assertEquals(9, $cached['rating']);
    }

    public function testBookCanBeDeletedFromDatabaseAndRedis()
    {
        Redis::flushall();

        // Create a book
        $book = Book::factory()->create([
            'title' => 'Delete Me',
            'author' => 'John Doe',
            'rating' => 6,
            'blurb' => 'This book will be deleted'
        ]);

        // Store in Redis
        Redis::set("book:{$book->id}", json_encode($book->toArray()));

        // Delete from DB
        $book->delete();

        // Delete from Redis
        Redis::del("book:{$book->id}");

        // Assertions
        $this->assertDatabaseMissing('books', ['id' => $book->id]);
        $this->assertNull(Redis::get("book:{$book->id}"));
    }

}
