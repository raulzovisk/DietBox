<?php

namespace Database\Seeders;

use App\Models\Diet;
use App\Models\DietAssignment;
use App\Models\Food;
use App\Models\FoodAlternative;
use App\Models\Measure;
use App\Models\User;
use Illuminate\Database\Seeder;

class DietSeeder extends Seeder
{
    public function run(): void
    {
        $nutritionist = User::where('role_id', 2)->first();
        $user = User::where('role_id', 1)->first();

        // Criar dieta
        $diet = Diet::create([
            'name' => 'Dieta Balanceada - Perda de Peso',
            'description' => 'Dieta focada em emagrecimento saudável com 1800 calorias por dia',
            'nutritionist_id' => $nutritionist->id,
            'target_calories' => 1800,
            'start_date' => now(),
            'end_date' => now()->addMonths(3),
            'is_active' => true,
        ]);

        // Segunda-feira
        $this->createDayMeals($diet, 1);

        // Terça-feira
        $this->createDayMeals($diet, 2);

        // Quarta-feira
        $this->createDayMeals($diet, 3);

        // Quinta-feira
        $this->createDayMeals($diet, 4);

        // Sexta-feira
        $this->createDayMeals($diet, 5);

        // Sábado
        $this->createDayMeals($diet, 6);

        // Domingo
        $this->createDayMeals($diet, 0);

        // Atribuir dieta ao usuário
        DietAssignment::create([
            'user_id' => $user->id,
            'diet_id' => $diet->id,
            'assigned_date' => now(),
            'is_active' => true,
        ]);

        // Criar notificação
        \App\Models\Notification::create([
            'user_id' => $user->id,
            'type' => 'diet_assigned',
            'message' => 'Uma nova dieta foi atribuída a você: ' . $diet->name,
            'data' => [
                'diet_id' => $diet->id,
                'diet_name' => $diet->name,
            ],
        ]);
    }

    private function createDayMeals(Diet $diet, int $dayOfWeek): void
    {
        $grama = Measure::where('abbreviation', 'g')->first();
        $unidade = Measure::where('abbreviation', 'un')->first();
        $colherSopa = Measure::where('abbreviation', 'col. sopa')->first();

        // Café da manhã
        $cafeManha = $diet->dailyMeals()->create([
            'day_of_week' => $dayOfWeek,
            'meal_type' => 'Café da manhã',
            'suggested_time' => '07:00',
            'order' => 1,
        ]);

        $mealFood1 = $cafeManha->mealFoods()->create([
            'food_id' => Food::where('name', 'Pão integral')->first()->id,
            'quantity' => 2,
            'measure_id' => Measure::where('abbreviation', 'fatia')->first()->id,
            'order' => 1,
        ]);

        $mealFood1->alternatives()->create([
            'food_id' => Food::where('name', 'Tapioca')->first()->id,
            'quantity' => 1,
            'measure_id' => $unidade->id,
        ]);

        $cafeManha->mealFoods()->create([
            'food_id' => Food::where('name', 'Ovo')->first()->id,
            'quantity' => 2,
            'measure_id' => $unidade->id,
            'preparation_notes' => 'Mexido ou cozido',
            'order' => 2,
        ]);

        // Almoço
        $almoco = $diet->dailyMeals()->create([
            'day_of_week' => $dayOfWeek,
            'meal_type' => 'Almoço',
            'suggested_time' => '12:00',
            'order' => 2,
        ]);

        $mealFood2 = $almoco->mealFoods()->create([
            'food_id' => Food::where('name', 'Picanha')->first()->id,
            'quantity' => 150,
            'measure_id' => $grama->id,
            'preparation_notes' => 'Grelhada',
            'order' => 1,
        ]);

        $mealFood2->alternatives()->create([
            'food_id' => Food::where('name', 'Alcatra')->first()->id,
            'quantity' => 150,
            'measure_id' => $grama->id,
            'notes' => 'Corte mais magro',
        ]);

        $mealFood2->alternatives()->create([
            'food_id' => Food::where('name', 'Frango grelhado')->first()->id,
            'quantity' => 150,
            'measure_id' => $grama->id,
            'notes' => 'Opção mais leve',
        ]);

        $almoco->mealFoods()->create([
            'food_id' => Food::where('name', 'Arroz integral')->first()->id,
            'quantity' => 4,
            'measure_id' => $colherSopa->id,
            'order' => 2,
        ]);

        $almoco->mealFoods()->create([
            'food_id' => Food::where('name', 'Brócolis')->first()->id,
            'quantity' => 100,
            'measure_id' => $grama->id,
            'preparation_notes' => 'Cozido no vapor',
            'order' => 3,
        ]);

        // Lanche da tarde
        $lanche = $diet->dailyMeals()->create([
            'day_of_week' => $dayOfWeek,
            'meal_type' => 'Lanche da tarde',
            'suggested_time' => '16:00',
            'order' => 3,
        ]);

        $mealFood3 = $lanche->mealFoods()->create([
            'food_id' => Food::where('name', 'Banana')->first()->id,
            'quantity' => 1,
            'measure_id' => $unidade->id,
            'order' => 1,
        ]);

        $mealFood3->alternatives()->create([
            'food_id' => Food::where('name', 'Maçã')->first()->id,
            'quantity' => 1,
            'measure_id' => $unidade->id,
        ]);

        $lanche->mealFoods()->create([
            'food_id' => Food::where('name', 'Aveia')->first()->id,
            'quantity' => 2,
            'measure_id' => $colherSopa->id,
            'order' => 2,
        ]);

        // Jantar
        $jantar = $diet->dailyMeals()->create([
            'day_of_week' => $dayOfWeek,
            'meal_type' => 'Jantar',
            'suggested_time' => '19:00',
            'order' => 4,
        ]);

        $mealFood4 = $jantar->mealFoods()->create([
            'food_id' => Food::where('name', 'Salmão')->first()->id,
            'quantity' => 120,
            'measure_id' => $grama->id,
            'preparation_notes' => 'Assado',
            'order' => 1,
        ]);

        $mealFood4->alternatives()->create([
            'food_id' => Food::where('name', 'Tilápia')->first()->id,
            'quantity' => 120,
            'measure_id' => $grama->id,
        ]);

        $jantar->mealFoods()->create([
            'food_id' => Food::where('name', 'Batata doce')->first()->id,
            'quantity' => 100,
            'measure_id' => $grama->id,
            'preparation_notes' => 'Assada',
            'order' => 2,
        ]);

        $jantar->mealFoods()->create([
            'food_id' => Food::where('name', 'Alface')->first()->id,
            'quantity' => 50,
            'measure_id' => $grama->id,
            'preparation_notes' => 'Salada',
            'order' => 3,
        ]);
    }
}
