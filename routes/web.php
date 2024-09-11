<?php

use App\Http\Controllers\Frontend\CategoryController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\ProductController;
use Illuminate\Support\Facades\Route;


Route::name('frontend.')->group(function () {
    Route::controller(HomeController::class)->group(function () {
        Route::get('/', 'index')->name('home.index');
    });

    Route::controller(CategoryController::class)->group(function () {
        Route::get('/{username}', 'index')->name('categories.list');
        Route::get('/{username}/{category}', 'products')->name('categories.products');
    });

    Route::controller(ProductController::class)->group(function () {
        Route::get('/{username}/{category}/{product}', 'index')->name('products.detail');
    });
});
