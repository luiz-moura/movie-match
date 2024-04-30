<?php

namespace App\Repositories;

use App\Models\Room;

class RoomRepository extends BaseRepository
{
    protected $modelClass = Room::class;

    public function create(array $room): array
    {
        return $this->model->create($room)->toArray();
    }

    public function findByKey(string $key): ?array
    {
        return $this->model->query()
            ->where('key', $key)
            ->first()
            ?->toArray();
    }

    public function findById(int $id): ?array
    {
        return $this->model->find($id)?->toArray();
    }

    public function finishRoomById(int $roomId): void
    {
        $this->model->find($roomId)->update(['finished_at' => now()]);
    }
}
