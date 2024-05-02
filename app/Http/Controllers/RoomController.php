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
    public function __construct(private RoomRepository $roomRepository)
    {
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

        return to_route('room.share', $room['key']);
    }

    public function share(string $key)
    {
        $room =  $this->roomRepository->findByKey($key);
        if (!$room) {
            throw new NotFoundHttpException();
        }

        return Inertia::render('Room/Share', compact('room'));
    }

    public function show(
        string $key,
        RoomMovieRepository $roomMovieRepository,
        MovieCacheService $movieCacheService,
        MovieService $movieService,
    ) {
        $room =  $this->roomRepository->findByKey($key);
        if (!$room) {
            throw new NotFoundHttpException();
        }

        if (!$room['finished_at']) {
            $movies = $movieCacheService->setIdentifier('popular')->getMovies('popular');
        }

        if ($room['finished_at']) {
            $match = $roomMovieRepository->queryByMatchByRoomId($room['id']);
            $room['match'] = $movieService->findById($match['movie_id']);
        }

        return Inertia::render('Room/Show', [
            'room' => $room ?? [],
            'movies' => $movies ?? [],
        ]);
    }
}
