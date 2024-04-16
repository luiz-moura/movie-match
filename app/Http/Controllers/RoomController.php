<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Repositories\RoomRepository;
use Illuminate\Support\Str;

class RoomController extends Controller
{
    public function store(RoomRepository $roomRepository)
    {
        $key = Str::random();
        $roomRepository->create([
            'key' => $key
        ]);

        return [
            $key
        ];
    }

    public function show(string $key, RoomRepository $roomRepository)
    {
        $room =  $roomRepository->findByKey($key);

        if (!$room) {
            return redirect()->back();
        }
    }
}
