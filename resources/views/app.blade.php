<!DOCTYPE html>
<html class="h-full bg-gray-100">

<head lang="tr">
    <meta charset="UTF-8">
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="csrf-token" id="csrf-token" content="{{ csrf_token() }}">

    @vite('resources/js/app.js')
    @inertiaHead
</head>

<body class="font-sans leading-none text-gray-700 antialiased">
    @inertia
    <div id="initial-loading-screen" class="loading-screen"></div>
</body>

</html>
