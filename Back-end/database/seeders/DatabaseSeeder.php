<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(regionSeeder::class);
        $this->call(provinciaSeeder::class);
        $this->call(ciudadSeeder::class);
        $this->call(calleSeeder::class);
    }
}
