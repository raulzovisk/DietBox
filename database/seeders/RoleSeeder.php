<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::create(['name' => 'user', 'description' => 'Usuário comum']);
        Role::create(['name' => 'nutritionist', 'description' => 'Nutricionista']);
        Role::create(['name' => 'admin', 'description' => 'Administrador']);
    }
}
