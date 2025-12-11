import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Bell, Check, CheckCheck, Trash2, X } from 'lucide-react';

export default function Index({ notifications }) {
    const handleMarkAsRead = (notificationId) => {
        router.patch(route('notifications.read', notificationId), {}, {
            preserveScroll: true,
        });
    };

    const handleMarkAllAsRead = () => {
        router.post(route('notifications.mark-all-read'), {}, {
            preserveScroll: true,
        });
    };

    const handleDelete = (notificationId) => {
        if (confirm('Deseja excluir esta notificação?')) {
            router.delete(route('notifications.destroy', notificationId), {
                preserveScroll: true,
            });
        }
    };

    const unreadCount = notifications.data.filter(n => !n.is_read).length;

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'diet_assigned':
                return '🍽️';
            case 'diet_updated':
                return '✏️';
            case 'diet_removed':
                return '🚫';
            case 'diet_activated':
                return '✅';
            case 'diet_deactivated':
                return '⏸️';
            case 'meal_added':
                return '🍴';
            case 'food_added':
                return '🥗';
            case 'system':
                return '⚙️';
            default:
                return '📢';
        }
    };


    return (
        <AuthenticatedLayout>
            <Head title="Notificações" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-deep-space-blue-500 text-3xl md:text-4xl font-black leading-tight">
                            Notificações
                        </h1>
                        <p className="text-deep-space-blue-400 text-base font-normal leading-normal mt-1">
                            {unreadCount > 0
                                ? `Você tem ${unreadCount} notificação${unreadCount > 1 ? 'ões' : ''} não lida${unreadCount > 1 ? 's' : ''}`
                                : 'Todas as notificações foram lidas'}
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="flex items-center gap-2 rounded-lg h-10 px-4 bg-vivid-tangerine-500 text-white text-sm font-bold hover:opacity-90 transition-opacity"
                        >
                            <CheckCheck className="h-4 w-4" />
                            Marcar todas como lidas
                        </button>
                    )}
                </div>

                {/* Lista de Notificações */}
                {notifications.data.length === 0 ? (
                    <div className="rounded-xl bg-white p-12 shadow-sm border border-deep-space-blue-500/20 text-center">
                        <Bell className="mx-auto mb-4 h-16 w-16 text-deep-space-blue-300" />
                        <h3 className="mb-2 text-lg font-semibold text-deep-space-blue-500">
                            Nenhuma notificação
                        </h3>
                        <p className="text-deep-space-blue-400">
                            Você não possui notificações no momento.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {notifications.data.map((notification) => (
                            <div
                                key={notification.id}
                                className={`rounded-xl overflow-hidden shadow-sm transition-all ${notification.is_read
                                        ? 'bg-white border border-slate-200'
                                        : 'bg-vivid-tangerine-50 border-2 border-vivid-tangerine-500'
                                    }`}
                            >
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        {/* Ícone */}
                                        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-2xl ${notification.is_read
                                                ? 'bg-slate-100'
                                                : 'bg-vivid-tangerine-100'
                                            }`}>
                                            {getNotificationIcon(notification.type)}
                                        </div>

                                        {/* Conteúdo */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-xs font-medium text-deep-space-blue-400 uppercase tracking-wider">
                                                        {notification.type.replace('_', ' ')}
                                                    </span>
                                                    {!notification.is_read && (
                                                        <span className="rounded-full bg-vivid-tangerine-500 px-2 py-0.5 text-xs font-semibold text-white">
                                                            Nova
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-deep-space-blue-400 whitespace-nowrap">
                                                    {new Date(notification.created_at).toLocaleString('pt-BR', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>

                                            <p className="text-slate-800 mb-3 leading-relaxed">
                                                {notification.message}
                                            </p>

                                            {/* Ações */}
                                            <div className="flex items-center gap-3">
                                                {notification.data?.diet_id && (
                                                    <Link
                                                        href={route('my-diet.index')}
                                                        className="text-sm font-medium text-vivid-tangerine-600 hover:text-vivid-tangerine-700 hover:underline"
                                                    >
                                                        Ver minha dieta →
                                                    </Link>
                                                )}

                                                {!notification.is_read && (
                                                    <button
                                                        onClick={() => handleMarkAsRead(notification.id)}
                                                        className="text-sm font-medium text-deep-space-blue-500 hover:text-deep-space-blue-600 flex items-center gap-1"
                                                        title="Marcar como lida"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                        Marcar como lida
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => handleDelete(notification.id)}
                                                    className="text-sm font-medium text-flag-red-500 hover:text-flag-red-600 flex items-center gap-1 ml-auto"
                                                    title="Excluir notificação"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    Excluir
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Paginação */}
                {notifications.links && notifications.links.length > 3 && (
                    <div className="flex justify-center gap-2 mt-6">
                        {notifications.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                preserveScroll
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${link.active
                                        ? 'bg-vivid-tangerine-500 text-white'
                                        : link.url
                                            ? 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
