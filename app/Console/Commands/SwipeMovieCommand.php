<?php

namespace App\Console\Commands;

use App\Events\SwipeMovie;
use Illuminate\Console\Command;

class SwipeMovieCommand extends Command
{
    protected $signature = 'app:swipe';

    protected $description = 'Swipe movie';

    public function handle()
    {
        SwipeMovie::dispatch();
    }
}
