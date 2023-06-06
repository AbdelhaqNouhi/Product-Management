<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\auth\login;
use App\Http\Controllers\auth\loginController;
use App\Http\Controllers\auth\RegisterController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('v1')->group(function () {

        Route::get('product/search/{search}', [ProductController::class, 'search']);
        Route::get('product', [ProductController::class, 'getAll']);
        Route::post('product', [ProductController::class, 'store']);
        Route::get('product/{product}', [ProductController::class, 'getById']);
        Route::put('product/{product}', [ProductController::class, 'update']);
        Route::delete('product/{product}', [ProductController::class, 'destroy']);
    });
});

Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);


