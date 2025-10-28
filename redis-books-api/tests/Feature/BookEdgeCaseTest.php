<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Book;
use Illuminate\Support\Facades\Redis;

class BookEdgeCaseTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function updating_a_nonexistent_book_does_not_pollute_redis()
    {
        $nonExistentId = 9999;

        $response = $this->putJson("/api/books/{$nonExistentId}", [
            'title' => 'Updated Title',
            'author' => 'Author',
            'rating' => 5,
            'blurb' => 'Updated blurb'
        ]);

        $response->assertStatus(404);

        // Check Redis
        $cached = Redis::get("book:{$nonExistentId}");
        $this->assertNull($cached, "Redis cache should not contain data for a non-existent book");
    }

    /** @test */
    public function deleting_a_nonexistent_book_does_not_pollute_redis()
    {
        $nonExistentId = 9999;

        $response = $this->deleteJson("/api/books/{$nonExistentId}");

        $response->assertStatus(404);

        // Check Redis
        $cached = Redis::get("book:{$nonExistentId}");
        $this->assertNull($cached, "Redis cache should not contain data for a deleted/non-existent book");
    }
}
