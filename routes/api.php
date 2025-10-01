
<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\ColisController;
use App\Http\Controllers\AvisController;
use App\Http\Controllers\TypeColisController;
use App\Http\Controllers\TrajetPorteurController;

// Utilisateurs
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);

// Colis
Route::get('/colis', [ColisController::class, 'index']);
Route::get('/colis/{id}', [ColisController::class, 'show']);

// Avis
Route::get('/avis', [AvisController::class, 'index']);
Route::get('/avis/{id}', [AvisController::class, 'show']);

// Types de colis
Route::get('/types-colis', [TypeColisController::class, 'index']);
Route::get('/types-colis/{id}', [TypeColisController::class, 'show']);

// Trajets des porteurs
Route::get('/trajets', [TrajetPorteurController::class, 'index']);
Route::get('/trajets/{id}', [TrajetPorteurController::class, 'show']);
