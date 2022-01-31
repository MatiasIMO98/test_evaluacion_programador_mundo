<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class calleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = now();
        $calles = [
            ['Carrera', 1],
            ['Camarones', 2],
            ['Valle Hondo', 3],
            ['Valdivia', 4],
            ['Avenida Vitacura', 5],
            ['Avenida Recoleta', 6]
        ];
        $calles = array_map(function ($calle) use ($now) {
            return [
                'nombre' => $calle[0],
                'ciudad' => $calle[1],
                'created_at' => $now,
                'updated_at' => $now
            ];
        }, $calles);
        \DB::table('calles')->insert($calles);
    }
}
