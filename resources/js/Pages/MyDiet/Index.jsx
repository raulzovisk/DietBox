import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AlternativesModal from '@/Components/AlternativesModal';
import { calculateCalories } from '@/Utils/calorieCalculator';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { useState } from 'react';

export default function Index({ assignment, currentDayOfWeek, weekDays }) {
    const [selectedDay, setSelectedDay] = useState(currentDayOfWeek);
    const [selectedMealFood, setSelectedMealFood] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!assignment) {
        return (
            <AuthenticatedLayout>
                <Head title="Minha Dieta" />

                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
                        <div className="p-8 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 mx-auto mb-4">
                                <Flame className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
                                Nenhuma dieta atribuída
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400">
                                Você ainda não possui uma dieta atribuída por um nutricionista.
                            </p>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    const todayMeals = assignment.diet.daily_meals.filter(
        (meal) => meal.day_of_week === selectedDay
    );

    const totalCalories = todayMeals.reduce((total, meal) => {
        const mealCalories = (meal.meal_foods || []).reduce((sum, mf) => {
            return sum + (calculateCalories(mf) || 0);
        }, 0);
        return total + mealCalories;
    }, 0);

    const handlePreviousDay = () => {
        setSelectedDay((prev) => (prev === 0 ? 6 : prev - 1));
    };

    const handleNextDay = () => {
        setSelectedDay((prev) => (prev === 6 ? 0 : prev + 1));
    };

    const openAlternativesModal = (mealFood) => {
        setSelectedMealFood(mealFood);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMealFood(null);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Minha Dieta" />

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                            Minha Dieta
                        </h1>
                        <p className="mt-1 text-slate-500 dark:text-slate-400">{assignment.diet.name}</p>
                    </div>
                </div>

                {/* Day Navigation */}
                <div className="rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6 transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-4">
                        <button
                            onClick={handlePreviousDay}
                            className="flex items-center justify-center h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            type="button"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center flex-1 overflow-x-auto">
                            {weekDays.map((day) => (
                                <button
                                    key={day.value}
                                    onClick={() => setSelectedDay(day.value)}
                                    type="button"
                                    className={`px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${selectedDay === day.value
                                            ? 'bg-vivid-tangerine-500 text-white shadow-md shadow-vivid-tangerine-500/25'
                                            : day.value === currentDayOfWeek
                                                ? 'bg-vivid-tangerine-100 dark:bg-vivid-tangerine-500/20 text-vivid-tangerine-700 dark:text-vivid-tangerine-400'
                                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                                        }`}
                                >
                                    <span className="hidden sm:inline">{day.label.substring(0, 3)}</span>
                                    <span className="sm:hidden">{day.label.substring(0, 1)}</span>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleNextDay}
                            className="flex items-center justify-center h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            type="button"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="text-center">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                            {weekDays.find((d) => d.value === selectedDay)?.label}
                        </h3>
                        {selectedDay === currentDayOfWeek && (
                            <span className="mt-2 inline-block rounded-full bg-green-100 dark:bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-400">
                                Hoje
                            </span>
                        )}
                    </div>
                </div>

                {/* Calories Summary */}
                {totalCalories > 0 && (
                    <div className="rounded-2xl bg-gradient-to-r from-vivid-tangerine-500/10 to-orange-500/10 dark:from-vivid-tangerine-500/20 dark:to-orange-500/20 border border-vivid-tangerine-200 dark:border-vivid-tangerine-500/30 p-4 sm:p-6 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total de calorias do dia</p>
                                <p className="text-2xl sm:text-3xl font-bold text-vivid-tangerine-600 dark:text-vivid-tangerine-400 mt-1">
                                    {totalCalories} kcal
                                </p>
                                {assignment.diet.target_calories && (
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                                        Meta: {assignment.diet.target_calories} kcal
                                        <span className={`ml-2 font-semibold ${totalCalories > assignment.diet.target_calories ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                            ({totalCalories - assignment.diet.target_calories > 0 ? '+' : ''}{totalCalories - assignment.diet.target_calories} kcal)
                                        </span>
                                    </p>
                                )}
                            </div>
                            <Flame className="h-10 w-10 sm:h-12 sm:w-12 text-vivid-tangerine-500/50" />
                        </div>
                    </div>
                )}

                {/* Meals */}
                <div className="space-y-4">
                    {todayMeals.length === 0 ? (
                        <div className="rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
                            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                                Nenhuma refeição cadastrada para este dia.
                            </div>
                        </div>
                    ) : (
                        todayMeals.map((meal) => {
                            const mealCalories = (meal.meal_foods || []).reduce((sum, mf) => {
                                return sum + (calculateCalories(mf) || 0);
                            }, 0);

                            return (
                                <div
                                    key={meal.id}
                                    className="rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors"
                                >
                                    <div className="bg-slate-50 dark:bg-slate-700/50 px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100">
                                                    {meal.meal_type}
                                                </h3>
                                                {meal.suggested_time && (
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                                        Horário sugerido: {meal.suggested_time}
                                                    </p>
                                                )}
                                            </div>
                                            {mealCalories > 0 && (
                                                <div className="text-right">
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Calorias</p>
                                                    <p className="text-base sm:text-lg font-bold text-vivid-tangerine-600 dark:text-vivid-tangerine-400">
                                                        {mealCalories} kcal
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-4 sm:p-6">
                                        <div className="space-y-3">
                                            {meal.meal_foods && meal.meal_foods.length > 0 ? (
                                                meal.meal_foods.map((mealFood) => {
                                                    const foodCalories = calculateCalories(mealFood);
                                                    return (
                                                        <div
                                                            key={mealFood.id}
                                                            className="rounded-xl border border-slate-200 dark:border-slate-600 p-4 hover:border-vivid-tangerine-300 dark:hover:border-vivid-tangerine-500/50 transition-colors bg-white dark:bg-slate-800"
                                                        >
                                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 flex-wrap mb-2">
                                                                        <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-base">
                                                                            {mealFood.food?.name || 'Alimento'}
                                                                        </h4>
                                                                        {mealFood.food?.category && (
                                                                            <span className="rounded-full bg-vivid-tangerine-100 dark:bg-vivid-tangerine-500/20 px-2 py-0.5 text-xs font-medium text-vivid-tangerine-700 dark:text-vivid-tangerine-400">
                                                                                {mealFood.food.category}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                                                        {mealFood.quantity} {mealFood.measure?.abbreviation || 'un'}
                                                                    </p>
                                                                    {foodCalories && (
                                                                        <p className="text-sm text-vivid-tangerine-600 dark:text-vivid-tangerine-400 font-semibold mt-1">
                                                                            🔥 {foodCalories} kcal
                                                                        </p>
                                                                    )}
                                                                    {mealFood.preparation_notes && (
                                                                        <p className="mt-2 text-sm italic text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg border border-slate-200 dark:border-slate-600">
                                                                            {mealFood.preparation_notes}
                                                                        </p>
                                                                    )}
                                                                </div>

                                                                {mealFood.alternatives && mealFood.alternatives.length > 0 && (
                                                                    <button
                                                                        onClick={() => openAlternativesModal(mealFood)}
                                                                        type="button"
                                                                        className="rounded-lg bg-sky-50 dark:bg-sky-500/10 px-3 py-2 text-xs font-semibold text-sky-700 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-colors whitespace-nowrap border border-sky-200 dark:border-sky-500/30"
                                                                    >
                                                                        💡 Ver alternativas ({mealFood.alternatives.length})
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <p className="text-center text-slate-500 dark:text-slate-400 py-4">
                                                    Nenhum alimento nesta refeição
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Alternatives Modal */}
            {selectedMealFood && (
                <AlternativesModal
                    mealFood={selectedMealFood}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </AuthenticatedLayout>
    );
}
