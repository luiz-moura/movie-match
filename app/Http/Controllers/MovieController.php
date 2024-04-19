<?php

namespace App\Http\Controllers;

use App\Events\SwipeMovie;
use App\Http\Controllers\Controller;
use App\Repositories\RoomMovieRepository;
use App\Repositories\RoomRepository;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class MovieController extends Controller
{
    public function __construct(
        private RoomRepository $roomRepository,
        private RoomMovieRepository $roomMovieRepository,
    ) {
    }

    public function swipeLeft(Request $request)
    {
        $room = $this->roomRepository->findById($request->get('room_id'));
        if (!$room) {
            throw new NotFoundHttpException();
        }

        $match = $this->roomMovieRepository->existsByMovieId($request->get('movie_id'));
        if ($match) {
            SwipeMovie::dispatch();
        }

        $this->roomMovieRepository->create([
            'room_id' => $request->get('room_id'),
            'movie_id' => $request->get('movie_id'),
            'direction' => 'left'
        ]);
    }

    public function swipeRight(Request $request)
    {
        $room = $this->roomRepository->findById($request->get('room_id'));
        if (!$room) {
            throw new NotFoundHttpException();
        }

        $match = $this->roomMovieRepository->existsByMovieId($request->get('movie_id'));
        if ($match) {
            SwipeMovie::dispatch();
        }

        $this->roomMovieRepository->create([
            'room_id' => $request->get('room_id'),
            'movie_id' => $request->get('movie_id'),
            'direction' => 'right'
        ]);
    }
}
