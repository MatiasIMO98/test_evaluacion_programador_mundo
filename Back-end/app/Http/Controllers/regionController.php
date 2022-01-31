<?php

namespace App\Http\Controllers;

use App\Models\Region;

class regionController extends Controller
{
    public function getAllRegion()
    {
        return response()->json(Region::all());
    }

    public function getRegion($id)
    {
        $region = Region::find($id);
        if (!$region) {
            return response()->json(['mensaje' => 'No se encuentra la region'], 404);
        }
        return response()->json($region, 200);
    }
}
