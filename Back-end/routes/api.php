<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
Los metodos de una api son:
- Route::get()  ---------------- Se utiliza para listar y obtener cosas desde la db
- Route::post() ---------------- Se utiliza para ingresar o insertar
- Route::put() ----------------- Se utiliza para editar o 'update'
- Route::delete() -------------- Se utiliza para eliminar cosas
    y estos son nombrados como 'endpoint'
*/

//rutas de region
Route::get('regiones', 'App\Http\Controllers\regionController@getAllRegion');
Route::get('region/{id}', 'App\Http\Controllers\regionController@getRegion');

//rutas de provincia
Route::get('provincias', 'App\Http\Controllers\provinciaController@getAllProvincia');
Route::get('provincia/{id}', 'App\Http\Controllers\provinciaController@getProvincia');
Route::get('provinciaPorRegion/{idRegion}', 'App\Http\Controllers\provinciaController@getProvinciaXRegion');

//rutas de ciudad
Route::get('ciudades', 'App\Http\Controllers\ciudadController@getAllCiudad');
Route::get('ciudad/{id}', 'App\Http\Controllers\ciudadController@getCiudad');
Route::get('ciudadPorProvincia/{idProvincia}', 'App\Http\Controllers\ciudadController@getCiudadXProvincia');

//rutas de calle
Route::get('calles', 'App\Http\Controllers\calleController@getAllCalle');
Route::get('calle/{id}', 'App\Http\Controllers\calleController@getCalle');
Route::post('insertarCalle', 'App\Http\Controllers\calleController@addCalle');
Route::put('actualizarCalle/{id}', 'App\Http\Controllers\calleController@updateCalle');
Route::get('calleCompleta/{idCalle}', 'App\Http\Controllers\calleController@getCalleCompleta');
Route::get('calleCompleta', 'App\Http\Controllers\calleController@getAllCalleCompleta');
