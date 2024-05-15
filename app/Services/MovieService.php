<?php
namespace App\Services;

use App\Models\Room;

class MovieService
{
    public function deleteExpiredRooms(): void
    {
        Room::query()
            ->where('created_at', '<=', today()->subDay())
            ->whereNull('finished_at')
            ->forceDelete();
    }
}
