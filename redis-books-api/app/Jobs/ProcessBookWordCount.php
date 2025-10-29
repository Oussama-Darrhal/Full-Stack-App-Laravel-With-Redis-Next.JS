<?php

namespace App\Jobs;

use App\Models\Book;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ProcessBookWordCount implements ShouldQueue
{
    use Queueable;

    public Book $book;

    /**
     * Create a new job instance.
     */
    public function __construct(Book $book)
    {
        $this->book = $book;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Simulate a 5-second delay for demo purposes
        sleep(5);

        // Calculate word count of the blurb
        $wordCount = str_word_count($this->book->blurb);

        // Update the book model in the database
        $this->book->update(['word_count' => $wordCount]);
    }
}
