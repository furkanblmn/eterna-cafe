<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Kayıt


Route::controller(AuthController::class)->group(function () {
    Route::get('/register', 'register_page');
    Route::post('/register', 'register');

    Route::get('/login', 'login_page')->name('login');
    Route::post('/login', 'login');

    Route::get('/password/forgot', 'forgot_page');
    Route::post('/password/forgot', 'reset_password');

    Route::get('/password/update', 'update_pass_page');
    Route::post('/password/update', 'update_password');

    Route::get('/logout', 'logout');
});
