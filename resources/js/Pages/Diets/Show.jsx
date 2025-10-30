import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import AlternativesModal from '@/Components/AlternativesModal';
import AddMealModal from '@/Components/AddMealModal';
import AddFoodToMealModal from '@/Components/AddFoodToMealModal';
import { calculateCalories } from '@/Utils/calorieCalculator';
import EditFoodModal from '@/Components/EditFoodModal';
import { showSuccess } from '@/Utils/toast';
import { ArrowLeft, Flame, Users, X, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Show({ diet, auth, users, foods, measures }) {
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedMealFood, setSelectedMealFood] = useState(null);
    const [isAlternativesModalOpen, setIsAlternativesModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);
    const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
    const [selectedMealForFood, setSelectedMealForFood] = useState(null);
    const [editingMealFood, setEditingMealFood] = useState(null);
    const [isEditFoodModalOpen, setIsEditFoodModalOpen] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
    });

    const isNutritionist = auth.user.role_id === 2;
    const isAdmin = auth.user.role_id === 3;
    const canEdit = isAdmin || diet.nutritionist_id === auth.user.id;

    const weekDays = [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado',
    ];

    // Agrupar refeições por dia da semana
    const mealsByDay = {};
    if (diet.daily_meals) {
        diet.daily_meals.forEach((meal) => {
            if (!mealsByDay[meal.day_of_week]) {
                mealsByDay[meal.day_of_week] = [];
            }
            mealsByDay[meal.day_of_week].push(meal);
        });
    }

    const openAlternativesModal = (mealFood) => {
        setSelectedMealFood(mealFood);
        setIsAlternativesModalOpen(true);
    };

    const closeAlternativesModal = () => {
        setIsAlternativesModalOpen(false);
        setSelectedMealFood(null);
    };

    const openAddFoodModal = (meal) => {
        setSelectedMealForFood(meal);
        setIsAddFoodModalOpen(true);
    };

    const closeAddFoodModal = () => {
        setIsAddFoodModalOpen(false);
        setSelectedMealForFood(null);
    };

    // Obter usuários já atribuídos
    const assignedUserIds = diet.assignments ? diet.assignments.map(a => a.user_id) : [];
    const availableUsers = users ? users.filter(u => !assignedUserIds.includes(u.id)) : [];

    // Calcular calorias do dia selecionado
    const dayCalories = (mealsByDay[selectedDay] || []).reduce((total, meal) => {
        const mealCalories = (meal.meal_foods || []).reduce((sum, mf) => {
            return sum + (calculateCalories(mf) || 0);
        }, 0);
        return total + mealCalories;
    }, 0);

    const handleAssignUser = (e) => {
        e.preventDefault();
        post(`/diets/${diet.id}/assign`, {
            onSuccess: () => {
                setIsAssignModalOpen(false);
                setData('user_id', '');
                showSuccess('Usuário atribuído com sucesso', 3000);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/diets"
                            className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </Link>
                        <div>
                            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                {diet.name}
                            </h2>
                            <p className="text-sm text-gray-600">
                                Criado por: {diet.nutritionist?.name}
                            </p>
                        </div>
                    </div>
                    {canEdit && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsAssignModalOpen(true)}
                                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
                            >
                                <Users className="h-4 w-4" />
                                Atribuir Usuário
                            </button>
                            <Link
                                href={`/diets/${diet.id}/edit`}
                                className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 transition-colors"
                            >
                                Editar
                            </Link>
                        </div>
                    )}
                </div>
            }
        >
            <Head title={diet.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Informações da Dieta */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Descrição</h3>
                                    <p className="mt-1 text-gray-800">
                                        {diet.description || 'Sem descrição'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Meta de Calorias
                                    </h3>
                                    <p className="mt-1 text-gray-800">
                                        {diet.target_calories
                                            ? `${diet.target_calories} kcal/dia`
                                            : 'Não definido'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Período
                                    </h3>
                                    <p className="mt-1 text-gray-800">
                                        {diet.start_date ? new Date(diet.start_date).toLocaleDateString('pt-BR') : 'N/A'} -{' '}
                                        {diet.end_date
                                            ? new Date(diet.end_date).toLocaleDateString('pt-BR')
                                            : 'Sem data fim'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Usuários Atribuídos
                                    </h3>
                                    <div className="mt-1">
                                        {diet.assignments && diet.assignments.length > 0 ? (
                                            <div className="space-y-2">
                                                {diet.assignments.map((assignment) => (
                                                    <p key={assignment.id} className="text-sm text-gray-800">
                                                        ✓ {assignment.user.name} ({assignment.user.email})
                                                    </p>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-600">Nenhum usuário atribuído ainda</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seletor de Dias */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="mb-4 text-lg font-semibold text-gray-800">
                                Selecionar Dia
                            </h3>
                            <div className="grid gap-2 grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
                                {weekDays.map((day, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedDay(index)}
                                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                            selectedDay === index
                                                ? 'bg-amber-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {day.substring(0, 3)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Total de Calorias do Dia */}
                    {dayCalories > 0 && (
                        <div className="mb-6 overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 shadow-sm sm:rounded-lg border-l-4 border-amber-600">
                            <div className="p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total de calorias do dia</p>
                                    <p className="text-3xl font-bold text-amber-600 mt-2">
                                        {dayCalories} kcal
                                    </p>
                                    {diet.target_calories && (
                                        <p className="text-sm text-gray-600 mt-2">
                                            Meta: {diet.target_calories} kcal
                                            <span className={dayCalories > diet.target_calories ? 'text-red-600 ml-2' : 'text-green-600 ml-2'}>
                                                ({dayCalories - diet.target_calories > 0 ? '+' : ''}{dayCalories - diet.target_calories} kcal)
                                            </span>
                                        </p>
                                    )}
                                </div>
                                <Flame className="h-12 w-12 text-orange-500 opacity-50" />
                            </div>
                        </div>
                    )}

                    {/* Refeições do Dia Selecionado */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-gray-800">
                                {weekDays[selectedDay]}
                            </h3>
                            {canEdit && (
                                <button
                                    onClick={() => setIsAddMealModalOpen(true)}
                                    className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                    Adicionar Refeição
                                </button>
                            )}
                        </div>

                        {mealsByDay[selectedDay] && mealsByDay[selectedDay].length > 0 ? (
                            mealsByDay[selectedDay].map((meal) => {
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
                                                    <h4 className="text-lg font-semibold text-gray-800">
                                                        {meal.meal_type}
                                                    </h4>
                                                    {meal.suggested_time && (
                                                        <p className="text-sm text-gray-600">
                                                            {meal.suggested_time}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    {mealCalories > 0 && (
                                                        <div className="text-right">
                                                            <p className="text-xs text-gray-600">Calorias</p>
                                                            <p className="text-lg font-bold text-amber-600">
                                                                {mealCalories} kcal
                                                            </p>
                                                        </div>
                                                    )}
                                                    {canEdit && (
                                                        <button
                                                            onClick={() => openAddFoodModal(meal)}
                                                            className="rounded-md bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-500 transition-colors inline-flex items-center gap-1"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                            Alimento
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            {meal.meal_foods && meal.meal_foods.length > 0 ? (
                                                <div className="space-y-4">
                                                    {meal.meal_foods.map((mealFood) => {
                                                        const foodCalories = calculateCalories(mealFood);
                                                        return (
                                                            <div
                                                                key={mealFood.id}
                                                                className="rounded-lg border border-gray-200 p-4 hover:border-amber-200 transition-colors flex items-start justify-between group"
                                                            >
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 flex-wrap mb-2">
                                                                        <h5 className="font-semibold text-gray-800">
                                                                            {mealFood.food?.name}
                                                                        </h5>
                                                                        {mealFood.food?.category && (
                                                                            <span className="rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                                                                                {mealFood.food.category}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <p className="text-sm text-gray-600">
                                                                        {mealFood.quantity} {mealFood.measure?.abbreviation}
                                                                    </p>
                                                                    {foodCalories && (
                                                                        <p className="text-sm text-orange-600 font-semibold mt-1">
                                                                            🔥 {foodCalories} kcal
                                                                        </p>
                                                                    )}
                                                                    {mealFood.preparation_notes && (
                                                                        <p className="mt-2 text-sm italic text-gray-500">
                                                                            {mealFood.preparation_notes}
                                                                        </p>
                                                                    )}
                                                                </div>

                                                                <div className="flex items-center gap-2 ml-4">
                                                                    {mealFood.alternatives && mealFood.alternatives.length > 0 && (
                                                                        <button
                                                                            onClick={() => openAlternativesModal(mealFood)}
                                                                            type="button"
                                                                            className="rounded bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors whitespace-nowrap border border-blue-200"
                                                                        >
                                                                            💡 {mealFood.alternatives.length}
                                                                        </button>
                                                                    )}
                                                                    {canEdit && (
                                                                        <button
                                                                            onClick={() => {
                                                                                setEditingMealFood(mealFood);
                                                                                setIsEditFoodModalOpen(true);
                                                                            }}
                                                                            className="opacity-0 group-hover:opacity-100 rounded-md px-2 py-1 text-xs font-medium text-amber-600 hover:bg-amber-50 transition-all"
                                                                        >
                                                                            Editar
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <p className="text-center text-gray-500">
                                                    Nenhum alimento nesta refeição
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                <div className="p-6 text-center text-gray-500">
                                    <p className="mb-4">Nenhuma refeição cadastrada para este dia.</p>
                                    {canEdit && (
                                        <button
                                            onClick={() => setIsAddMealModalOpen(true)}
                                            className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500 transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Começar Adicionando Uma Refeição
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Alternativas */}
            {selectedMealFood && (
                <AlternativesModal
                    mealFood={selectedMealFood}
                    isOpen={isAlternativesModalOpen}
                    onClose={closeAlternativesModal}
                />
            )}

            {/* Modal de Adicionar Refeição */}
            <AddMealModal
                dietId={diet.id}
                dayOfWeek={selectedDay}
                isOpen={isAddMealModalOpen}
                onClose={() => setIsAddMealModalOpen(false)}
            />

            {/* Modal de Adicionar Alimento */}
            {selectedMealForFood && (
                <AddFoodToMealModal
                    dailyMealId={selectedMealForFood.id}
                    foods={foods}
                    measures={measures}
                    isOpen={isAddFoodModalOpen}
                    onClose={closeAddFoodModal}
                />
            )}

            {/* Modal de Editar Alimento */}
            {editingMealFood && (
                <EditFoodModal
                    mealFood={editingMealFood}
                    foods={foods}
                    measures={measures}
                    isOpen={isEditFoodModalOpen}
                    onClose={() => {
                        setIsEditFoodModalOpen(false);
                        setEditingMealFood(null);
                    }}
                />
            )}

            {/* Modal de Atribuição de Usuário */}
            {isAssignModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between border-b pb-4">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Atribuir Usuário à Dieta
                            </h3>
                            <button
                                onClick={() => setIsAssignModalOpen(false)}
                                className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
                                type="button"
                            >
                                <X className="h-6 w-6 text-gray-600" />
                            </button>
                        </div>

                        <form onSubmit={handleAssignUser}>
                            <div className="mb-4">
                                <label
                                    htmlFor="user_id"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Selecione um Usuário *
                                </label>
                                <select
                                    id="user_id"
                                    value={data.user_id}
                                    onChange={(e) => setData('user_id', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    required
                                >
                                    <option value="">-- Selecione --</option>
                                    {availableUsers && availableUsers.length > 0 ? (
                                        availableUsers.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name} ({user.email})
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>Nenhum usuário disponível</option>
                                    )}
                                </select>
                                {errors.user_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>
                                )}
                            </div>

                            {/* Usuários já atribuídos */}
                            {diet.assignments && diet.assignments.length > 0 && (
                                <div className="mb-4 rounded-lg bg-blue-50 p-3 border border-blue-200">
                                    <p className="text-xs font-medium text-blue-700 mb-2">Usuários já atribuídos:</p>
                                    <div className="space-y-1">
                                        {diet.assignments.map((assignment) => (
                                            <p key={assignment.id} className="text-xs text-blue-600">
                                                • {assignment.user.name}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end gap-2 border-t pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsAssignModalOpen(false)}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-50 transition-colors"
                                >
                                    {processing ? 'Atribuindo...' : 'Atribuir'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
