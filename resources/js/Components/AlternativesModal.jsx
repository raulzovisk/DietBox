import { useState } from 'react';
import { X } from 'lucide-react';
import { calculateCalories } from '@/Utils/calorieCalculator';

export default function AlternativesModal({ mealFood, isOpen, onClose }) {
    if (!isOpen) return null;

    const originalCalories = calculateCalories(mealFood);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between border-b pb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            Alternativas para: <span className="text-amber-600">{mealFood.food?.name}</span>
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                            Quantidade original: {mealFood.quantity} {mealFood.measure?.abbreviation}
                        </p>
                        {originalCalories && (
                            <p className="text-sm text-orange-600 font-semibold mt-1">
                                🔥 Calorias originais: {originalCalories} kcal
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
                        type="button"
                    >
                        <X className="h-6 w-6 text-gray-600" />
                    </button>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {mealFood.alternatives && mealFood.alternatives.length > 0 ? (
                        mealFood.alternatives.map((alt) => {
                            const altCalories = calculateCalories({
                                food: alt.food,
                                quantity: alt.quantity,
                                measure: alt.measure,
                            });

                            const diff = originalCalories && altCalories ? altCalories - originalCalories : 0;

                            return (
                                <div
                                    key={alt.id}
                                    className="rounded-lg border border-amber-200 bg-amber-50 p-4 hover:bg-amber-100 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800 text-lg">
                                                {alt.food?.name}
                                            </h4>
                                            <p className="mt-1 text-sm text-gray-600">
                                                <strong>Quantidade:</strong> {alt.quantity} {alt.measure?.abbreviation}
                                            </p>
                                            {alt.food?.category && (
                                                <p className="mt-1 text-sm text-gray-600">
                                                    <strong>Categoria:</strong> {alt.food.category}
                                                </p>
                                            )}
                                            {altCalories && (
                                                <p className="text-sm text-orange-600 font-semibold mt-2">
                                                    🔥 {altCalories} kcal
                                                    {diff !== 0 && (
                                                        <span className={diff < 0 ? 'text-green-600 ml-2' : 'text-red-600 ml-2'}>
                                                            ({diff > 0 ? '+' : ''}{diff} kcal)
                                                        </span>
                                                    )}
                                                </p>
                                            )}
                                            {alt.notes && (
                                                <p className="mt-2 text-sm italic text-gray-600 bg-white p-2 rounded border border-gray-200">
                                                    📝 {alt.notes}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-500 py-8">
                            Nenhuma alternativa disponível para este alimento.
                        </p>
                    )}
                </div>

                <div className="mt-4 border-t pt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 transition-colors"
                        type="button"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}
