<?php

use Inertia\Middleware;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

// Inertia middleware sadece dashboard rotaları için
Route::middleware(['web', Middleware::class])->group(function () {
    Route::get('/admin', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Diğer dashboard rotaları...
});
