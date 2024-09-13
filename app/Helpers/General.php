<?php

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;


function formatDate($date, $format = 'DD MMMM YYYY HH:mm', $displayType = null)
{
    Carbon::setLocale(config('app.locale'));
    $parsedDate = Carbon::parse($date);

    if ($parsedDate->isToday() && $displayType !== "hour") {
        return 'Bugün ' . $parsedDate->isoFormat('HH:mm');
    }

    return $parsedDate->isoFormat($format);
}

function checkMimeType($extension)
{
    $allowedExtensions = ["jpeg", "jpg", "webp", "png", "svg", "pdf", "mp4", 'mp3'];

    return Arr::first($allowedExtensions, fn($ext) => $ext === Str::lower($extension));
}

