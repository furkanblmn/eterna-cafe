<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class Output
{
    public static function ok($data, $statusCode = Response::HTTP_OK): JsonResponse
    {
        if (is_array($data)) {
            array_walk_recursive($data, function (&$item, $key) {
                $item = $item === null ? '' : $item;
            });
        }

        return response()->json([
            'status' => 'ok',
            'code'=> $statusCode,
            'data' => $data,
        ]);
    }

    public static function fails($message, $statusCode = Response::HTTP_BAD_REQUEST): JsonResponse
    {
        return response()->json([
            'status' => 'fails',
            'code'=> $statusCode,
            'message' => $message
        ], $statusCode);
    }
}
