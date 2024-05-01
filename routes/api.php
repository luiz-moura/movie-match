<?php

use App\Http\Controllers\MovieController;
use Illuminate\Support\Facades\Route;

Route::post('movie/swipe', [MovieController::class, 'swipe']);
