<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\RoomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('room', [RoomController::class, 'store']);

Route::post('movie/swipe-left', [MovieController::class, 'swipeLeft']);
Route::post('movie/swipe-right', [MovieController::class, 'swipeRight']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
