<?php

namespace App\Repositories;

use App\Models\Room;

class RoomRepository extends BaseRepository
{
    protected $modelClass = Room::class;

    public function create(array $room): Room
    {
        return $this->model->create($room);
    }

    public function findByKey(string $key): ?Room
    {
        return $this->model->where('key', $key)->first();
    }

    public function findById(int $id): ?Room
    {
        return $this->model->find($id);
    }

    public function finishRoomById(int $roomId)
    {
        $this->model->find($roomId)->update(['finished_at' => now()]);
    }
}
