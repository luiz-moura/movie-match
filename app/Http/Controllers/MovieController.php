<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\MovieCacheService;

class MovieController extends Controller
{
    public function index( MovieCacheService $movieCacheService)
    {
        $movies = $movieCacheService->setIdentifier('popular')->value();

        dd($movies);
    }
}
