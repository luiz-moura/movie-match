<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

abstract class CacheService
{
    protected string $key;
    protected int $ttl = 60;

    public function getKey(): string
    {
        return $this->key;
    }

    public function value(): mixed
    {
        return Cache::remember(
            $this->getKey(),
            $this->ttl,
            fn () => $this->generate()
        );
    }

    public function forget(): bool
    {
        return Cache::forget($this->getKey());
    }

    abstract protected function generate(): mixed;
}
