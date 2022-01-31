<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class provinciaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $now = now();
        $provincias = [
            ['Arica', 1],
            ['Concepcion', 2],
            ['Santiago', 3]
        ];
        $provincias = array_map(function ($provincia) use ($now) {
            return [
                'nombre' => $provincia[0],
                'region' => $provincia[1],
                'created_at' => $now,
                'updated_at' => $now
            ];
        }, $provincias);
        \DB::table('provincias')->insert($provincias);
    }
}
