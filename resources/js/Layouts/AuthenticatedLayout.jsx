import { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Toast from '@/Components/Toast';
import { Bell, Sun, Moon, Menu, X } from 'lucide-react';
import { ThemeProvider, useTheme } from '@/Contexts/ThemeContext';
import axios from 'axios';

function AuthenticatedContent({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { unreadNotifications: initialUnread } = usePage().props;
    const { theme, toggleTheme } = useTheme();

    // Estado para polling de notificações
    const [unreadCount, setUnreadCount] = useState(initialUnread || 0);
    const [hasNewNotification, setHasNewNotification] = useState(false);
    const lastCheckedRef = useRef(new Date().toISOString());
    const pollIntervalRef = useRef(null);

    // Polling de notificações a cada 30 segundos
    useEffect(() => {
        const checkNotifications = async () => {
            try {
                const response = await axios.get(route('notifications.unread-count'), {
                    params: { last_checked: lastCheckedRef.current }
                });

                const { unread_count, new_notifications, server_time } = response.data;

                // Se houver novas notificações, mostrar indicador
                if (new_notifications && new_notifications.length > 0) {
                    setHasNewNotification(true);
                    // Som ou vibração opcional aqui
                    setTimeout(() => setHasNewNotification(false), 3000);
                }

                setUnreadCount(unread_count);
                lastCheckedRef.current = server_time;
            } catch (error) {
                console.error('Erro ao verificar notificações:', error);
            }
        };

        // Verificar imediatamente ao montar
        checkNotifications();

        // Configurar intervalo de 30 segundos
        pollIntervalRef.current = setInterval(checkNotifications, 10000);

        return () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
        };
    }, []);

    // Atualiza contador quando prop inicial muda (após navegação)
    useEffect(() => {
        setUnreadCount(initialUnread || 0);
    }, [initialUnread]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col min-h-screen">
                <div className="w-full flex flex-col flex-1">
                    {/* Header */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-700/50 py-4 bg-slate-50 dark:bg-slate-900 transition-colors">
                        {/* Logo */}
                        <Link href={route('dashboard')} className="flex items-center gap-3 group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-vivid-tangerine-500 to-vivid-tangerine-600 shadow-lg shadow-vivid-tangerine-500/25 group-hover:shadow-vivid-tangerine-500/40 transition-shadow">
                                <svg
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-deep-space-blue-500 dark:text-slate-100 text-xl font-bold leading-tight tracking-tight hidden sm:block">
                                NutriSystem
                            </h2>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            <Link
                                href={route('dashboard')}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${route().current('dashboard')
                                    ? 'bg-vivid-tangerine-500 text-white shadow-md shadow-vivid-tangerine-500/25'
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                            >
                                Dashboard
                            </Link>
                            {(user.role_id === 2 || user.role_id === 3) && (
                                <>
                                    <Link
                                        href={route('diets.index')}
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${route().current('diets.*')
                                            ? 'bg-vivid-tangerine-500 text-white shadow-md shadow-vivid-tangerine-500/25'
                                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                            }`}
                                    >
                                        Dietas
                                    </Link>
                                    <Link
                                        href={route('foods.index')}
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${route().current('foods.*')
                                            ? 'bg-vivid-tangerine-500 text-white shadow-md shadow-vivid-tangerine-500/25'
                                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                            }`}
                                    >
                                        Alimentos
                                    </Link>
                                    <Link
                                        href={route('invite-tokens.index')}
                                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${route().current('invite-tokens.*')
                                            ? 'bg-vivid-tangerine-500 text-white shadow-md shadow-vivid-tangerine-500/25'
                                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                            }`}
                                    >
                                        Convites
                                    </Link>
                                </>
                            )}
                            {user.role_id === 1 && (
                                <Link
                                    href={route('my-diet.index')}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${route().current('my-diet.*')
                                        ? 'bg-vivid-tangerine-500 text-white shadow-md shadow-vivid-tangerine-500/25'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    Minha Dieta
                                </Link>
                            )}
                            {user.role_id === 3 && (
                                <Link
                                    href={route('users.index')}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${route().current('users.*')
                                        ? 'bg-vivid-tangerine-500 text-white shadow-md shadow-vivid-tangerine-500/25'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    Usuários
                                </Link>
                            )}
                        </nav>

                        {/* User Actions */}
                        <div className="flex items-center gap-2">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="flex items-center justify-center h-10 w-10 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-200"
                                title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
                            >
                                {theme === 'light' ? (
                                    <Moon className="h-5 w-5" />
                                ) : (
                                    <Sun className="h-5 w-5" />
                                )}
                            </button>

                            {/* Notifications */}
                            <Link
                                href={route('notifications.index')}
                                className={`relative flex items-center justify-center h-10 w-10 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-200 ${hasNewNotification ? 'animate-pulse' : ''}`}
                            >
                                <Bell className={`h-5 w-5 ${hasNewNotification ? 'text-vivid-tangerine-500' : ''}`} />
                                {unreadCount > 0 && (
                                    <span className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-vivid-tangerine-500 text-xs font-bold text-white shadow-lg ${hasNewNotification ? 'animate-bounce' : ''}`}>
                                        {unreadCount > 99 ? '99+' : unreadCount}
                                    </span>
                                )}
                            </Link>

                            {/* Profile */}
                            <Link
                                href={route('profile.edit')}
                                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 text-slate-600 dark:text-slate-200 font-semibold text-sm">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-medium truncate max-w-[100px]">{user.name}</span>
                            </Link>

                            {/* Logout */}
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="hidden sm:flex items-center justify-center h-10 w-10 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
                                title="Sair"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                            </Link>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="flex md:hidden items-center justify-center h-10 w-10 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                            >
                                {showingNavigationDropdown ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </header>

                    {/* Mobile Navigation */}
                    <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} md:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 rounded-b-xl shadow-lg`}>
                        <div className="py-2 px-2">
                            <Link
                                href={route('dashboard')}
                                className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${route().current('dashboard')
                                    ? 'bg-vivid-tangerine-500 text-white'
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                    }`}
                            >
                                Dashboard
                            </Link>
                            {(user.role_id === 2 || user.role_id === 3) && (
                                <>
                                    <Link
                                        href={route('diets.index')}
                                        className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${route().current('diets.*')
                                            ? 'bg-vivid-tangerine-500 text-white'
                                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                            }`}
                                    >
                                        Dietas
                                    </Link>
                                    <Link
                                        href={route('foods.index')}
                                        className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${route().current('foods.*')
                                            ? 'bg-vivid-tangerine-500 text-white'
                                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                            }`}
                                    >
                                        Alimentos
                                    </Link>
                                    <Link
                                        href={route('invite-tokens.index')}
                                        className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${route().current('invite-tokens.*')
                                            ? 'bg-vivid-tangerine-500 text-white'
                                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                            }`}
                                    >
                                        Convites
                                    </Link>
                                </>
                            )}
                            {user.role_id === 1 && (
                                <Link
                                    href={route('my-diet.index')}
                                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${route().current('my-diet.*')
                                        ? 'bg-vivid-tangerine-500 text-white'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    Minha Dieta
                                </Link>
                            )}
                            {user.role_id === 3 && (
                                <Link
                                    href={route('users.index')}
                                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${route().current('users.*')
                                        ? 'bg-vivid-tangerine-500 text-white'
                                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    Usuários
                                </Link>
                            )}

                            <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>

                            {/* Mobile Profile */}
                            <Link
                                href={route('profile.edit')}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 text-slate-600 dark:text-slate-200 font-semibold text-sm">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-medium">{user.name}</span>
                            </Link>

                            {/* Mobile Logout */}
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 w-full"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span className="text-sm font-medium">Sair</span>
                            </Link>
                        </div>
                    </div>

                    {/* Page Content */}
                    <main className="flex-1 py-6 md:py-8">
                        {children}
                    </main>
                </div>
            </div>
            <Toast />
        </div>
    );
}

export default function Authenticated({ header, children }) {
    return (
        <ThemeProvider>
            <AuthenticatedContent header={header} children={children} />
        </ThemeProvider>
    );
}
