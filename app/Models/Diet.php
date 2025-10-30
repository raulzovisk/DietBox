<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Diet extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'nutritionist_id',
        'target_calories',
        'start_date',
        'end_date',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'is_active' => 'boolean',
        ];
    }

    public function nutritionist(): BelongsTo
    {
        return $this->belongsTo(User::class, 'nutritionist_id');
    }

    public function dailyMeals(): HasMany
    {
        return $this->hasMany(DailyMeal::class);
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(DietAssignment::class);
    }
}
