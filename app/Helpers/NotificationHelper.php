<?php

namespace App\Helpers;

use App\Models\Notification;
use App\Models\User;

class NotificationHelper
{
    /**
     * Criar notificação genérica
     */
    public static function create(User $user, string $type, string $message, ?array $data = null)
    {
        return Notification::create([
            'user_id' => $user->id,
            'type' => $type,
            'message' => $message,
            'data' => $data,
        ]);
    }

    /**
     * Usuário foi vinculado a uma dieta
     */
    public static function dietAssigned(User $user, $dietId, $dietName)
    {
        return self::create(
            $user,
            'diet_assigned',
            "Você foi vinculado à dieta: {$dietName}. Confira sua nova dieta agora!",
            ['diet_id' => $dietId]
        );
    }

    /**
     * Dieta foi atualizada
     */
    public static function dietUpdated(User $user, $dietId, $dietName)
    {
        return self::create(
            $user,
            'diet_updated',
            "A dieta '{$dietName}' foi atualizada. Confira as alterações!",
            ['diet_id' => $dietId]
        );
    }

    /**
     * Usuário foi removido de uma dieta
     */
    public static function dietRemoved(User $user, $dietId, $dietName)
    {
        return self::create(
            $user,
            'diet_removed',
            "Você foi removido da dieta: {$dietName}",
            ['diet_id' => $dietId]
        );
    }

    /**
     * Dieta foi ativada
     */
    public static function dietActivated(User $user, $dietId, $dietName)
    {
        return self::create(
            $user,
            'diet_activated',
            "A dieta '{$dietName}' foi ativada e agora está disponível!",
            ['diet_id' => $dietId]
        );
    }

    /**
     * Dieta foi desativada
     */
    public static function dietDeactivated(User $user, $dietId, $dietName)
    {
        return self::create(
            $user,
            'diet_deactivated',
            "A dieta '{$dietName}' foi desativada temporariamente.",
            ['diet_id' => $dietId]
        );
    }

    /**
     * Refeição adicionada à dieta
     */
    public static function mealAdded(User $user, $dietId, $dietName, $mealName)
    {
        return self::create(
            $user,
            'meal_added',
            "Nova refeição '{$mealName}' foi adicionada à dieta '{$dietName}'!",
            ['diet_id' => $dietId]
        );
    }

    /**
     * Alimento adicionado à refeição
     */
    public static function foodAdded(User $user, $dietId, $dietName, $foodName, $mealName)
    {
        return self::create(
            $user,
            'food_added',
            "'{$foodName}' foi adicionado à refeição '{$mealName}' da sua dieta!",
            ['diet_id' => $dietId]
        );
    }

    public static function userUpdate(User $user)
    {
        if ($user->id === auth()->user()->id) {
            return self::create(
                $user,
                'user_update',
                "Seus dados foram atualizados com sucesso!",
                []
            );
        } elseif ($user->id !== auth()->user()->id) {
            return self::create(
                $user,
                'user_update',
                "O usuário " . auth()->user()->name . " atualizou seus dados!",
                []
            );
        }
    }
}
