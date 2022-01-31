<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Calle;
use App\Models\Ciudad;
use App\Models\Provincia;
use App\Models\Region;

class calleController extends Controller
{
    public function getAllCalle()
    {
        return response()->json(Calle::all());
    }

    public function getCalle($id)
    {
        $calle = Calle::find($id);
        if (!$calle) {
            return response()->json(['mensaje' => 'No se encuentra la calle'], 404);
        }
        return response()->json($calle, 200);
    }

    public function addCalle(Request $request)
    {
        $calle = new Calle();
        $calle->nombre = $request->input('nombre');
        $calle->ciudad = $request->input('ciudad');
        $calle->save();
        return response()->json($calle, 201);
    }

    public function updateCalle(Request $request, $id)
    {
        $calle = Calle::find($id);
        if (!$calle) {
            return response()->json(['mensaje' => 'No se encuentra la calle'], 404);
        }
        $calle->nombre = $request->input('nombre');
        $calle->ciudad = $request->input('ciudad');
        $calle->save();
        return response()->json($calle, 200);
    }

    public function getCalleCompleta($idRegion)
    {
        $calleCompleta = Calle::join('ciudads', 'ciudad', '=', 'ciudads.id')
            ->join('provincias', 'ciudads.provincia', '=', 'provincias.id')
            ->join('regions', 'provincias.region', '=', 'regions.id')
            ->select(
                'calles.*',
                'ciudads.nombre as nombreCiudad',
                'ciudads.id as ciudad',
                'provincias.nombre as nombreProvincia',
                'provincias.id as provincia',
                'regions.nombre as nombreRegion',
                'regions.id as region'
            )
            ->where('calles.id', $idRegion)
            ->orderBy('calles.id', 'asc')
            ->get();

        return response()->json($calleCompleta, 200);
    }

    public function getAllCalleCompleta()
    {
        $calleCompleta = Calle::join('ciudads', 'ciudad', '=', 'ciudads.id')
            ->join('provincias', 'ciudads.provincia', '=', 'provincias.id')
            ->join('regions', 'provincias.region', '=', 'regions.id')
            ->select(
                'calles.*',
                'ciudads.nombre as nombreCiudad',
                'ciudads.id as ciudad',
                'provincias.nombre as nombreProvincia',
                'provincias.id as provincia',
                'regions.nombre as nombreRegion',
                'regions.id as region'
            )
            ->orderBy('calles.id', 'asc')
            ->get();

        return response()->json($calleCompleta, 200);
    }
}
