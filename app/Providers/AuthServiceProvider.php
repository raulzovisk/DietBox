<?php

namespace App\Providers;

use App\Models\Diet;
use App\Models\Notification;
use App\Policies\DietPolicy;
use App\Policies\NotificationPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Diet::class => DietPolicy::class,
        Notification::class => NotificationPolicy::class,
    ];

    public function boot(): void
    {
        //
    }
}
