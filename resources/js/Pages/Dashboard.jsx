import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Apple, Users, ClipboardList } from 'lucide-react';

export default function Dashboard({ auth }) {
    const isUser = auth.user.role_id === 1;
    const isNutritionist = auth.user.role_id === 2;
    const isAdmin = auth.user.role_id === 3;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Welcome Card */}
                <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
                    <h2 className="text-xl font-semibold text-slate-800">
                        Olá, {isUser && 'Usuário'}
                        {isNutritionist && 'Nutricionista'}
                        {isAdmin && 'Administrador'}!
                    </h2>
                    <p className="mt-1 text-slate-500">
                        Bem-vindo ao sistema de gerenciamento de dietas.
                    </p>
                </div>

                {/* User Cards */}
                {isUser && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Link
                            href={route('my-diet.index')}
                            className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-vivid-tangerine-500/50 transition-all"
                        >
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-vivid-tangerine-500/10 text-vivid-tangerine-500">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800">Minha Dieta</h3>
                                <p className="text-sm text-slate-500">Visualize sua dieta diária</p>
                            </div>
                        </Link>

                        <div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-vivid-tangerine-500/50 transition-all cursor-pointer">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-vivid-tangerine-500/10 text-vivid-tangerine-500">
                                <ClipboardList className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800">Notificações</h3>
                                <p className="text-sm text-slate-500">Veja suas notificações</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Nutritionist Cards */}
                {isNutritionist && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Link
                            href={route('diets.index')}
                            className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-vivid-tangerine-500/50 transition-all"
                        >
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-vivid-tangerine-500/10 text-vivid-tangerine-500">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800">Minhas Dietas</h3>
                                <p className="text-sm text-slate-500">Gerencie dietas criadas</p>
                            </div>
                        </Link>

                        <Link
                            href={route('diets.create')}
                            className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-vivid-tangerine-500/50 transition-all"
                        >
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-vivid-tangerine-500/10 text-vivid-tangerine-500">
                                <ClipboardList className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800">Nova Dieta</h3>
                                <p className="text-sm text-slate-500">Criar nova dieta</p>
                            </div>
                        </Link>

                        <Link
                            href={route('foods.index')}
                            className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-vivid-tangerine-500/50 transition-all"
                        >
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-vivid-tangerine-500/10 text-vivid-tangerine-500">
                                <Apple className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800">Alimentos</h3>
                                <p className="text-sm text-slate-500">Banco de alimentos</p>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Admin Cards */}
                {isAdmin && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <Link
                            href={route('diets.index')}
                            className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-vivid-tangerine-500/50 transition-all"
                        >
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-vivid-tangerine-500/10 text-vivid-tangerine-500">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800">Todas as Dietas</h3>
                                <p className="text-sm text-slate-500">Gerencie todas as dietas</p>
                            </div>
                        </Link>

                        <Link
                            href={route('foods.index')}
                            className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-vivid-tangerine-500/50 transition-all"
                        >
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-vivid-tangerine-500/10 text-vivid-tangerine-500">
                                <Apple className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800">Alimentos</h3>
                                <p className="text-sm text-slate-500">Banco de alimentos</p>
                            </div>
                        </Link>

                        <Link
                            href={route('notifications.index')}
                            className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-vivid-tangerine-500/50 transition-all cursor-pointer"
                        >
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-vivid-tangerine-500/10 text-vivid-tangerine-500">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800">Usuários</h3>
                                <p className="text-sm text-slate-500">Gerenciar usuários</p>
                            </div>
                        </Link>

                       <Link
                            href={route('notifications.index')}
                            className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-vivid-tangerine-500/50 transition-all cursor-pointer"
                        >
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-vivid-tangerine-500/10 text-vivid-tangerine-500">
                                <ClipboardList className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800">Notificações</h3>
                                <p className="text-sm text-slate-500">Ver notificações</p>
                            </div>
                        </Link>
                    </div>
                )}

                {/* User Info Card */}
                <div className="rounded-lg bg-white p-6 shadow-sm border border-slate-200">
                    <h2 className="text-lg font-semibold text-vivid-tangerine-500 mb-4">
                        Informações do Sistema
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div>
                            <p className="text-sm text-slate-500">Seu Perfil</p>
                            <p className="font-semibold text-slate-800">
                                {auth.user.role_id === 1 && 'Usuário'}
                                {auth.user.role_id === 2 && 'Nutricionista'}
                                {auth.user.role_id === 3 && 'Administrador'}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Email</p>
                            <p className="font-semibold text-slate-800">{auth.user.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Membro desde</p>
                            <p className="font-semibold text-slate-800">
                                {new Date(auth.user.created_at).toLocaleDateString('pt-BR')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
