<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnimalController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\VenteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('admin/dashboard',[AdminController::class,'index'])->name('dashboard');

Route::get('admin/animaux',[AnimalController::class,'index'])->name('animaux');
Route::post('admin/animaux',[AnimalController::class,'store'])->name('animaux.store');
// Route::put('admin/animaux/{id}',[AnimalController::class,'update'])->name('animaux.update');
Route::delete('admin/animaux/{id}',[AnimalController::class,'destroy'])->name('animaux.destroy');

Route::get('admin/produits',[ProduitController::class,'index'])->name('produits.index');
Route::get('api/produits',[ProduitController::class,'getData']);
Route::post('api/produits',[ProduitController::class,'store']);
Route::put('api/produits/{id}',[ProduitController::class,'update']);
Route::delete('api/produits/{id}',[ProduitController::class,'destroy']);
Route::get('api/produits/{id}',[ProduitController::class,'getDataById']);

// Route::get('admin/produits',[ProduitController::class,'index'])->name('produits.index');
Route::get('api/users',[ClientController::class,'getData']);
Route::post('api/users',[ClientController::class,'store']);
Route::put('api/users/{id}',[ClientController::class,'update']);
Route::delete('api/users/{id}',[ClientController::class,'destroy']);
Route::get('api/users/{id}',[ClientController::class,'getDataById']);

Route::get('admin/users',[AdminController::class,'users'])->name('users');
Route::delete('admin/users/{id}',[AdminController::class,'destroy'])->name('users.destroy');


Route::get('api/animaux',[AnimalController::class,'getData']);
Route::get('api/animaux/{id}',[AnimalController::class,'getDataById']);
Route::post('api/animaux',[AnimalController::class,'store']);
Route::delete('api/animaux/{id}',[AnimalController::class,'deleteAnimal']);
Route::put('api/animaux/update/{id}',[AnimalController::class,'update']);

Route::get('api/ventes',[VenteController::class,'getData']);
Route::get('api/ventes/{id}',[VenteController::class,'getDataById']);
Route::post('api/ventes',[VenteController::class,'store']);
Route::delete('api/ventes/{id}',[VenteController::class,'destroy']);
// Route::put('api/ventes/update/{id}',[VenteController::class,'update']);
Route::get('admin/ventes',[AdminController::class,'ventes'])->name('ventes.index');


// Users

Route::get('/admin/reservations',[ReservationController::class,'adminPage'])->name('reservations.admin');
Route::get('/reservations',[ReservationController::class,'index'])->name('reservations.user');
Route::put('/admin/reservations/{id}',[ReservationController::class,'confirmer'])->name('reservations.confirmer');

Route::get('/animaux', function () {
    return view('users.Animaux');
});
Route::get('/produits', function () {
    return view('users.produits');
});

Route::get('api/reservations',[ReservationController::class,'getData']);
Route::get('api/reservations/{id}',[ReservationController::class,'getDataById']);
Route::post('api/reservations',[ReservationController::class,'store']);
Route::delete('api/reservations/{id}',[ReservationController::class,'destroy']);


Route::get('api/user/id',[ClientController::class,'getUserId']);
