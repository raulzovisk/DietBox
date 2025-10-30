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
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Minha Dieta
                    </h2>
                }
            >
                <Head title="Minha Dieta" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-center text-gray-500">
                                <h3 className="mb-2 text-lg font-semibold text-gray-700">
                                    Nenhuma dieta atribuída
                                </h3>
                                <p>Você ainda não possui uma dieta atribuída por um nutricionista.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    const todayMeals = assignment.diet.daily_meals.filter(
        (meal) => meal.day_of_week === selectedDay
    );

    // Calcular total de calorias do dia
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
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Minha Dieta
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">{assignment.diet.name}</p>
                </div>
            }
        >
            <Head title="Minha Dieta" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Navegação de dias da semana */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    onClick={handlePreviousDay}
                                    className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
                                    type="button"
                                >
                                    <ChevronLeft className="h-6 w-6 text-gray-600" />
                                </button>

                                <div className="flex items-center gap-2 flex-wrap justify-center">
                                    {weekDays.map((day) => (
                                        <button
                                            key={day.value}
                                            onClick={() => setSelectedDay(day.value)}
                                            type="button"
                                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                                selectedDay === day.value
                                                    ? 'bg-amber-600 text-white'
                                                    : day.value === currentDayOfWeek
                                                    ? 'bg-amber-100 text-amber-700'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {day.label.substring(0, 3)}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={handleNextDay}
                                    className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
                                    type="button"
                                >
                                    <ChevronRight className="h-6 w-6 text-gray-600" />
                                </button>
                            </div>

                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-800">
                                    {weekDays.find((d) => d.value === selectedDay)?.label}
                                </h3>
                                {selectedDay === currentDayOfWeek && (
                                    <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                        Hoje
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Total de Calorias */}
                    {totalCalories > 0 && (
                        <div className="mb-6 overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 shadow-sm sm:rounded-lg border-l-4 border-amber-600">
                            <div className="p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total de calorias do dia</p>
                                    <p className="text-3xl font-bold text-amber-600 mt-2">
                                        {totalCalories} kcal
                                    </p>
                                    {assignment.diet.target_calories && (
                                        <p className="text-sm text-gray-600 mt-2">
                                            Meta: {assignment.diet.target_calories} kcal 
                                            <span className={totalCalories > assignment.diet.target_calories ? 'text-red-600 ml-2' : 'text-green-600 ml-2'}>
                                                ({totalCalories - assignment.diet.target_calories > 0 ? '+' : ''}{totalCalories - assignment.diet.target_calories} kcal)
                                            </span>
                                        </p>
                                    )}
                                </div>
                                <Flame className="h-12 w-12 text-orange-500 opacity-50" />
                            </div>
                        </div>
                    )}

                    {/* Refeições do dia */}
                    <div className="space-y-6">
                        {todayMeals.length === 0 ? (
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6 text-center text-gray-500">
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
                                        className="overflow-hidden bg-white shadow-sm sm:rounded-lg"
                                    >
                                        <div className="border-b border-gray-200 bg-amber-50 px-6 py-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                        {meal.meal_type}
                                                    </h3>
                                                    {meal.suggested_time && (
                                                        <p className="text-sm text-gray-600">
                                                            Horário sugerido: {meal.suggested_time}
                                                        </p>
                                                    )}
                                                </div>
                                                {mealCalories > 0 && (
                                                    <div className="text-right">
                                                        <p className="text-xs text-gray-600">Calorias</p>
                                                        <p className="text-lg font-bold text-amber-600">
                                                            {mealCalories} kcal
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="space-y-4">
                                                {meal.meal_foods && meal.meal_foods.length > 0 ? (
                                                    meal.meal_foods.map((mealFood) => {
                                                        const foodCalories = calculateCalories(mealFood);
                                                        return (
                                                            <div
                                                                key={mealFood.id}
                                                                className="rounded-lg border border-gray-200 p-4 hover:border-amber-200 transition-colors"
                                                            >
                                                                <div className="flex items-start justify-between gap-4">
                                                                    <div className="flex-1">
                                                                        <div className="flex items-center gap-2 flex-wrap mb-2">
                                                                            <h4 className="font-semibold text-gray-800 text-base">
                                                                                {mealFood.food?.name || 'Alimento'}
                                                                            </h4>
                                                                            {mealFood.food?.category && (
                                                                                <span className="rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                                                                                    {mealFood.food.category}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        <p className="text-sm text-gray-600 font-medium">
                                                                            {mealFood.quantity} {mealFood.measure?.abbreviation || 'un'}
                                                                        </p>
                                                                        {foodCalories && (
                                                                            <p className="text-sm text-orange-600 font-semibold mt-1">
                                                                                🔥 {foodCalories} kcal
                                                                            </p>
                                                                        )}
                                                                        {mealFood.preparation_notes && (
                                                                            <p className="mt-2 text-sm italic text-gray-500 bg-gray-50 p-2 rounded border border-gray-200">
                                                                                {mealFood.preparation_notes}
                                                                            </p>
                                                                        )}
                                                                    </div>

                                                                    {mealFood.alternatives && mealFood.alternatives.length > 0 && (
                                                                        <button
                                                                            onClick={() => openAlternativesModal(mealFood)}
                                                                            type="button"
                                                                            className="ml-4 rounded bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors whitespace-nowrap border border-blue-200"
                                                                        >
                                                                            💡 Ver alternativas ({mealFood.alternatives.length})
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <p className="text-center text-gray-500">
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
            </div>

            {/* Modal de Alternativas */}
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
