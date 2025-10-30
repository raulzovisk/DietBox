import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Bell, Check, CheckCheck } from 'lucide-react';

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

    const unreadCount = notifications.data.filter(n => !n.is_read).length;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Notificações
                    </h2>
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllAsRead}
                            className="inline-flex items-center gap-2 rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 transition-colors"
                        >
                            <CheckCheck className="h-4 w-4" />
                            Marcar todas como lidas
                        </button>
                    )}
                </div>
            }
        >
            <Head title="Notificações" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {notifications.data.length === 0 ? (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-center text-gray-500">
                                <Bell className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                                <h3 className="mb-2 text-lg font-semibold text-gray-700">
                                    Nenhuma notificação
                                </h3>
                                <p>Você não possui notificações no momento.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {notifications.data.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`overflow-hidden shadow-sm sm:rounded-lg transition-colors ${notification.is_read
                                            ? 'bg-white'
                                            : 'bg-amber-50 border-l-4 border-amber-500'
                                        }`}
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <Bell className={`h-5 w-5 ${notification.is_read
                                                            ? 'text-gray-400'
                                                            : 'text-amber-600'
                                                        }`} />
                                                    <span className="text-xs text-gray-500">
                                                        {notification.type}
                                                    </span>
                                                    {!notification.is_read && (
                                                        <span className="rounded-full bg-amber-600 px-2 py-0.5 text-xs font-semibold text-white">
                                                            Nova
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="mt-2 text-gray-800">
                                                    {notification.message}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {new Date(notification.created_at).toLocaleString('pt-BR')}
                                                </p>

                                                {notification.data && notification.data.diet_id && (
                                                    <Link
                                                        href={route('my-diet.index')}
                                                        className="mt-3 inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700"
                                                    >
                                                        Ver minha dieta →
                                                    </Link>
                                                )}
                                            </div>

                                            {!notification.is_read && (
                                                <button
                                                    onClick={() => handleMarkAsRead(notification.id)}
                                                    className="ml-4 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                                                    title="Marcar como lida"
                                                >
                                                    <Check className="h-5 w-5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Paginação */}
                    {notifications.links && notifications.links.length > 3 && (
                        <div className="mt-6 flex justify-center gap-2">
                            {notifications.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    preserveScroll
                                    className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${link.active
                                            ? 'bg-amber-600 text-white'
                                            : link.url
                                                ? 'bg-white text-gray-700 hover:bg-gray-50'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
