import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';

export default function AddFoodToMealModal({ dailyMealId, foods, measures, isOpen, onClose }) {
    if (!isOpen) return null;

    if (!dailyMealId) {
        console.error('❌ ERRO: dailyMealId não foi fornecido!');
        return null;
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        food_id: '',
        quantity: '',
        measure_id: '',
        preparation_notes: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('📤 Enviando para:', `/daily-meals/${dailyMealId}/foods`);

        post(`/daily-meals/${dailyMealId}/foods`, {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between border-b pb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Adicionar Alimento à Refeição
                    </h3>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
                        type="button"
                    >
                        <X className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Alimento */}
                        <div>
                            <label
                                htmlFor="food_id"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Alimento *
                            </label>
                            <select
                                id="food_id"
                                value={data.food_id}
                                onChange={(e) => setData('food_id', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                required
                            >
                                <option value="">-- Selecione --</option>
                                {foods && foods.map((food) => (
                                    <option key={food.id} value={food.id}>
                                        {food.name} ({food.category})
                                    </option>
                                ))}
                            </select>
                            {errors.food_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.food_id}</p>
                            )}
                        </div>

                        {/* Quantidade */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="quantity"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Quantidade *
                                </label>
                                <input
                                    id="quantity"
                                    type="number"
                                    step="0.01"
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    required
                                />
                                {errors.quantity && (
                                    <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
                                )}
                            </div>

                            {/* Medida */}
                            <div>
                                <label
                                    htmlFor="measure_id"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Medida *
                                </label>
                                <select
                                    id="measure_id"
                                    value={data.measure_id}
                                    onChange={(e) => setData('measure_id', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    required
                                >
                                    <option value="">-- Selecione --</option>
                                    {measures && measures.map((measure) => (
                                        <option key={measure.id} value={measure.id}>
                                            {measure.abbreviation}
                                        </option>
                                    ))}
                                </select>
                                {errors.measure_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.measure_id}</p>
                                )}
                            </div>
                        </div>

                        {/* Notas de Preparo */}
                        <div>
                            <label
                                htmlFor="preparation_notes"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Notas de Preparo
                            </label>
                            <textarea
                                id="preparation_notes"
                                rows="3"
                                value={data.preparation_notes}
                                onChange={(e) => setData('preparation_notes', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="Ex: Grelhado, cozido no vapor, etc..."
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-2 border-t pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-50 transition-colors"
                        >
                            {processing ? 'Adicionando...' : 'Adicionar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
