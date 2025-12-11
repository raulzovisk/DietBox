import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import AlternativesModal from '@/Components/AlternativesModal';
import AddMealModal from '@/Components/AddMealModal';
import AddFoodToMealModal from '@/Components/AddFoodToMealModal';
import { calculateCalories } from '@/Utils/calorieCalculator';
import EditFoodModal from '@/Components/EditFoodModal';
import { showSuccess, showWarning, showError } from '@/Utils/toast';
import { ArrowLeft, Flame, Users, X, Plus, Trash2, UserX, UserPlus, Edit } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

export default function Show({ diet, auth, users, foods, measures }) {
    // ========== STATES ORIGINAIS ==========
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedMealFood, setSelectedMealFood] = useState(null);
    const [isAlternativesModalOpen, setIsAlternativesModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isAddMealModalOpen, setIsAddMealModalOpen] = useState(false);
    const [isAddFoodModalOpen, setIsAddFoodModalOpen] = useState(false);
    const [selectedMealForFood, setSelectedMealForFood] = useState(null);
    const [editingMealFood, setEditingMealFood] = useState(null);
    const [isEditFoodModalOpen, setIsEditFoodModalOpen] = useState(false);
    const [removingAssignmentId, setRemovingAssignmentId] = useState(null);

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

        console.log('🔍 DEBUG - Meal recebida:', meal); // ✅ Debug
        console.log('🔍 DEBUG - Meal ID:', meal?.id); // ✅ Debug
        setSelectedMealForFood(meal);
        setIsAddFoodModalOpen(true);
    };

    const closeAddFoodModal = () => {
        setIsAddFoodModalOpen(false);
        setSelectedMealForFood(null);
    };

    const openEditFoodModal = (mealFood) => {
        setEditingMealFood(mealFood);
        setIsEditFoodModalOpen(true);
    };

    const closeEditFoodModal = () => {
        setIsEditFoodModalOpen(false);
        setEditingMealFood(null);
    };

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

    const handleUnassignUser = async (assignmentId, userName) => {
        if (!confirm(`Tem certeza que deseja remover ${userName} desta dieta?`)) {
            return;
        }

        setRemovingAssignmentId(assignmentId);
        showWarning('Removendo usuário...', 0);

        try {
            const response = await axios.delete(`/diets/${diet.id}/unassign/${assignmentId}`);
            console.log('Resposta:', response);
            setRemovingAssignmentId(null);
            showSuccess(`${userName} removido com sucesso`, 3000);
            setTimeout(() => {
                window.location.reload();
            }, 800);
        } catch (err) {
            console.error('Erro ao remover:', err);
            setRemovingAssignmentId(null);
            if (err.response?.status === 200) {
                showSuccess(`${userName} removido com sucesso`, 3000);
                setTimeout(() => {
                    window.location.reload();
                }, 800);
            } else {
                showError(`Erro ao remover usuário: ${err.response?.status || err.message}`, 5000);
            }
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={diet.name} />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('diets.index')}
                        className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-slate-900">{diet.name}</h1>
                        <p className="text-sm text-slate-500">Criado por: {diet.nutritionist?.name}</p>
                    </div>
                    {canEdit && (
                        <Link
                            href={route('diets.edit', diet.id)}
                            className="flex items-center gap-2 rounded-lg h-10 px-4 bg-deep-space-blue-500 text-white text-sm font-bold hover:opacity-90 transition-opacity"
                        >
                            <Edit className="h-4 w-4" />
                            Editar Dieta
                        </Link>
                    )}
                </div>

                {/* Informações da Dieta */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Descrição</h3>
                        <p className="text-slate-900">{diet.description || 'Sem descrição'}</p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Meta Calórica</h3>
                        <p className="text-slate-900">
                            {diet.target_calories ? `${diet.target_calories} kcal/dia` : 'Não definido'}
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Período</h3>
                        <p className="text-slate-900">
                            {diet.start_date ? new Date(diet.start_date).toLocaleDateString('pt-BR') : 'N/A'} -{' '}
                            {diet.end_date ? new Date(diet.end_date).toLocaleDateString('pt-BR') : 'Sem data fim'}
                        </p>
                    </div>
                </div>

                {/* Seção Usuários Vinculados */}
                {canEdit && (
                    <div className="rounded-xl bg-white p-6 shadow-sm border border-deep-space-blue-500/20">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vivid-tangerine-500/10">
                                    <Users className="h-5 w-5 text-vivid-tangerine-500" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-deep-space-blue-500">Usuários Vinculados</h2>
                                    <p className="text-sm text-deep-space-blue-400">Gerencie quem pode acessar esta dieta</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsAssignModalOpen(true)}
                                className="flex items-center gap-2 rounded-lg h-10 px-4 bg-vivid-tangerine-500 text-white text-sm font-bold hover:opacity-90 transition-opacity"
                            >
                                <UserPlus className="h-4 w-4" />
                                Vincular Usuário
                            </button>
                        </div>

                        <div className="space-y-2">
                            {diet.assignments && diet.assignments.length > 0 ? (
                                diet.assignments.map((assignment) => (
                                    <div key={assignment.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-200">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vivid-tangerine-100 text-vivid-tangerine-600 font-semibold">
                                                {assignment.user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{assignment.user.name}</p>
                                                <p className="text-sm text-slate-500">{assignment.user.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleUnassignUser(assignment.id, assignment.user.name)}
                                            disabled={removingAssignmentId === assignment.id}
                                            className="flex items-center gap-2 rounded-lg h-9 px-3 bg-flag-red-500/10 text-flag-red-500 text-sm font-medium hover:bg-flag-red-500/20 transition-colors disabled:opacity-50"
                                        >
                                            <UserX className="h-4 w-4" />
                                            Remover
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-slate-500">
                                    <Users className="h-12 w-12 mx-auto mb-2 text-slate-300" />
                                    <p>Nenhum usuário vinculado ainda</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Dias da Semana */}
                <div className="rounded-lg bg-white shadow-sm border border-slate-200">
                    <div className="border-b border-slate-200 overflow-x-auto">
                        <div className="flex">
                            {weekDays.map((day, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedDay(index)}
                                    className={`flex-1 min-w-[120px] px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${selectedDay === index
                                        ? 'text-vivid-tangerine-600 border-b-2 border-vivid-tangerine-500 bg-vivid-tangerine-50'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                        }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Botão Adicionar Refeição */}
                        {canEdit && (
                            <div className="mb-6 flex justify-end">
                                <button
                                    onClick={() => setIsAddMealModalOpen(true)}
                                    className="flex items-center gap-2 rounded-lg h-10 px-4 bg-vivid-tangerine-500 text-white text-sm font-bold hover:opacity-90 transition-opacity"
                                >
                                    <Plus className="h-4 w-4" />
                                    Adicionar Refeição
                                </button>
                            </div>
                        )}

                        {/* Resumo Calorias */}
                        <div className="flex items-center justify-between mb-6 p-4 rounded-lg bg-slate-50">
                            <div className="flex items-center gap-3">
                                <Flame className="h-6 w-6 text-vivid-tangerine-500" />
                                <div>
                                    <p className="text-sm text-slate-500">Total de calorias do dia</p>
                                    <p className="text-2xl font-bold text-slate-900">{dayCalories} kcal</p>
                                </div>
                            </div>
                            {diet.target_calories && (
                                <div className="text-right">
                                    <p className="text-sm text-slate-500">Meta: {diet.target_calories} kcal</p>
                                    <p className={dayCalories > diet.target_calories ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                                        ({dayCalories - diet.target_calories > 0 ? '+' : ''}{dayCalories - diet.target_calories} kcal)
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Refeições */}
                        {mealsByDay[selectedDay] && mealsByDay[selectedDay].length > 0 ? (
                            <div className="space-y-4">
                                {mealsByDay[selectedDay].map((meal) => {
                                    const mealCalories = (meal.meal_foods || []).reduce((sum, mf) => {
                                        return sum + (calculateCalories(mf) || 0);
                                    }, 0);

                                    return (
                                        <div key={meal.id} className="rounded-lg border border-slate-200 bg-white overflow-hidden">
                                            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-slate-900">{meal.meal_name}</h3>
                                                        {meal.suggested_time && (
                                                            <p className="text-sm text-slate-500">{meal.suggested_time}</p>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-right">
                                                            <p className="text-xs text-slate-500">Calorias</p>
                                                            <p className="font-semibold text-slate-900">{mealCalories} kcal</p>
                                                        </div>
                                                        {canEdit && (
                                                            <button
                                                                onClick={() => openAddFoodModal(meal)}
                                                                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-vivid-tangerine-600 hover:bg-vivid-tangerine-50 rounded-lg transition-colors"
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                                Alimento
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                {meal.meal_foods && meal.meal_foods.length > 0 ? (
                                                    <div className="space-y-2">
                                                        {meal.meal_foods.map((mealFood) => {
                                                            const foodCalories = calculateCalories(mealFood);

                                                            return (
                                                                <div key={mealFood.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                                                                    <div className="flex-1">
                                                                        <p className="font-medium text-slate-900">{mealFood.food.name}</p>
                                                                        <p className="text-sm text-slate-600">
                                                                            {mealFood.quantity} {mealFood.measure?.abbreviation}
                                                                            {foodCalories && <span className="ml-2">🔥 {foodCalories} kcal</span>}
                                                                        </p>
                                                                        {mealFood.preparation_notes && (
                                                                            <p className="text-xs text-slate-500 mt-1">{mealFood.preparation_notes}</p>
                                                                        )}
                                                                    </div>
                                                                    {canEdit && (
                                                                        <div className="flex items-center gap-3">
                                                                            <button
                                                                                onClick={() => openAlternativesModal(mealFood)}
                                                                                className="text-sm text-vivid-tangerine-600 hover:underline"
                                                                            >
                                                                                Alternativas
                                                                            </button>
                                                                            <button
                                                                                onClick={() => openEditFoodModal(mealFood)}
                                                                                className="text-deep-space-blue-500 hover:text-deep-space-blue-600 transition-colors"
                                                                            >
                                                                                <Edit className="h-4 w-4" />
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <p className="text-center text-slate-500 py-4">Nenhum alimento nesta refeição</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-slate-500 mb-4">Nenhuma refeição cadastrada para este dia.</p>
                                {canEdit && (
                                    <button
                                        onClick={() => setIsAddMealModalOpen(true)}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-vivid-tangerine-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Adicionar Refeição
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ========== MODAL VINCULAR USUÁRIO ========== */}
            {isAssignModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-900">Vincular Usuário à Dieta</h3>
                            <button onClick={() => setIsAssignModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAssignUser} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Selecione o Usuário</label>
                                <select
                                    value={data.user_id}
                                    onChange={(e) => setData('user_id', e.target.value)}
                                    className="w-full rounded-lg border-slate-300 focus:border-vivid-tangerine-500 focus:ring-vivid-tangerine-500"
                                    required
                                >
                                    <option value="">Escolha um usuário...</option>
                                    {availableUsers.map((user) => (
                                        <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                                    ))}
                                </select>
                                {errors.user_id && <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>}
                            </div>
                            <div className="flex gap-3">
                                <button type="button" onClick={() => setIsAssignModalOpen(false)} className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                                    Cancelar
                                </button>
                                <button type="submit" disabled={processing} className="flex-1 px-4 py-2 bg-vivid-tangerine-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
                                    {processing ? 'Vinculando...' : 'Vincular'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <AddMealModal
                isOpen={isAddMealModalOpen}
                onClose={() => setIsAddMealModalOpen(false)}
                dietId={diet.id}
                dayOfWeek={selectedDay}
            />

            <AddFoodToMealModal
                isOpen={isAddFoodModalOpen}
                onClose={closeAddFoodModal}
                dailyMealId={selectedMealForFood?.id}
                meal={selectedMealForFood}
                foods={foods}
                measures={measures}
            />

            <EditFoodModal
                isOpen={isEditFoodModalOpen}
                onClose={closeEditFoodModal}
                mealFood={editingMealFood}
                foods={foods}
                measures={measures}
            />

            <AlternativesModal
                isOpen={isAlternativesModalOpen}
                onClose={closeAlternativesModal}
                mealFood={selectedMealFood}
                foods={foods}
                measures={measures}
            />
        </AuthenticatedLayout>
    );
}
