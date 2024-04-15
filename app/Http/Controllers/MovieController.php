<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\MovieService;

class MovieController extends Controller
{
    public function index(MovieService $movieService)
    {
        $movies = $movieService->getMovies();

        dd($movies);
    }
}
