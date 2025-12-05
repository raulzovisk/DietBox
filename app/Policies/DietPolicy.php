<?php

namespace App\Policies;

use App\Models\Diet;
use App\Models\User;

class DietPolicy
{
    public function viewAny(User $user): bool
    {
        //  Admins e Nutricionistas podem ver lista
        return in_array($user->role_id, [2, 3]);
    }

    public function view(User $user, Diet $diet): bool
    {
        //  Admin pode ver qualquer dieta
        if ($user->role_id === 3) {
            return true;
        }

        //  Nutricionista pode ver suas próprias dietas
        if ($user->role_id === 2) {
            return $diet->nutritionist_id === $user->id;
        }

        //  Usuário comum pode ver se estiver atribuído
        return $diet->assignments()->where('user_id', $user->id)->exists();
    }

    public function create(User $user): bool
    {
        //  Apenas Admins e Nutricionistas podem criar
        return in_array($user->role_id, [2, 3]);
    }

    public function update(User $user, Diet $diet): bool
    {
        //  Admin pode editar qualquer dieta
        if ($user->role_id === 3) {
            return true;
        }

        //  Nutricionista pode editar suas próprias dietas
        return $user->role_id === 2 && $diet->nutritionist_id === $user->id;
    }

    public function delete(User $user, Diet $diet): bool
    {
        //  Admin pode deletar qualquer dieta
        if ($user->role_id === 3) {
            return true;
        }

        //  Nutricionista pode deletar suas próprias dietas
        return $user->role_id === 2 && $diet->nutritionist_id === $user->id;
    }
}
