<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMovieRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'direction' => 'string|in:left,right|required',
            'movie_id' => 'integer|required',
            'room_id' => 'integer|required',
        ];
    }
}
