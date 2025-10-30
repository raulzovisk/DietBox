export function calculateCalories(mealFood) {
    if (!mealFood || !mealFood.food || !mealFood.food.calories_per_100g) {
        return null;
    }

    // Assumir que a maioria das medidas usa 100g como base
    // Para conversões mais precisas, você pode ajustar conforme necessário
    const baseMeasures = {
        'g': 1,
        'kg': 1000,
        'mg': 0.001,
        'ml': 1, // para líquidos, 1ml ≈ 1g
        'l': 1000,
    };

    let quantity = parseFloat(mealFood.quantity);
    const measureAbbr = mealFood.measure?.abbreviation?.toLowerCase() || 'g';

    // Converter para gramas
    const multiplier = baseMeasures[measureAbbr] || 1;
    const gramsQuantity = quantity * multiplier;

    // Calcular calorias
    const calories = (gramsQuantity / 100) * mealFood.food.calories_per_100g;

    return Math.round(calories);
}

export function formatCalories(calories) {
    if (!calories && calories !== 0) return '-';
    return `${calories} kcal`;
}
