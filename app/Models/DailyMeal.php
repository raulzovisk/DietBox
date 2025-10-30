<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DailyMeal extends Model
{
    use HasFactory;

    protected $table = 'daily_meals'; 

    protected $fillable = [
        'diet_id',
        'day_of_week',
        'meal_type',
        'suggested_time',
        'order',
    ];

    protected function casts(): array
    {
        return [
            'suggested_time' => 'datetime:H:i',
        ];
    }

    public function diet(): BelongsTo
    {
        return $this->belongsTo(Diet::class);
    }

    public function mealFoods(): HasMany
    {
        return $this->hasMany(MealFood::class);
    }
}
