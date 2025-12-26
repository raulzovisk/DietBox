import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Pencil, Lock, Unlock, Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Index({ users, filters, roles }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/users', { search }, { preserveState: true });
    };

    const handleBlock = (id) => {
        if (confirm('Tem certeza que deseja bloquear este usuário?')) {
            router.delete(`/users/${id}`);
        }
    };

    const handleUnblock = (id) => {
        if (confirm('Tem certeza que deseja desbloquear este usuário?')) {
            router.post(`/users/${id}/restore`);
        }
    };

    const getRoleName = (roleId) => {
        const roleNames = {
            1: 'Usuário',
            2: 'Nutricionista',
            3: 'Administrador',
        };
        return roleNames[roleId] || 'Desconhecido';
    };

    const getRoleBadgeColor = (roleId) => {
        const colors = {
            1: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
            2: 'bg-vivid-tangerine-100 dark:bg-vivid-tangerine-500/20 text-vivid-tangerine-600 dark:text-vivid-tangerine-400',
            3: 'bg-flag-red-100 dark:bg-flag-red-500/20 text-flag-red-600 dark:text-flag-red-400',
        };
        return colors[roleId] || 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
    };

    const usersData = users?.data || [];

    return (
        <AuthenticatedLayout>
            <Head title="Gerenciar Usuários" />

            {/* Header Section */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex min-w-72 flex-col gap-1">
                    <h1 className="text-deep-space-blue-500 dark:text-slate-100 text-3xl md:text-4xl font-black leading-tight">
                        Gerenciar Usuários
                    </h1>
                    <p className="text-deep-space-blue-400 dark:text-slate-400 text-base font-normal leading-normal">
                        Visualize, pesquise e gerencie os usuários do sistema.
                    </p>
                </div>
            </div>

            {/* Search Section */}
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
                <label className="flex flex-col min-w-40 h-12 w-full flex-1">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-deep-space-blue-500/20 dark:border-slate-600 bg-white dark:bg-slate-800">
                        <div className="text-deep-space-blue-400 dark:text-slate-400 flex items-center justify-center pl-4">
                            <Search className="h-5 w-5" />
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-deep-space-blue-500 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-vivid-tangerine-500/50 border-none bg-white dark:bg-slate-800 h-full placeholder:text-deep-space-blue-400 dark:placeholder:text-slate-500 px-2 text-base font-normal leading-normal"
                            placeholder="Pesquisar por nome ou email..."
                        />
                    </div>
                </label>
                <button
                    type="submit"
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-vivid-tangerine-500/20 text-vivid-tangerine-500 text-sm font-bold leading-normal hover:bg-vivid-tangerine-500/30 transition-colors"
                >
                    <span className="truncate">Pesquisar</span>
                </button>
            </form>

            {/* Table Section */}
            <div className="overflow-hidden rounded-xl border border-deep-space-blue-500/20 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-colors">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50">
                                <th className="px-6 py-4 text-left text-deep-space-blue-400 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                                    Nome
                                </th>
                                <th className="px-6 py-4 text-left text-deep-space-blue-400 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-deep-space-blue-400 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                                    Função
                                </th>
                                <th className="px-6 py-4 text-left text-deep-space-blue-400 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-deep-space-blue-400 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                                    Criado em
                                </th>
                                <th className="px-6 py-4 text-left text-deep-space-blue-400 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-deep-space-blue-500/10 dark:divide-slate-700">
                            {usersData.length > 0 ? (
                                usersData.map((user) => (
                                    <tr
                                        key={user.id}
                                        className={`hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${user.deleted_at ? 'opacity-60' : ''}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-deep-space-blue-500 dark:text-slate-100">
                                                {user.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-deep-space-blue-400 dark:text-slate-300">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-5 ${getRoleBadgeColor(user.role_id)}`}>
                                                {getRoleName(user.role_id)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {user.deleted_at ? (
                                                <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-5 bg-flag-red-100 dark:bg-flag-red-500/20 text-flag-red-600 dark:text-flag-red-400">
                                                    Bloqueado
                                                </span>
                                            ) : (
                                                <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-5 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400">
                                                    Ativo
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-deep-space-blue-400 dark:text-slate-300">
                                            {new Date(user.created_at).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-4">
                                                {!user.deleted_at && (
                                                    <Link
                                                        href={route('users.edit', user.id)}
                                                        className="text-vivid-tangerine-500 hover:underline transition-all"
                                                        aria-label={`Editar ${user.name}`}
                                                    >
                                                        <Pencil className="h-5 w-5" />
                                                    </Link>
                                                )}
                                                {user.deleted_at ? (
                                                    <button
                                                        onClick={() => handleUnblock(user.id)}
                                                        className="text-green-500 hover:text-green-600 transition-all"
                                                        aria-label={`Desbloquear ${user.name}`}
                                                        title="Desbloquear usuário"
                                                    >
                                                        <Unlock className="h-5 w-5" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleBlock(user.id)}
                                                        className="text-flag-red-500 hover:text-flag-red-600 transition-all"
                                                        aria-label={`Bloquear ${user.name}`}
                                                        title="Bloquear usuário"
                                                    >
                                                        <Lock className="h-5 w-5" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-12 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <div className="rounded-full bg-slate-100 dark:bg-slate-700 p-4">
                                                <svg
                                                    className="h-12 w-12 text-deep-space-blue-400 dark:text-slate-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-deep-space-blue-500 dark:text-slate-100 font-semibold mb-1">
                                                    Nenhum usuário encontrado
                                                </p>
                                                <p className="text-deep-space-blue-400 dark:text-slate-400 text-sm">
                                                    Tente ajustar os filtros de pesquisa.
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                {usersData.length > 0 && (
                    <div className="flex items-center justify-between p-4 border-t border-deep-space-blue-500/10 dark:border-slate-700">
                        <div className="text-sm text-deep-space-blue-400 dark:text-slate-400">
                            Página <span className="font-bold">{users.current_page}</span> de{' '}
                            <span className="font-bold">{users.last_page}</span>
                        </div>
                        <div className="flex items-center justify-center">
                            {/* Previous Button */}
                            {users.prev_page_url ? (
                                <Link
                                    href={users.prev_page_url}
                                    preserveState
                                    className="flex size-10 items-center justify-center text-deep-space-blue-400 dark:text-slate-400 hover:text-deep-space-blue-500 dark:hover:text-slate-100 transition-colors"
                                    aria-label="Página Anterior"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Link>
                            ) : (
                                <span className="flex size-10 items-center justify-center text-deep-space-blue-300 dark:text-slate-600 cursor-not-allowed">
                                    <ChevronLeft className="h-5 w-5" />
                                </span>
                            )}

                            {/* Page Numbers */}
                            {[...Array(users.last_page)].map((_, index) => {
                                const pageNumber = index + 1;
                                if (
                                    pageNumber === 1 ||
                                    pageNumber === users.last_page ||
                                    (pageNumber >= users.current_page - 1 && pageNumber <= users.current_page + 1)
                                ) {
                                    return (
                                        <Link
                                            key={pageNumber}
                                            href={`/users?page=${pageNumber}`}
                                            preserveState
                                            className={`text-sm font-${pageNumber === users.current_page ? 'bold' : 'normal'
                                                } leading-normal flex size-10 items-center justify-center rounded-full transition-colors ${pageNumber === users.current_page
                                                    ? 'text-white bg-vivid-tangerine-500'
                                                    : 'text-deep-space-blue-400 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'
                                                }`}
                                        >
                                            {pageNumber}
                                        </Link>
                                    );
                                } else if (
                                    pageNumber === users.current_page - 2 ||
                                    pageNumber === users.current_page + 2
                                ) {
                                    return (
                                        <span
                                            key={pageNumber}
                                            className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-deep-space-blue-400 dark:text-slate-400 rounded-full"
                                        >
                                            ...
                                        </span>
                                    );
                                }
                                return null;
                            })}

                            {/* Next Button */}
                            {users.next_page_url ? (
                                <Link
                                    href={users.next_page_url}
                                    preserveState
                                    className="flex size-10 items-center justify-center text-deep-space-blue-400 dark:text-slate-400 hover:text-deep-space-blue-500 dark:hover:text-slate-100 transition-colors"
                                    aria-label="Próxima Página"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Link>
                            ) : (
                                <span className="flex size-10 items-center justify-center text-deep-space-blue-300 dark:text-slate-600 cursor-not-allowed">
                                    <ChevronRight className="h-5 w-5" />
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
