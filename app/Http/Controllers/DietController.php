<?php

namespace App\Http\Controllers;

use App\Models\Diet;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DietController extends Controller
{
    use AuthorizesRequests;
    public function index()
    {
        $user = auth()->user();

        $diets = Diet::with(['nutritionist', 'assignments.user'])
            ->when($user->role_id === 2, function ($query) use ($user) {
                $query->where('nutritionist_id', $user->id);
            })
            ->when($user->role_id === 3, function ($query) {
                return $query;
            })
            ->latest()
            ->get();

        return Inertia::render('Diets/Index', [
            'diets' => $diets,
        ]);
    }



    public function create()
    {
        return Inertia::render('Diets/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'target_calories' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        $validated['nutritionist_id'] = auth()->id();
        $validated['is_active'] = $request->has('is_active') ? (bool) $validated['is_active'] : false;

        $diet = Diet::create($validated);

        return redirect()->route('diets.show', $diet)->with('success', 'Dieta criada com sucesso!');
    }

    public function show(Diet $diet)
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

        //  Buscar usuários comuns (role_id = 1)
        $users = User::where('role_id', 1)->get();

        //  Buscar todos os alimentos e medidas
        $foods = \App\Models\Food::orderBy('name')->get();
        $measures = \App\Models\Measure::orderBy('name')->get();

        return Inertia::render('Diets/Show', [
            'diet' => $diet,
            'users' => $users,
            'foods' => $foods,
            'measures' => $measures,
        ]);
    }

    public function edit(Diet $diet)
    {
        $this->authorize('update', $diet);

        return Inertia::render('Diets/Edit', [
            'diet' => $diet,
        ]);
    }

    public function update(Request $request, Diet $diet)
    {
        $this->authorize('update', $diet);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'target_calories' => 'nullable|integer|min:0',
            'is_active' => 'nullable|boolean',
        ]);

        $validated['is_active'] = $request->has('is_active') ? (bool) $validated['is_active'] : false;

        $diet->update($validated);

        // ✅ Verificar parâmetro 'from' na query string
        $from = $request->query('from');

        if ($from === 'show') {
            return redirect()->route('diets.show', $diet)->with('success', 'Dieta atualizada com sucesso!');
        }

        return redirect()->route('diets.index')->with('success', 'Dieta atualizada com sucesso!');
    }


    public function assignUser(Request $request, Diet $diet)
    {
        $this->authorize('update', $diet);

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $user = User::findOrFail($validated['user_id']);

        // Verificar se o usuário já tem uma dieta ATIVA atribuída
        $existingActiveAssignment = $user->dietAssignments()
            ->whereHas('diet', function ($query) {
                $query->where('is_active', true);
            })
            ->with('diet')
            ->first();

        if ($existingActiveAssignment) {
            return back()->withErrors([
                'user_id' => "⚠️ {$user->name} já possui uma dieta ativa: \"{$existingActiveAssignment->diet->name}\". Desative-a ou remova a atribuição antes de atribuir outra dieta ativa.",
            ]);
        }

        // Verificar se já está atribuído a esta dieta especificamente
        $alreadyAssigned = $diet->assignments()->where('user_id', $validated['user_id'])->exists();

        if ($alreadyAssigned) {
            return back()->withErrors([
                'user_id' => 'Este usuário já está atribuído a esta dieta.',
            ]);
        }

        // Se a dieta não é ativa, pode atribuir mesmo que tenha outras dietas
        if (!$diet->is_active) {
            $diet->assignments()->create([
                'user_id' => $validated['user_id'],
                'assigned_date' => now(),
            ]);

            return back()->with('success', "✅ {$user->name} atribuído à dieta inativa com sucesso!");
        }

        // Se a dieta é ativa e não tem conflito, atribuir
        $diet->assignments()->create([
            'user_id' => $validated['user_id'],
            'assigned_date' => now(),
        ]);

        return back()->with('success', "✅ {$user->name} atribuído com sucesso!");
    }


    public function unassignUser(Diet $diet, $assignmentId)
    {
        $this->authorize('update', $diet);

        $assignment = $diet->assignments()->findOrFail($assignmentId);
        $userName = $assignment->user->name;

        $assignment->delete();

        if (request()->expectsJson()) {
            return response()->json([
                'message' => "Usuário {$userName} removido da dieta com sucesso!",
                'success' => true,
            ], 200);
        }

        return back()->with('success', "Usuário {$userName} removido da dieta com sucesso!");
    }

    public function toggleStatus(Diet $diet)
    {
        $diet->update([
            'is_active' => !$diet->is_active
        ]);

        return back()->with('success', 'Status da dieta atualizado com sucesso!');
    }
}
