<?php

namespace App\Http\Controllers;

use App\Models\Food;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FoodController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Food::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('category', 'like', "%{$search}%");
        }

        if ($request->has('category') && $request->get('category')) {
            $query->where('category', $request->get('category'));
        }

        $foods = $query->orderBy('name')->paginate(20);

        return Inertia::render('Foods/Index', [
            'foods' => $foods,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Foods/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'calories_per_100g' => 'nullable|integer',
            'protein_per_100g' => 'nullable|numeric',
            'carbs_per_100g' => 'nullable|numeric',
            'fat_per_100g' => 'nullable|numeric',
            'category' => 'nullable|string|max:255',
        ]);

        Food::create($validated);

        return redirect()->route('foods.index')
            ->with('success', 'Alimento cadastrado com sucesso!');
    }

    public function edit(Food $food): Response
    {
        return Inertia::render('Foods/Edit', [
            'food' => $food,
        ]);
    }

    public function update(Request $request, Food $food)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'calories_per_100g' => 'nullable|integer',
            'protein_per_100g' => 'nullable|numeric',
            'carbs_per_100g' => 'nullable|numeric',
            'fat_per_100g' => 'nullable|numeric',
            'category' => 'nullable|string|max:255',
        ]);

        $food->update($validated);

        return redirect()->route('foods.index')
            ->with('success', 'Alimento atualizado com sucesso!');
    }

    public function destroy(Food $food)
    {
        $food->delete();

        return redirect()->route('foods.index')
            ->with('success', 'Alimento excluído com sucesso!');
    }
}
