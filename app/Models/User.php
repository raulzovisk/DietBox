<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function dietAssignments(): HasMany
    {
        return $this->hasMany(DietAssignment::class);
    }

    public function createdDiets(): HasMany
    {
        return $this->hasMany(Diet::class, 'nutritionist_id');
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    public function isUser(): bool
    {
        return $this->role_id === Role::USER;
    }

    public function isNutritionist(): bool
    {
        return $this->role_id === Role::NUTRITIONIST;
    }

    public function isAdmin(): bool
    {
        return $this->role_id === Role::ADMIN;
    }
}
