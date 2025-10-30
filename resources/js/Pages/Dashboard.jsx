import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Apple, Users, ClipboardList } from 'lucide-react';

export default function Dashboard({ auth }) {
    const isUser = auth.user.role_id === 1;
    const isNutritionist = auth.user.role_id === 2;
    const isAdmin = auth.user.role_id === 3;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-bold text-gray-800">
                                Olá, {auth.user.name}!
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Bem-vindo ao sistema de gerenciamento de dietas.
                            </p>
                        </div>
                    </div>

                    {/* Menu de acesso rápido para Usuários */}
                    {isUser && (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Link
                                href={route('my-diet.index')}
                                className="overflow-hidden bg-white shadow-sm sm:rounded-lg hover:shadow-md transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-lg bg-amber-100 p-3">
                                            <Calendar className="h-8 w-8 text-amber-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                Minha Dieta
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Visualize sua dieta diária
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                href={route('notifications.index')}
                                className="overflow-hidden bg-white shadow-sm sm:rounded-lg hover:shadow-md transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-lg bg-blue-100 p-3">
                                            <ClipboardList className="h-8 w-8 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                Notificações
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Veja suas notificações
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Menu de acesso rápido para Nutricionistas */}
                    {isNutritionist && (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Link
                                href={route('diets.index')}
                                className="overflow-hidden bg-white shadow-sm sm:rounded-lg hover:shadow-md transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-lg bg-amber-100 p-3">
                                            <Calendar className="h-8 w-8 text-amber-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                Minhas Dietas
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Gerencie dietas criadas
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                href={route('diets.create')}
                                className="overflow-hidden bg-white shadow-sm sm:rounded-lg hover:shadow-md transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-lg bg-green-100 p-3">
                                            <ClipboardList className="h-8 w-8 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                Nova Dieta
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Criar nova dieta
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                href={route('foods.index')}
                                className="overflow-hidden bg-white shadow-sm sm:rounded-lg hover:shadow-md transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-lg bg-purple-100 p-3">
                                            <Apple className="h-8 w-8 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                Alimentos
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Banco de alimentos
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Menu de acesso rápido para Administradores */}
                    {isAdmin && (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <Link
                                href={route('diets.index')}
                                className="overflow-hidden bg-white shadow-sm sm:rounded-lg hover:shadow-md transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-lg bg-amber-100 p-3">
                                            <Calendar className="h-8 w-8 text-amber-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                Todas as Dietas
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Gerencie todas as dietas
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                href={route('foods.index')}
                                className="overflow-hidden bg-white shadow-sm sm:rounded-lg hover:shadow-md transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-lg bg-purple-100 p-3">
                                            <Apple className="h-8 w-8 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                Alimentos
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Banco de alimentos
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                href="#"
                                className="overflow-hidden bg-white shadow-sm sm:rounded-lg hover:shadow-md transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-lg bg-blue-100 p-3">
                                            <Users className="h-8 w-8 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                Usuários
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Gerenciar usuários
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                href={route('notifications.index')}
                                className="overflow-hidden bg-white shadow-sm sm:rounded-lg hover:shadow-md transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="rounded-lg bg-green-100 p-3">
                                            <ClipboardList className="h-8 w-8 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                Notificações
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Ver notificações
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Informações gerais */}
                    <div className="mt-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="mb-4 text-lg font-semibold text-gray-800">
                                Informações do Sistema
                            </h3>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="rounded-lg bg-gray-50 p-4">
                                    <p className="text-sm text-gray-600">Seu Perfil</p>
                                    <p className="mt-1 text-xl font-bold text-gray-800">
                                        {auth.user.role_id === 1 && 'Usuário'}
                                        {auth.user.role_id === 2 && 'Nutricionista'}
                                        {auth.user.role_id === 3 && 'Administrador'}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-4">
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="mt-1 text-lg font-semibold text-gray-800">
                                        {auth.user.email}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-4">
                                    <p className="text-sm text-gray-600">Membro desde</p>
                                    <p className="mt-1 text-lg font-semibold text-gray-800">
                                        {new Date(auth.user.created_at).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
