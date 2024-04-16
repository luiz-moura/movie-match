<?php

namespace App\Repositories;

use App\Models\Room;

class RoomRepository extends BaseRepository
{
    protected $modelClass = Room::class;

    public function create(array $data): Room
    {
        return $this->model->create($data);
    }

    public function findByKey(string $key): ?Room
    {
        return $this->model->where('key', $key)->first();
    }
}
