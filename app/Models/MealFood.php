<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MealFood extends Model
{
    use HasFactory;

    protected $table = 'meal_foods';

    protected $fillable = [
        'daily_meal_id',
        'food_id',
        'quantity',
        'measure_id',
        'preparation_notes',
        'order',
    ];

    public function dailyMeal(): BelongsTo
    {
        return $this->belongsTo(DailyMeal::class);
    }

    public function food(): BelongsTo
    {
        return $this->belongsTo(Food::class);
    }

    public function measure(): BelongsTo
    {
        return $this->belongsTo(Measure::class);
    }

    public function alternatives(): HasMany
    {
        return $this->hasMany(FoodAlternative::class);
    }
}
