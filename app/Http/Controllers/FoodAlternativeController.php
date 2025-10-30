<?php

namespace App\Http\Controllers;

use App\Models\Food;
use App\Models\FoodAlternative;
use App\Models\Measure;
use App\Models\MealFood;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FoodAlternativeController extends Controller
{
    use AuthorizesRequests;
    public function create(MealFood $mealFood): Response
    {

        $this->authorize('update', $mealFood->dailyMeal->diet);

        $foods = Food::where('id', '!=', $mealFood->food_id)
            ->orderBy('name')
            ->get();
        $measures = Measure::orderBy('name')->get();

        return Inertia::render('FoodAlternatives/Create', [
            'mealFood' => $mealFood->load('food', 'measure'),
            'foods' => $foods,
            'measures' => $measures,
        ]);
    }

    public function store(Request $request, MealFood $mealFood)
    {
        $this->authorize('update', $mealFood->dailyMeal->diet);

        $validated = $request->validate([
            'food_id' => 'required|exists:foods,id',
            'quantity' => 'required|numeric|min:0',
            'measure_id' => 'required|exists:measures,id',
            'notes' => 'nullable|string',
        ]);

        $mealFood->alternatives()->create($validated);

        return back()->with('success', 'Alternativa adicionada com sucesso!');
    }

    public function destroy(FoodAlternative $foodAlternative)
    {
        $this->authorize('delete', $foodAlternative);

        $foodAlternative->delete();

        return response()->json(['message' => 'Alternativa deletada com sucesso'], 200);
    }
}
