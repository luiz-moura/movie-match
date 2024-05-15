<?php

namespace App\Services;

class MovieApiService
{
    public function __construct(
        private HttpClientService $httpClientService
    ) {
        $this->httpClientService
            ->setBaseUri(config('integrations.tmdb.base_uri'))
            ->setSecret(config('integrations.tmdb.secret'));
    }

    public function getMovies(int $page, string $filter): array
    {
        return $this->httpClientService->get("/3/movie/{$filter}?page={$page}");
    }

    public function findById(int $id): array
    {
        return $this->httpClientService->get("/3/movie/{$id}");
    }
}
