<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoomMovie extends Model
{
    use HasFactory;

    protected $table = 'room_movies';

    protected $fillable = [
        'room_id',
        'movie_id',
        'direction',
        'match',
    ];
}
