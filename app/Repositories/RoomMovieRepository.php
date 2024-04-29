<?php

namespace App\Repositories;

use App\Models\RoomMovie;

class RoomMovieRepository extends BaseRepository
{
    protected $modelClass = RoomMovie::class;

    public function create(array $roomMovie): void
    {
        $this->model->create($roomMovie);
    }

    public function checksMachByRoomIdAndMovieId(int $roomId, int $movieId): bool
    {
        return $this->model->where('room_id', $roomId)
            ->where('movie_id', $movieId)
            ->where('direction', 'right')
            ->exists();
    }
}
