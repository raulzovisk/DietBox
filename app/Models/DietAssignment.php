<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DietAssignment extends Model
{
    use HasFactory;

    protected $table = 'diet_assignments'; 

    protected $fillable = [
        'user_id',
        'diet_id',
        'assigned_date',
        'is_active',
        'notified',
    ];

    protected function casts(): array
    {
        return [
            'assigned_date' => 'date',
            'is_active' => 'boolean',
            'notified' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function diet(): BelongsTo
    {
        return $this->belongsTo(Diet::class);
    }
}
