<?php

namespace App\Services;

use App\Services\Traits\CacheIdentifier;

class MovieCacheService extends CacheService
{
    use CacheIdentifier;

    protected string $key = 'movies:%s';
    protected int $ttl = 60;

    public function __construct(private readonly MovieService $movieService) {}

    protected function generate(): array
    {
        return $this->movieService->getMovies($this->identifier);
    }
}
