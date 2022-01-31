<?php

namespace App\Http\Controllers;

use App\Models\Ciudad;

class ciudadController extends Controller
{
    public function getAllCiudad()
    {
        return response()->json(Ciudad::all());
    }

    public function getCiudad($id)
    {
        $ciudad = Ciudad::find($id);
        if (!$ciudad) {
            return response()->json(['mensaje' => 'No se encuentra la ciudad'], 404);
        }
        return response()->json($ciudad, 200);
    }

    public function getCiudadXProvincia($idProvincia)
    {
        $ciudad = Ciudad::where('provincia', $idProvincia)->get();
        return response()->json($ciudad, 200);
    }
}
