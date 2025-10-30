<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        User::create([
            'name' => 'Administrador',
            'email' => 'admin@exemplo.com',
            'password' => Hash::make('password'),
            'role_id' => 3,
        ]);

        // Nutricionista
        User::create([
            'name' => 'Dr. Carlos Silva',
            'email' => 'nutricionista@exemplo.com',
            'password' => Hash::make('password'),
            'role_id' => 2,
        ]);

        // Usuários comuns
        User::create([
            'name' => 'João Santos',
            'email' => 'joao@exemplo.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
        ]);

        User::create([
            'name' => 'Maria Oliveira',
            'email' => 'maria@exemplo.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
        ]);
    }
}
