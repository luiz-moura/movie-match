<?php

namespace App\Console\Commands;

use App\Events\SwipeMovie;
use App\Services\MovieCacheService;
use Illuminate\Console\Command;

class SwipeMovieCommand extends Command
{
    protected $signature = 'app:swipe';

    protected $description = 'Swipe movie';

    public function handle(MovieCacheService $movieCacheService)
    {
        $movie = $movieCacheService->setIdentifier('movie')->findById(693134);
        SwipeMovie::dispatch($movie);
    }
}
