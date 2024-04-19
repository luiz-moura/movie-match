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

    public function existsByMovieId(string $movieId): bool
    {
        return $this->model->where('movie_id', $movieId)->exists();
    }
}
