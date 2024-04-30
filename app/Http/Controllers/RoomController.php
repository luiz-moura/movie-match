<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\RoomMovieRepository;
use App\Repositories\RoomRepository;
use App\Services\MovieCacheService;
use App\Services\MovieService;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class RoomController extends Controller
{
    public function __construct(private RoomRepository $roomRepository) {
    }

    public function create()
    {
        return Inertia::render('Room/Create');
    }

    public function store()
    {
        $room = $this->roomRepository->create([
            'key' => Str::random(5)
        ]);

        return to_route('room.show', $room['key']);
    }

    public function show(
        string $key,
        MovieCacheService $movieCacheService,
        MovieService $movieService,
        RoomMovieRepository $roomMovieRepository,
    )
    {
        $room =  $this->roomRepository->findByKey($key);
        if (!$room) {
            throw new NotFoundHttpException();
        }

        $movies = [];
        if (!$room['finished_at']) {
            $movies = $movieCacheService->setIdentifier('popular')->getMovies('popular');
        }

        $room['match'] = [];
        if ($room['finished_at']) {
            $match = $roomMovieRepository->queryByMatchByRoomId($room['id']);
            $room['match'] = $movieService->findById($match['movie_id']);
        }

        return Inertia::render('Room/Show', compact('room', 'movies'));
    }
}
