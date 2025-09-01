<?php

use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\CheckController;
use App\Http\Controllers\Api\DossierController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::middleware('auth')->prefix('api')->group(function () {
    Route::get('users', [UserController::class, 'index']);
    Route::post('checks/import', [CheckController::class, 'import']);
    Route::get('checks/{check}/history', [CheckController::class, 'history']);
    Route::post('checks/{check}/replace', [CheckController::class, 'replace']);
    Route::post('dossiers/{dossier}/assign-check', [DossierController::class, 'assignCheck']);
    Route::apiResource('clients', ClientController::class);
    Route::post('clients/import', [ClientController::class, 'import']);
    Route::apiResource('dossiers', DossierController::class);
    Route::apiResource('checks', CheckController::class);
});
