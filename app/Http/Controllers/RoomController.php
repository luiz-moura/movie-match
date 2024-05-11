<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\RoomMovieRepository;
use App\Repositories\RoomRepository;
use App\Services\MovieService;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class RoomController extends Controller
{
    public function __construct(private RoomRepository $roomRepository)
    {
    }

    public function create()
    {
        return inertia('Room/Create');
    }

    public function store()
    {
        $room = $this->roomRepository->create(['key' => Str::random(5)]);

        return to_route('room.share', $room['key']);
    }

    public function share(string $key)
    {
        $room =  $this->roomRepository->findByKey($key);
        if (!$room) {
            throw new NotFoundHttpException();
        }

        return inertia('Room/Share', compact('room'));
    }

    public function show(
        string $key,
        RoomMovieRepository $roomMovieRepository,
        MovieService $movieService,
    ) {
        $room =  $this->roomRepository->findByKey($key);
        if (!$room) {
            throw new NotFoundHttpException();
        }

        $match = false;
        if ($room['finished_at']) {
            $match = $roomMovieRepository->queryByMatchByRoomId($room['id']);
        }

        if ($match) {
            $room['match'] = $movieService->findById($match['movie_id']);
        }

        return inertia('Room/Show', compact('room'));
    }
}
