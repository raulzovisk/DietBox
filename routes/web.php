<?php

use App\Http\Controllers\DailyMealController;
use App\Http\Controllers\DietController;
use App\Http\Controllers\FoodAlternativeController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\MealFoodController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserDietViewController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/test', function () {
    return Inertia::render('Test');
});

// Rotas autenticadas
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Perfil
    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // Visualização de dieta para usuários comuns
    Route::prefix('my-diet')->name('my-diet.')->group(function () {
        Route::get('/', [UserDietViewController::class, 'index'])->name('index');
        Route::get('/day/{dayOfWeek}', [UserDietViewController::class, 'showDay'])->name('day');
    });

    // Notificações
    Route::prefix('notifications')->name('notifications.')->group(function () {
        Route::get('/', [NotificationController::class, 'index'])->name('index');
        Route::patch('/{notification}/read', [NotificationController::class, 'markAsRead'])->name('read');
        Route::post('/mark-all-read', [NotificationController::class, 'markAllAsRead'])->name('mark-all-read');
    });

    Route::delete('/meal-foods/{mealFood}', [MealFoodController::class, 'destroy'])->name('meal-foods.destroy');
    Route::patch('/meal-foods/{mealFood}', [MealFoodController::class, 'update'])->name('meal-foods.update');
    Route::post('/meal-foods/{mealFood}/alternatives', [MealFoodController::class, 'storeAlternative'])->name('meal-foods.alternatives.store');

    Route::delete('/food-alternatives/{foodAlternative}', [FoodAlternativeController::class, 'destroy'])->name('food-alternatives.destroy');

    // Gerenciamento de dietas (Nutricionistas e Admins)
    Route::middleware('role:nutritionist,admin')->group(function () {
        Route::resource('diets', DietController::class)->except(['destroy']);
        Route::post('/diets/{diet}/assign', [DietController::class, 'assignUser'])->name('diets.assign');
        Route::delete('/diets/{diet}/unassign/{assignment}', [DietController::class, 'unassignUser'])->name('diets.unassign');
         Route::patch('/diets/{diet}/toggle-status', [DietController::class, 'toggleStatus'])->name('diets.toggle-status');

        // Refeições diárias
        Route::prefix('diets/{diet}/meals')->name('daily-meals.')->group(function () {
            Route::get('/create', [DailyMealController::class, 'create'])->name('create');
            Route::post('/', [DailyMealController::class, 'store'])->name('store');
        });

        Route::prefix('daily-meals/{dailyMeal}')->name('daily-meals.')->group(function () {
            Route::patch('/', [DailyMealController::class, 'update'])->name('update');
            Route::delete('/', [DailyMealController::class, 'destroy'])->name('destroy');

            // Alimentos da refeição
            Route::prefix('foods')->name('meal-foods.')->group(function () {
                Route::get('/create', [MealFoodController::class, 'create'])->name('create');
                Route::post('/', [MealFoodController::class, 'store'])->name('store');
            });
        });

        // Gerenciamento de alimentos
        Route::resource('foods', FoodController::class);
    });
});

require __DIR__ . '/auth.php';
