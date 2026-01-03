<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    use AuthorizesRequests;

    public function index(): Response
    {
        $notifications = auth()->user()->notifications()
            ->latest()
            ->paginate(20);

        return Inertia::render('Notifications/Index', [
            'notifications' => $notifications,
        ]);
    }

    public function markAsRead(Notification $notification)
    {
        $this->authorize('update', $notification);

        $notification->update([
            'is_read' => true,
            'read_at' => now(),
        ]);

        return back()->with('success', 'Notificação marcada como lida!');
    }

    public function markAllAsRead()
    {
        auth()->user()->notifications()
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now(),
            ]);

        return back()->with('success', 'Todas as notificações foram marcadas como lidas!');
    }

    public function destroy(Notification $notification)
    {
        $this->authorize('delete', $notification);

        $notification->delete();

        return back()->with('success', 'Notificação excluída!');
    }

    /**
     * Retorna contagem e últimas notificações não lidas (para polling)
     */
    public function getUnreadCount(Request $request)
    {
        $user = auth()->user();

        $unreadCount = $user->notifications()
            ->where('is_read', false)
            ->count();

        // Retorna as últimas notificações não lidas após o timestamp fornecido
        $lastChecked = $request->get('last_checked');
        $newNotifications = [];

        if ($lastChecked) {
            $newNotifications = $user->notifications()
                ->where('is_read', false)
                ->where('created_at', '>', $lastChecked)
                ->latest()
                ->take(5)
                ->get(['id', 'message', 'type', 'created_at']);
        }

        return response()->json([
            'unread_count' => $unreadCount,
            'new_notifications' => $newNotifications,
            'server_time' => now()->toISOString(),
        ]);
    }
}
