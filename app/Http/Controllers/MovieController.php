<?php

namespace App\Http\Controllers;

use App\Events\SwipeMovie;
use App\Http\Controllers\Controller;
use App\Repositories\RoomMovieRepository;
use App\Repositories\RoomRepository;
use App\Services\MovieCacheService;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class MovieController extends Controller
{
    public function __construct(
        private RoomRepository $roomRepository,
        private RoomMovieRepository $roomMovieRepository,
        private MovieCacheService $movieCacheService
    ) {
        $movieCacheService->setIdentifier('movie');
    }

    public function swipe(Request $request)
    {
        $roomId = $request->get('room_id');
        $room = $this->roomRepository->findById($roomId);
        if (!$room) {
            throw new NotFoundHttpException();
        }

        $movieId = $request->get('movie_id');
        $match = $this->roomMovieRepository->existsByMovieId($movieId);
        if ($match) {
            $movie = $this->movieCacheService->findById($movieId);
            SwipeMovie::dispatch($movie);
        }

        $this->roomMovieRepository->create([
            'room_id' => $roomId,
            'movie_id' => $movieId,
            'match' => $match,
            'direction' => $request->get('direction'),
        ]);
    }
}
