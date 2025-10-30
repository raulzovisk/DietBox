<?php

namespace App\Policies;

use App\Models\Diet;
use App\Models\User;

class DietPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Diet $diet): bool
    {
        return $user->isAdmin()
            || $diet->nutritionist_id === $user->id
            || $diet->assignments()->where('user_id', $user->id)->exists();
    }

    public function create(User $user): bool
    {
        return $user->isNutritionist() || $user->isAdmin();
    }

    public function update(User $user, Diet $diet): bool
    {
        return $user->isAdmin() || $diet->nutritionist_id === $user->id;
    }

    public function delete(User $user, Diet $diet): bool
    {
        return $user->isAdmin() || $diet->nutritionist_id === $user->id;
    }
}
