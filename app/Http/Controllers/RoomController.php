<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\RoomRepository;
use App\Services\MovieCacheService;
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

        return to_route('room.show', $room->key);
    }

    public function show(string $key, MovieCacheService $movieCacheService)
    {
        $room =  $this->roomRepository->findByKey($key);
        if (!$room) {
            throw new NotFoundHttpException();
        }

        $movies = $movieCacheService->setIdentifier('popular')->getMovies('popular');

        return Inertia::render('Room/Show', compact('room', 'movies'));
    }
}
