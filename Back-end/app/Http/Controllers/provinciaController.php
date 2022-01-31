<?php

namespace App\Http\Controllers;

use App\Models\Provincia;

class provinciaController extends Controller
{
    public function getAllProvincia()
    {
        return response()->json(Provincia::all());
    }

    public function getProvincia($id)
    {
        $provincia = Provincia::find($id);
        if (!$provincia) {
            return response()->json(['mensaje' => 'No se encuentra la provincia'], 404);
        }
        return response()->json($provincia, 200);
    }

    public function getProvinciaXRegion($idRegion)
    {
        $provincia = Provincia::where('region', $idRegion)->get();
        return response()->json($provincia, 200);
    }
}
