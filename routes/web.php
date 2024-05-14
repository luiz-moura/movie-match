<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoomController;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/room', Response::HTTP_MOVED_PERMANENTLY);

Route::controller(RoomController::class)->prefix('room')->group(function () {
    Route::get('/', 'create')->name('room.create');
    Route::post('/', 'store')->name('room.store');
    Route::get('/{key}', 'show')->name('room.show');
    Route::get('/{key}/share', 'share')->name('room.share');
});

Route::get('/tab-locked', fn () => inertia('TabLocked'))->name('tab-locked');

// Route::middleware('auth')
//     ->controller(ProfileController::class)
//     ->prefix('profile')
//     ->group(function () {
//         Route::get('/', 'edit')->name('profile.edit');
//         Route::patch('/', 'update')->name('profile.update');
//         Route::delete('/', 'destroy')->name('profile.destroy');
//     });

// require __DIR__.'/auth.php';
