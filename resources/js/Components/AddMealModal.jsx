import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';

export default function AddMealModal({ dietId, dayOfWeek, isOpen, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        day_of_week: dayOfWeek,
        meal_type: '',
        suggested_time: '',
    });

    const mealTypes = ['Café da manhã', 'Almoço', 'Lanche', 'Café da tarde', 'Jantar', 'Ceia'];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/diets/${dietId}/meals`, {
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
                        Adicionar Refeição
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
                        {/* Tipo de Refeição */}
                        <div>
                            <label
                                htmlFor="meal_type"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Tipo de Refeição *
                            </label>
                            <select
                                id="meal_type"
                                value={data.meal_type}
                                onChange={(e) => setData('meal_type', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                required
                            >
                                <option value="">-- Selecione --</option>
                                {mealTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            {errors.meal_type && (
                                <p className="mt-1 text-sm text-red-600">{errors.meal_type}</p>
                            )}
                        </div>

                        {/* Horário Sugerido */}
                        <div>
                            <label
                                htmlFor="suggested_time"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Horário Sugerido
                            </label>
                            <input
                                id="suggested_time"
                                type="time"
                                value={data.suggested_time}
                                onChange={(e) => setData('suggested_time', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            {errors.suggested_time && (
                                <p className="mt-1 text-sm text-red-600">{errors.suggested_time}</p>
                            )}
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
