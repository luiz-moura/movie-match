<?php

use App\Http\Controllers\MovieController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('movie/swipe', [MovieController::class, 'swipe']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
