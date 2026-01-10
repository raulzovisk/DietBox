<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\InviteToken;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the token entry view.
     */
    public function showTokenForm(): Response
    {
        return Inertia::render('Auth/EnterToken');
    }

    /**
     * Validate the token and redirect to registration.
     */
    public function validateToken(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        $inviteToken = InviteToken::where('token', $request->token)->first();

        if (!$inviteToken) {
            return back()->withErrors([
                'token' => 'Token de convite inválido.',
            ]);
        }

        if ($inviteToken->used_at) {
            return back()->withErrors([
                'token' => 'Este token já foi utilizado.',
            ]);
        }

        if ($inviteToken->expires_at && $inviteToken->expires_at < now()) {
            return back()->withErrors([
                'token' => 'Este token expirou.',
            ]);
        }

        // Store token in session and redirect to register form
        return redirect()->route('register.form', ['token' => $inviteToken->token]);
    }

    /**
     * Display the registration view with token info.
     */
    public function create(Request $request, string $token): Response
    {
        $inviteToken = InviteToken::where('token', $token)->first();

        if (!$inviteToken || $inviteToken->used_at || ($inviteToken->expires_at && $inviteToken->expires_at < now())) {
            return Inertia::render('Auth/EnterToken', [
                'error' => 'Token inválido ou expirado. Por favor, insira um token válido.',
            ]);
        }

        $roleLabel = $inviteToken->role_type === 2 ? 'Nutricionista' : 'Usuário';

        return Inertia::render('Auth/Register', [
            'token' => $token,
            'roleType' => $inviteToken->role_type,
            'roleLabel' => $roleLabel,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => 'required|string',
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Find and validate the token
        $inviteToken = InviteToken::where('token', $request->token)->first();

        if (!$inviteToken) {
            return back()->withErrors([
                'token' => 'Token de convite inválido.',
            ]);
        }

        if ($inviteToken->used_at) {
            return back()->withErrors([
                'token' => 'Este token já foi utilizado.',
            ]);
        }

        if ($inviteToken->expires_at && $inviteToken->expires_at < now()) {
            return back()->withErrors([
                'token' => 'Este token expirou.',
            ]);
        }

        // Create the user with the role from the token
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $inviteToken->role_type, // Use role_type from token
        ]);

        // Mark the token as used
        $inviteToken->update([
            'used_by' => $user->id,
            'used_at' => now(),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
