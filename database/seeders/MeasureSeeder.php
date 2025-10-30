<?php

namespace Database\Seeders;

use App\Models\Measure;
use Illuminate\Database\Seeder;

class MeasureSeeder extends Seeder
{
    public function run(): void
    {
        $measures = [
            ['name' => 'Grama', 'abbreviation' => 'g', 'type' => 'weight'],
            ['name' => 'Quilograma', 'abbreviation' => 'kg', 'type' => 'weight'],
            ['name' => 'Miligrama', 'abbreviation' => 'mg', 'type' => 'weight'],
            ['name' => 'Mililitro', 'abbreviation' => 'ml', 'type' => 'volume'],
            ['name' => 'Litro', 'abbreviation' => 'l', 'type' => 'volume'],
            ['name' => 'Colher de sopa', 'abbreviation' => 'col. sopa', 'type' => 'volume'],
            ['name' => 'Colher de chá', 'abbreviation' => 'col. chá', 'type' => 'volume'],
            ['name' => 'Xícara', 'abbreviation' => 'xíc', 'type' => 'volume'],
            ['name' => 'Unidade', 'abbreviation' => 'un', 'type' => 'unit'],
            ['name' => 'Fatia', 'abbreviation' => 'fatia', 'type' => 'unit'],
            ['name' => 'Porção', 'abbreviation' => 'porção', 'type' => 'unit'],
        ];

        foreach ($measures as $measure) {
            Measure::create($measure);
        }
    }
}
