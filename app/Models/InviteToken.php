<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InviteToken extends Model
{
    protected $fillable = [
        'token',
        'role_type',
        'created_by',
        'used_by',
        'used_at',
        'expires_at',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'used_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    public function isValid()
    {
        return $this->used_at === null || $this->expires_at > now();
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function usedBy()
    {
        return $this->belongsTo(User::class, 'used_by');
    }

}
