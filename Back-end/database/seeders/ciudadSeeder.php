<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ciudadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = now();
        $ciudads = [
            ['Putre', 1],
            ['Camarones', 1],
            ['Coronel', 2],
            ['Talcahuano', 2],
            ['Vitacura', 3],
            ['Recoleta', 3]
        ];
        $ciudads = array_map(function ($ciudad) use ($now) {
            return [
                'nombre' => $ciudad[0],
                'provincia' => $ciudad[1],
                'created_at' => $now,
                'updated_at' => $now
            ];
        }, $ciudads);
        \DB::table('ciudads')->insert($ciudads);
    }
}
