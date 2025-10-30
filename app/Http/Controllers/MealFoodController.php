<?php

namespace App\Http\Controllers;

use App\Models\DailyMeal;
use App\Models\Food;
use App\Models\Measure;
use App\Models\MealFood;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MealFoodController extends Controller
{
    use AuthorizesRequests;
    public function create(DailyMeal $dailyMeal): Response
    {
        $this->authorize('update', $dailyMeal->diet);

        $foods = Food::orderBy('name')->get();
        $measures = Measure::orderBy('name')->get();

        return Inertia::render('MealFoods/Create', [
            'dailyMeal' => $dailyMeal,
            'foods' => $foods,
            'measures' => $measures,
        ]);
    }

    public function store(Request $request, DailyMeal $dailyMeal)
    {
        $this->authorize('update', $dailyMeal->diet);

        $validated = $request->validate([
            'food_id' => 'required|exists:foods,id',
            'quantity' => 'required|numeric|min:0',
            'measure_id' => 'required|exists:measures,id',
            'preparation_notes' => 'nullable|string',
        ]);

        $dailyMeal->mealFoods()->create($validated);

        return back()->with('success', 'Alimento adicionado à refeição!');
    }

    public function update(Request $request, MealFood $mealFood)
    {
        $this->authorize('update', $mealFood->dailyMeal->diet);

        $validated = $request->validate([
            'food_id' => 'required|exists:foods,id',
            'quantity' => 'required|numeric|min:0',
            'measure_id' => 'required|exists:measures,id',
            'preparation_notes' => 'nullable|string',
        ]);

        $mealFood->update($validated);

        return back()->with('success', 'Alimento atualizado com sucesso!');
    }

    public function destroy(MealFood $mealFood)
    {
        $this->authorize('update', $mealFood->dailyMeal->diet);

        $mealFood->delete();

        return back()->with('success', 'Alimento removido!');
    }

    public function storeAlternative(Request $request, MealFood $mealFood)
    {
        $this->authorize('update', $mealFood->dailyMeal->diet);

        $validated = $request->validate([
            'food_id' => 'required|exists:foods,id',
            'quantity' => 'required|numeric|min:0',
            'measure_id' => 'required|exists:measures,id',
            'notes' => 'nullable|string',
        ]);

        $mealFood->alternatives()->create($validated);

        return back()->with('success', 'Alternativa adicionada!');
    }
}
