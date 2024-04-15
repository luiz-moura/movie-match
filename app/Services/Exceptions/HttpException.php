<?php

namespace App\Services\Exceptions;

use Exception;
use Illuminate\Http\Response;
use Throwable;

class HttpException extends Exception
{
    public function __construct(string $message, ?Throwable $previous = null)
    {
        parent::__construct(
            $message,
            Response::HTTP_INTERNAL_SERVER_ERROR,
            $previous
        );
    }
}
