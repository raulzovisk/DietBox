<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Food extends Model
{
    use HasFactory;

    protected $table = 'foods';
    protected $fillable = [
        'name',
        'description',
        'calories_per_100g',
        'protein_per_100g',
        'carbs_per_100g',
        'fat_per_100g',
        'category',
    ];

    public function mealFoods(): HasMany
    {
        return $this->hasMany(MealFood::class);
    }

    public function alternatives(): HasMany
    {
        return $this->hasMany(FoodAlternative::class);
    }
}
