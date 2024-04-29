<?php

namespace App\Http\Controllers;

use App\Events\SwipeMovie;
use App\Http\Controllers\Controller;
use App\Repositories\RoomMovieRepository;
use App\Repositories\RoomRepository;
use App\Services\MovieCacheService;
use App\Services\MovieService;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class MovieController extends Controller
{
    public function __construct(
        private RoomRepository $roomRepository,
        private RoomMovieRepository $roomMovieRepository,
        // private MovieCacheService $movieCacheService,
        private MovieService $movieService,
    ) {
        // $movieCacheService->setIdentifier('movie');
    }

    public function swipe(Request $request)
    {
        $roomId = $request->get('room_id');
        $room = $this->roomRepository->findById($roomId);
        if (!$room) {
            throw new NotFoundHttpException();
        }

        $movieId = $request->get('movie_id');
        $direction = $request->get('direction');

        if ($direction === 'right') {
            $match = $this->roomMovieRepository->checksMachByRoomIdAndMovieId($roomId, $movieId);
            if ($match) {
                // $movie = $this->movieCacheService->findById($movieId);
                $movie = $this->movieService->findById($movieId);
                SwipeMovie::dispatch($movie, $room->key);
            }
        }

        $this->roomMovieRepository->create([
            'room_id' => $roomId,
            'movie_id' => $movieId,
            'match' => $match ?? false,
            'direction' => $request->get('direction'),
        ]);
    }
}
