<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\MovieController;


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

Route::prefix('movies')->group(function () {
    Route::get('/',[ MovieController::class, 'getAll']);
    Route::post('/',[ MovieController::class, 'store']);
    Route::delete('/{id}',[ MovieController::class, 'destroy']);
});