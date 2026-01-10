<?php

namespace App\Http\Controllers;

use App\Models\InviteToken;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InviteTokenController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->isAdmin()) {
            $inviteTokens = InviteToken::with('createdBy', 'usedBy')->orderBy('created_at', 'desc')->get();
        } else {
            $inviteTokens = InviteToken::where('created_by', $user->id)
                ->with('createdBy', 'usedBy')
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return Inertia::render('InviteTokens/Index', [
            'inviteTokens' => $inviteTokens,
            'isAdmin' => $user->isAdmin(),
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('InviteTokens/Create');
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'expires_at' => 'nullable|date|after:now',
            'role_type' => 'nullable|integer|in:1,2',
        ]);

        $roleType = 1;
        if ($user->isAdmin() && isset($validated['role_type'])) {
            $roleType = $validated['role_type'];
        }

        $invite = InviteToken::create([
            'token' => bin2hex(random_bytes(32)),
            'role_type' => $roleType,
            'created_by' => $user->id,
            'expires_at' => $validated['expires_at'] ?? null,
        ]);

        return redirect()->route('invite-tokens.index')
            ->with('success', 'Token de convite criado com sucesso!');
    }

    public function edit(InviteToken $inviteToken)
    {
        return Inertia::render('InviteTokens/Edit', [
            'inviteToken' => $inviteToken,
        ]);
    }

    public function update(Request $request, InviteToken $inviteToken)
    {
        $validated = $request->validate([
            'token' => 'required|string|max:64|unique:invite_tokens',
            'created_by' => 'required|exists:users,id',
            'used_by' => 'nullable|exists:users,id',
            'used_at' => 'nullable|date',
            'expires_at' => 'nullable|date',
        ]);

        $inviteToken->update($validated);

        return redirect()->route('invite-tokens.index')
            ->with('success', 'Token de convite atualizado com sucesso!');
    }

    public function destroy(InviteToken $inviteToken)
    {
        $inviteToken->delete();

        return redirect()->route('invite-tokens.index')
            ->with('success', 'Token de convite excluído com sucesso!');
    }
}