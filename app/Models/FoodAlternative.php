<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FoodAlternative extends Model
{
    use HasFactory;

    protected $table = 'food_alternatives'; 

    protected $fillable = [
        'meal_food_id',
        'food_id',
        'quantity',
        'measure_id',
        'notes',
    ];

    public function mealFood(): BelongsTo
    {
        return $this->belongsTo(MealFood::class);
    }

    public function food(): BelongsTo
    {
        return $this->belongsTo(Food::class);
    }

    public function measure(): BelongsTo
    {
        return $this->belongsTo(Measure::class);
    }
}
