<?php

namespace App\Http\Controllers;

use App\Models\Diet;
use App\Models\DietAssignment;
use App\Models\Food;
use App\Models\Measure;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DietController extends Controller
{
    use authorizesRequests;
    public function index(): Response
    {
        $user = auth()->user();

        if ($user->isNutritionist()) {
            $diets = Diet::where('nutritionist_id', $user->id)
                ->latest()
                ->paginate(10);
        } elseif ($user->isAdmin()) {
            $diets = Diet::with(['nutritionist'])
                ->latest()
                ->paginate(10);
        } else {
            // Usuários comuns não devem acessar esta rota
            // Redirecionar para my-diet
            return redirect()->route('my-diet.index');
        }

        return Inertia::render('Diets/Index', [
            'diets' => $diets,
        ]);
    }

    public function create(): Response
    {
        $users = User::where('role_id', 1)->get(['id', 'name', 'email']);

        return Inertia::render('Diets/Create', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'target_calories' => 'nullable|integer',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        $diet = Diet::create([
            ...$validated,
            'nutritionist_id' => auth()->id(),
        ]);

        return redirect()->route('diets.show', $diet)
            ->with('success', 'Dieta criada com sucesso!');
    }

    public function show(Diet $diet): Response
    {
        $this->authorize('view', $diet);

        $diet->load([
            'nutritionist',
            'dailyMeals.mealFoods.food',
            'dailyMeals.mealFoods.measure',
            'dailyMeals.mealFoods.alternatives.food',
            'dailyMeals.mealFoods.alternatives.measure',
            'assignments.user',
        ]);

        $users = User::where('role_id', 1)->get(['id', 'name', 'email']);
        $foods = Food::orderBy('name')->get();
        $measures = Measure::orderBy('name')->get();

        return Inertia::render('Diets/Show', [
            'diet' => $diet,
            'users' => $users,
            'foods' => $foods,
            'measures' => $measures,
        ]);
    }



    public function edit(Diet $diet): Response
    {
        $this->authorize('update', $diet);

        $users = User::where('role_id', 1)->get(['id', 'name', 'email']);

        return Inertia::render('Diets/Edit', [
            'diet' => $diet,
            'users' => $users,
        ]);
    }

    public function update(Request $request, Diet $diet)
    {
        $this->authorize('update', $diet);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'target_calories' => 'nullable|integer',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'is_active' => 'boolean',
        ]);

        $diet->update($validated);

        return redirect()->route('diets.show', $diet)
            ->with('success', 'Dieta atualizada com sucesso!');
    }

    public function destroy(Diet $diet)
    {
        $this->authorize('delete', $diet);

        $diet->delete();

        return redirect()->route('diets.index')
            ->with('success', 'Dieta excluída com sucesso!');
    }

    public function assignUser(Request $request, Diet $diet)
    {
        $this->authorize('update', $diet);

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $assignment = DietAssignment::create([
            'user_id' => $validated['user_id'],
            'diet_id' => $diet->id,
            'assigned_date' => now(),
            'is_active' => true,
        ]);

        // Criar notificação para o usuário
        \App\Models\Notification::create([
            'user_id' => $validated['user_id'],
            'type' => 'diet_assigned',
            'message' => 'Uma nova dieta foi atribuída a você: ' . $diet->name,
            'data' => [
                'diet_id' => $diet->id,
                'diet_name' => $diet->name,
            ],
        ]);

        return back()->with('success', 'Dieta atribuída ao usuário com sucesso!');
    }
}
