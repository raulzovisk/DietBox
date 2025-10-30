<?php

namespace App\Policies;

use App\Models\FoodAlternative;
use App\Models\User;

class FoodAlternativePolicy
{
    public function delete(User $user, FoodAlternative $foodAlternative)
    {
        return $user->role_id === 3 || $user->role_id === 2;
    }
}
