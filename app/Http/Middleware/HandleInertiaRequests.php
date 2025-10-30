<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'role_id' => $request->user()->role_id,
                    'created_at' => $request->user()->created_at,
                ] : null,
            ],
            'unreadNotifications' => $request->user() 
                ? $request->user()->notifications()->where('is_read', false)->count() 
                : 0,
        ]);
    }
}
