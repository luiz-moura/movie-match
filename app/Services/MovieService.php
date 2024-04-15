<?php

namespace App\Services;

class MovieService
{
    public function __construct(
        private HttpClientService $httpClientService
    ) {
        $this->httpClientService
            ->setBaseUri(config('integrations.tmdb.base_uri'))
            ->setSecret(config('integrations.tmdb.secret'));
    }

    public function getMovies(): array
    {
        return $this->httpClientService->get('/3/movie/popular');
    }
}
