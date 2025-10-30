<?php

namespace Database\Seeders;

use App\Models\Food;
use Illuminate\Database\Seeder;

class FoodSeeder extends Seeder
{
    public function run(): void
    {
        $foods = [
            // Proteínas
            ['name' => 'Picanha', 'category' => 'Proteína', 'calories_per_100g' => 250, 'protein_per_100g' => 26, 'carbs_per_100g' => 0, 'fat_per_100g' => 17],
            ['name' => 'Alcatra', 'category' => 'Proteína', 'calories_per_100g' => 210, 'protein_per_100g' => 27, 'carbs_per_100g' => 0, 'fat_per_100g' => 11],
            ['name' => 'Frango grelhado', 'category' => 'Proteína', 'calories_per_100g' => 165, 'protein_per_100g' => 31, 'carbs_per_100g' => 0, 'fat_per_100g' => 3.6],
            ['name' => 'Peito de peru', 'category' => 'Proteína', 'calories_per_100g' => 135, 'protein_per_100g' => 30, 'carbs_per_100g' => 0, 'fat_per_100g' => 1],
            ['name' => 'Salmão', 'category' => 'Proteína', 'calories_per_100g' => 208, 'protein_per_100g' => 20, 'carbs_per_100g' => 0, 'fat_per_100g' => 13],
            ['name' => 'Tilápia', 'category' => 'Proteína', 'calories_per_100g' => 128, 'protein_per_100g' => 26, 'carbs_per_100g' => 0, 'fat_per_100g' => 2.7],
            ['name' => 'Ovo', 'category' => 'Proteína', 'calories_per_100g' => 155, 'protein_per_100g' => 13, 'carbs_per_100g' => 1.1, 'fat_per_100g' => 11],

            // Carboidratos
            ['name' => 'Arroz integral', 'category' => 'Carboidrato', 'calories_per_100g' => 123, 'protein_per_100g' => 2.6, 'carbs_per_100g' => 25.8, 'fat_per_100g' => 1],
            ['name' => 'Arroz branco', 'category' => 'Carboidrato', 'calories_per_100g' => 130, 'protein_per_100g' => 2.7, 'carbs_per_100g' => 28, 'fat_per_100g' => 0.3],
            ['name' => 'Batata doce', 'category' => 'Carboidrato', 'calories_per_100g' => 86, 'protein_per_100g' => 1.6, 'carbs_per_100g' => 20, 'fat_per_100g' => 0.1],
            ['name' => 'Macarrão integral', 'category' => 'Carboidrato', 'calories_per_100g' => 124, 'protein_per_100g' => 5, 'carbs_per_100g' => 26, 'fat_per_100g' => 0.5],
            ['name' => 'Pão integral', 'category' => 'Carboidrato', 'calories_per_100g' => 247, 'protein_per_100g' => 13, 'carbs_per_100g' => 41, 'fat_per_100g' => 3.4],
            ['name' => 'Tapioca', 'category' => 'Carboidrato', 'calories_per_100g' => 358, 'protein_per_100g' => 0.6, 'carbs_per_100g' => 88, 'fat_per_100g' => 0.02],
            ['name' => 'Aveia', 'category' => 'Carboidrato', 'calories_per_100g' => 389, 'protein_per_100g' => 17, 'carbs_per_100g' => 66, 'fat_per_100g' => 7],

            // Vegetais
            ['name' => 'Brócolis', 'category' => 'Vegetal', 'calories_per_100g' => 34, 'protein_per_100g' => 2.8, 'carbs_per_100g' => 7, 'fat_per_100g' => 0.4],
            ['name' => 'Couve-flor', 'category' => 'Vegetal', 'calories_per_100g' => 25, 'protein_per_100g' => 1.9, 'carbs_per_100g' => 5, 'fat_per_100g' => 0.3],
            ['name' => 'Alface', 'category' => 'Vegetal', 'calories_per_100g' => 15, 'protein_per_100g' => 1.4, 'carbs_per_100g' => 2.9, 'fat_per_100g' => 0.2],
            ['name' => 'Tomate', 'category' => 'Vegetal', 'calories_per_100g' => 18, 'protein_per_100g' => 0.9, 'carbs_per_100g' => 3.9, 'fat_per_100g' => 0.2],
            ['name' => 'Cenoura', 'category' => 'Vegetal', 'calories_per_100g' => 41, 'protein_per_100g' => 0.9, 'carbs_per_100g' => 10, 'fat_per_100g' => 0.2],
            ['name' => 'Abobrinha', 'category' => 'Vegetal', 'calories_per_100g' => 17, 'protein_per_100g' => 1.2, 'carbs_per_100g' => 3.1, 'fat_per_100g' => 0.3],

            // Frutas
            ['name' => 'Banana', 'category' => 'Fruta', 'calories_per_100g' => 89, 'protein_per_100g' => 1.1, 'carbs_per_100g' => 23, 'fat_per_100g' => 0.3],
            ['name' => 'Maçã', 'category' => 'Fruta', 'calories_per_100g' => 52, 'protein_per_100g' => 0.3, 'carbs_per_100g' => 14, 'fat_per_100g' => 0.2],
            ['name' => 'Mamão', 'category' => 'Fruta', 'calories_per_100g' => 43, 'protein_per_100g' => 0.5, 'carbs_per_100g' => 11, 'fat_per_100g' => 0.3],
            ['name' => 'Morango', 'category' => 'Fruta', 'calories_per_100g' => 32, 'protein_per_100g' => 0.7, 'carbs_per_100g' => 7.7, 'fat_per_100g' => 0.3],
            ['name' => 'Abacate', 'category' => 'Fruta', 'calories_per_100g' => 160, 'protein_per_100g' => 2, 'carbs_per_100g' => 9, 'fat_per_100g' => 15],
        ];

        foreach ($foods as $food) {
            Food::create($food);
        }
    }
}
