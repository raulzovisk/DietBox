<?php

namespace App\Http\Controllers;

use App\Models\DailyMeal;
use App\Models\Diet;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DailyMealController extends Controller
{
    use AuthorizesRequests;
    public function create(Diet $diet): Response
    {
        $this->authorize('update', $diet);

        return Inertia::render('DailyMeals/Create', [
            'diet' => $diet,
        ]);
    }

    public function store(Request $request, Diet $diet)
    {
        $this->authorize('update', $diet);

        $validated = $request->validate([
            'day_of_week' => 'required|integer|between:0,6',
            'meal_type' => 'required|string',
            'suggested_time' => 'nullable|date_format:H:i',
        ]);

        $dailyMeal = $diet->dailyMeals()->create($validated);

        return back()->with('success', 'Refeição adicionada com sucesso!');
    }

    public function update(Request $request, DailyMeal $dailyMeal)
    {
        $this->authorize('update', $dailyMeal->diet);

        $validated = $request->validate([
            'day_of_week' => 'required|integer|between:0,6',
            'meal_type' => 'required|string',
            'suggested_time' => 'nullable|date_format:H:i',
            'order' => 'nullable|integer',
        ]);

        $dailyMeal->update($validated);

        return back()->with('success', 'Refeição atualizada com sucesso!');
    }

    public function destroy(DailyMeal $dailyMeal)
    {
        $this->authorize('update', $dailyMeal->diet);

        $dailyMeal->delete();

        return back()->with('success', 'Refeição excluída com sucesso!');
    }
}
