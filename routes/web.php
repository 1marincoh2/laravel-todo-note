<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

// Cualquier otra ruta es gestionada por Vue Router.
Route::get('{any}', function () {
    return view('app'); // app.blade.php o un archivo que apunte al build de Vue.
})->where('any', '.*');
