<?php

namespace App\Services;

use App\Services\Traits\CacheIdentifier;

class MovieCacheService extends CacheService
{
    use CacheIdentifier;

    protected string $key = 'movies:%s';
    protected int $ttl = 60;

    public function __construct(private readonly MovieService $movieService) {}

    public function __call($method, $args)
    {
        return $this->value(function () use ($method, $args) {
            return $this->movieService->$method(...$args);
        });
    }
}
