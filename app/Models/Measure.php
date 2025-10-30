<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Measure extends Model
{
    use HasFactory;

    protected $table = 'measures'; 

    protected $fillable = [
        'name',
        'abbreviation',
        'type',
    ];

    public function mealFoods(): HasMany
    {
        return $this->hasMany(MealFood::class);
    }

    public function foodAlternatives(): HasMany
    {
        return $this->hasMany(FoodAlternative::class);
    }
}
