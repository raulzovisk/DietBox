import { useForm } from '@inertiajs/react';
import { X, Plus, Trash2 } from 'lucide-react';
import { showSuccess, showError, showWarning, showInfo } from '@/Utils/toast';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditFoodModal({ mealFood, foods, measures, isOpen, onClose }) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        food_id: mealFood?.food_id || '',
        quantity: mealFood?.quantity || '',
        measure_id: mealFood?.measure_id || '',
        preparation_notes: mealFood?.preparation_notes || '',
    });

    const [isAddingAlternative, setIsAddingAlternative] = useState(false);
    const [alternativesList, setAlternativesList] = useState(mealFood?.alternatives || []);
    const [alternativeData, setAlternativeData] = useState({
        food_id: '',
        quantity: '',
        measure_id: '',
        notes: '',
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]')?.content;
        if (token) {
            axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
        }
    }, []);

    useEffect(() => {
        if (isOpen && mealFood) {
            setData({
                food_id: mealFood?.food_id || '',
                quantity: mealFood?.quantity || '',
                measure_id: mealFood?.measure_id || '',
                preparation_notes: mealFood?.preparation_notes || '',
            });
            setAlternativesList(mealFood?.alternatives || []);
        }
    }, [isOpen, mealFood]);

    const handleAddAlternativeLocally = (e) => {
        e.preventDefault();

        if (!alternativeData.food_id || !alternativeData.quantity || !alternativeData.measure_id) {
            showWarning('Preencha todos os campos obrigatórios da alternativa', 4000);
            return;
        }

        const selectedFood = foods.find(f => f.id === parseInt(alternativeData.food_id));
        const selectedMeasure = measures.find(m => m.id === parseInt(alternativeData.measure_id));

        const newAlternative = {
            ...alternativeData,
            food_id: parseInt(alternativeData.food_id),
            quantity: parseFloat(alternativeData.quantity),
            measure_id: parseInt(alternativeData.measure_id),
            id: `temp-${Date.now()}`,
            food: selectedFood,
            measure: selectedMeasure,
        };

        setAlternativesList([...alternativesList, newAlternative]);
        setAlternativeData({ food_id: '', quantity: '', measure_id: '', notes: '' });
        setIsAddingAlternative(false);

        showSuccess(`Alternativa "${selectedFood.name}" adicionada à lista`, 3000);
    };

    const handleRemoveAlternative = async (index) => {
        const alt = alternativesList[index];

        if (!confirm('Tem certeza que deseja remover esta alternativa?')) {
            return;
        }

        try {
            setIsDeleting(true);

            if (alt.id && !alt.id.toString().startsWith('temp-')) {
                showWarning('Deletando alternativa...', 0);

                // ✅ URL CORRETA para deletar alternativa
                const url = `/food-alternatives/${alt.id}`;
                console.log('Deletando alternativa em:', url);

                await axios.delete(url);

                showSuccess('Alternativa removida com sucesso', 3000);
            } else {
                showSuccess('Alternativa removida da lista', 3000);
            }

            const newList = alternativesList.filter((_, i) => i !== index);
            setAlternativesList(newList);

        } catch (err) {
            console.error('ERRO:', err);
            showError(`Erro ao deletar alternativa: ${err.response?.status || err.message}`, 5000);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.food_id || !data.quantity || !data.measure_id) {
            showError('Preencha todos os campos obrigatórios do alimento', 4000);
            return;
        }

        setIsSaving(true);
        showInfo('Salvando alterações...', 0);

        try {
            // ✅ USAR PATCH AO INVÉS DE PUT
            await new Promise((resolve, reject) => {
                patch(`/meal-foods/${mealFood.id}`, {
                    onSuccess: resolve,
                    onError: reject,
                });
            });

            showSuccess('Alimento atualizado com sucesso', 3000);

            const newAlternatives = alternativesList.filter(alt => alt.id.toString().startsWith('temp-'));

            if (newAlternatives.length > 0) {
                showInfo(`Salvando ${newAlternatives.length} alternativa(s)...`, 0);

                for (const alt of newAlternatives) {
                    const altData = {
                        food_id: alt.food_id,
                        quantity: alt.quantity,
                        measure_id: alt.measure_id,
                        notes: alt.notes,
                    };

                    // ✅ URL CORRETA para adicionar alternativa
                    const url = `/meal-foods/${mealFood.id}/alternatives`;
                    console.log('Salvando alternativa em:', url);

                    await axios.post(url, altData);
                }

                showSuccess(`${newAlternatives.length} alternativa(s) salva(s) com sucesso!`, 3000);
            }

            setIsSaving(false);
            reset();
            onClose();

            setTimeout(() => {
                window.location.reload();
            }, 500);

        } catch (err) {
            console.error('Erro:', err);
            setIsSaving(false);
            showError('Erro ao salvar: ' + err.message, 5000);
        }
    };

    const handleDeleteMealFood = async (e) => {
        e.preventDefault();

        if (!confirm('Tem certeza que deseja deletar este alimento?')) {
            return;
        }

        setIsDeleting(true);
        showWarning('Deletando alimento...', 0);

        try {
            // ✅ URL CORRETA para deletar alimento
            const url = `/meal-foods/${mealFood.id}`;
            console.log('Deletando alimento em:', url);

            await axios.delete(url);

            setIsDeleting(false);
            reset();
            onClose();
            showSuccess('Alimento deletado com sucesso', 3000);

            setTimeout(() => {
                window.location.reload();
            }, 500);

        } catch (err) {
            console.error('Erro ao deletar alimento:', err);
            setIsDeleting(false);
            showError(`Erro ao deletar alimento: ${err.response?.status || err.message}`, 5000);
        }
    };

    if (!isOpen || !mealFood) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="mb-4 flex items-center justify-between border-b pb-4 sticky top-0 bg-white z-10">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Editar Alimento: <span className="text-amber-600">{mealFood.food?.name}</span>
                    </h3>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
                        type="button"
                        disabled={processing || isSaving || isDeleting}
                    >
                        <X className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Dados do Alimento */}
                    <div className="space-y-4 border-b pb-6">
                        <h4 className="font-semibold text-gray-800">Informações do Alimento</h4>

                        <div>
                            <label htmlFor="food_id" className="block text-sm font-medium text-gray-700 mb-2">
                                Alimento *
                            </label>
                            <select
                                id="food_id"
                                value={data.food_id}
                                onChange={(e) => {
                                    setData('food_id', e.target.value);
                                    showInfo('Campo alterado: Alimento', 2000);
                                }}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                required
                                disabled={processing || isSaving || isDeleting}
                            >
                                <option value="">-- Selecione --</option>
                                {foods && foods.map((food) => (
                                    <option key={food.id} value={food.id}>
                                        {food.name} ({food.category})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                                    Quantidade *
                                </label>
                                <input
                                    id="quantity"
                                    type="number"
                                    step="0.01"
                                    value={data.quantity}
                                    onChange={(e) => {
                                        setData('quantity', e.target.value);
                                        showInfo('Campo alterado: Quantidade', 2000);
                                    }}
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    required
                                    disabled={processing || isSaving || isDeleting}
                                />
                            </div>

                            <div>
                                <label htmlFor="measure_id" className="block text-sm font-medium text-gray-700 mb-2">
                                    Medida *
                                </label>
                                <select
                                    id="measure_id"
                                    value={data.measure_id}
                                    onChange={(e) => {
                                        setData('measure_id', e.target.value);
                                        showInfo('Campo alterado: Medida', 2000);
                                    }}
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    required
                                    disabled={processing || isSaving || isDeleting}
                                >
                                    <option value="">-- Selecione --</option>
                                    {measures && measures.map((measure) => (
                                        <option key={measure.id} value={measure.id}>
                                            {measure.abbreviation}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="preparation_notes" className="block text-sm font-medium text-gray-700 mb-2">
                                Notas de Preparo
                            </label>
                            <textarea
                                id="preparation_notes"
                                rows="3"
                                value={data.preparation_notes}
                                onChange={(e) => {
                                    setData('preparation_notes', e.target.value);
                                    showInfo('Campo alterado: Notas de Preparo', 2000);
                                }}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="Ex: Grelhado, cozido no vapor, etc..."
                                disabled={processing || isSaving || isDeleting}
                            />
                        </div>
                    </div>

                    {/* Alternativas */}
                    <div className="space-y-4 border-b pb-6">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-800">
                                Alternativas ({alternativesList.length})
                            </h4>
                            {!isAddingAlternative && (
                                <button
                                    type="button"
                                    onClick={() => setIsAddingAlternative(true)}
                                    className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-500 transition-colors disabled:opacity-50"
                                    disabled={processing || isSaving || isDeleting}
                                >
                                    <Plus className="h-3 w-3" />
                                    Adicionar
                                </button>
                            )}
                        </div>

                        {alternativesList && alternativesList.length > 0 ? (
                            <div className="space-y-2">
                                {alternativesList.map((alt, index) => (
                                    <div
                                        key={alt.id || index}
                                        className={`rounded-lg p-3 border flex items-center justify-between ${alt.id?.toString().startsWith('temp-')
                                                ? 'bg-yellow-50 border-yellow-200'
                                                : 'bg-blue-50 border-blue-200'
                                            }`}
                                    >
                                        <div>
                                            <p className="font-medium text-gray-800">{alt.food?.name}</p>
                                            <p className="text-sm text-gray-600">
                                                {alt.quantity} {alt.measure?.abbreviation}
                                                {alt.notes && ` • ${alt.notes}`}
                                            </p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleRemoveAlternative(index);
                                            }}
                                            type="button"
                                            className="text-red-600 hover:text-red-900 transition-colors p-2 rounded hover:bg-red-50"
                                            disabled={isDeleting}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">Nenhuma alternativa adicionada</p>
                        )}

                        {isAddingAlternative && (
                            <div className="rounded-lg bg-green-50 p-4 border border-green-200 space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Alimento Alternativo *
                                    </label>
                                    <select
                                        value={alternativeData.food_id}
                                        onChange={(e) => setAlternativeData({ ...alternativeData, food_id: e.target.value })}
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    >
                                        <option value="">-- Selecione --</option>
                                        {foods && foods.map((food) => (
                                            <option key={food.id} value={food.id}>
                                                {food.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Quantidade *
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={alternativeData.quantity}
                                            onChange={(e) => setAlternativeData({ ...alternativeData, quantity: e.target.value })}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Medida *
                                        </label>
                                        <select
                                            value={alternativeData.measure_id}
                                            onChange={(e) => setAlternativeData({ ...alternativeData, measure_id: e.target.value })}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        >
                                            <option value="">-- Selecione --</option>
                                            {measures && measures.map((measure) => (
                                                <option key={measure.id} value={measure.id}>
                                                    {measure.abbreviation}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Notas
                                    </label>
                                    <textarea
                                        rows="2"
                                        value={alternativeData.notes}
                                        onChange={(e) => setAlternativeData({ ...alternativeData, notes: e.target.value })}
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        placeholder="Ex: Similar em nutrientes, mais barato, etc..."
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingAlternative(false)}
                                        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAddAlternativeLocally}
                                        className="flex-1 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-500 transition-colors"
                                    >
                                        ✓ Adicionar à Lista
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Botões */}
                    <div className="flex justify-between gap-2 border-t pt-4 sticky bottom-0 bg-white">
                        <button
                            type="button"
                            onClick={handleDeleteMealFood}
                            className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors inline-flex items-center gap-2 disabled:opacity-50"
                            disabled={processing || isSaving || isDeleting}
                        >
                            <Trash2 className="h-4 w-4" />
                            {isDeleting ? 'Deletando...' : 'Deletar Alimento'}
                        </button>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                                disabled={processing || isSaving || isDeleting}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={processing || isSaving || isDeleting}
                                className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-50 transition-colors"
                            >
                                {processing || isSaving ? 'Salvando...' : 'Salvar Tudo'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
