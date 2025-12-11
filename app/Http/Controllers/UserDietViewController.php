<?php

namespace App\Http\Controllers;

use App\Models\DietAssignment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserDietViewController extends Controller
{
    public function index(Request $request): Response
    {
        $user = auth()->user();

        $activeAssignment = DietAssignment::where('user_id', $user->id)
            ->where('is_active', true)
            ->whereHas('diet', function ($query) {
                $query->where('is_active', true);
            })
            ->with([
                'diet.dailyMeals.mealFoods.food',
                'diet.dailyMeals.mealFoods.measure',
                'diet.dailyMeals.mealFoods.alternatives.food',
                'diet.dailyMeals.mealFoods.alternatives.measure',
                'diet.nutritionist',
            ])
            ->latest()
            ->first();

        if (!$activeAssignment) {
            return Inertia::render('MyDiet/Index', [
                'assignment' => null,
                'currentDayOfWeek' => Carbon::now()->dayOfWeek,
                'weekDays' => $this->getWeekDays(),
            ]);
        }

        return Inertia::render('MyDiet/Index', [
            'assignment' => $activeAssignment,
            'currentDayOfWeek' => Carbon::now()->dayOfWeek,
            'weekDays' => $this->getWeekDays(),
        ]);
    }

    public function showDay(Request $request, $dayOfWeek): Response
    {
        $user = auth()->user();

        $activeAssignment = DietAssignment::where('user_id', $user->id)
            ->where('is_active', true)
            ->whereHas('diet', function ($query) {
                $query->where('is_active', true);
            })
            ->with([
                'diet.dailyMeals' => function ($query) use ($dayOfWeek) {
                    $query->where('day_of_week', $dayOfWeek)
                        ->with([
                            'mealFoods.food',
                            'mealFoods.measure',
                            'mealFoods.alternatives.food',
                            'mealFoods.alternatives.measure',
                        ]);
                },
                'diet.nutritionist',
            ])
            ->latest()
            ->first();

        return Inertia::render('MyDiet/DayView', [
            'assignment' => $activeAssignment,
            'selectedDay' => (int) $dayOfWeek,
            'currentDayOfWeek' => Carbon::now()->dayOfWeek,
            'weekDays' => $this->getWeekDays(),
        ]);
    }

    private function getWeekDays(): array
    {
        return [
            ['value' => 0, 'label' => 'Domingo'],
            ['value' => 1, 'label' => 'Segunda-feira'],
            ['value' => 2, 'label' => 'Terça-feira'],
            ['value' => 3, 'label' => 'Quarta-feira'],
            ['value' => 4, 'label' => 'Quinta-feira'],
            ['value' => 5, 'label' => 'Sexta-feira'],
            ['value' => 6, 'label' => 'Sábado'],
        ];
    }
}
