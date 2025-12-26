import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';

export default function Index({ diets }) {
    const handleDelete = (id, name) => {
        if (confirm(`Tem certeza que deseja deletar a dieta "${name}"?`)) {
            router.delete(route('diets.destroy', id));
        }
    };

    const toggleStatus = (diet) => {
        router.patch(route('diets.toggle-status', diet.id), {}, {
            preserveScroll: true,
            onSuccess: () => {
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dietas" />

            {/* Header Section */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex min-w-72 flex-col gap-1">
                    <h1 className="text-deep-space-blue-500 dark:text-slate-100 text-3xl md:text-4xl font-black leading-tight">
                        Gerenciar Dietas
                    </h1>
                    <p className="text-deep-space-blue-400 dark:text-slate-400 text-base font-normal leading-normal">
                        Navegue, visualize e gerencie as dietas cadastradas no sistema.
                    </p>
                </div>
                <Link
                    href={route('diets.create')}
                    className="flex items-center justify-center gap-2 min-w-[84px] cursor-pointer overflow-hidden rounded-lg h-11 px-6 bg-vivid-tangerine-500 text-white text-sm font-bold leading-normal hover:opacity-90 transition-opacity"
                >
                    <Plus className="h-5 w-5" />
                    <span className="truncate">Nova Dieta</span>
                </Link>
            </div>

            {/* Table Section */}
            <div className="overflow-hidden rounded-xl border border-deep-space-blue-500/20 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-colors">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50">
                                <th className="px-6 py-4 text-left text-deep-space-blue-400 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                                    Nome da Dieta
                                </th>
                                <th className="px-6 py-4 text-left text-deep-space-blue-400 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                                    Nutricionista
                                </th>
                                <th className="px-6 py-4 text-left text-deep-space-blue-400 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                                    Descrição
                                </th>
                                <th className="px-6 py-4 text-left text-deep-space-blue-400 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                                    Situação
                                </th>
                                <th className="px-6 py-4 text-left text-deep-space-blue-400 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-deep-space-blue-500/10 dark:divide-slate-700">
                            {diets && diets.length > 0 ? (
                                diets.map((diet) => (
                                    <tr
                                        key={diet.id}
                                        className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-deep-space-blue-500 dark:text-slate-100">
                                                {diet.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-deep-space-blue-400 dark:text-slate-300">
                                            {diet.nutritionist?.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-deep-space-blue-400 dark:text-slate-300 line-clamp-2 max-w-md">
                                                {diet.description || 'Sem descrição'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onDoubleClick={() => toggleStatus(diet)}
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all hover:scale-105 ${diet.is_active
                                                        ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-500/30'
                                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                                                    }`}
                                                title="Clique duas vezes para alterar"
                                            >
                                                {diet.is_active ? 'Ativa' : 'Inativa'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-4">
                                                <Link
                                                    href={route('diets.show', diet.id)}
                                                    className="text-deep-space-blue-500 dark:text-slate-300 hover:text-deep-space-blue-600 dark:hover:text-slate-100 transition-colors"
                                                    aria-label={`Visualizar ${diet.name}`}
                                                >
                                                    <Eye className="h-5 w-5" />
                                                </Link>
                                                <Link
                                                    href={route('diets.edit', diet.id)}
                                                    className="text-vivid-tangerine-500 hover:text-vivid-tangerine-600 transition-colors"
                                                    aria-label={`Editar ${diet.name}`}
                                                >
                                                    <Pencil className="h-5 w-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(diet.id, diet.name)}
                                                    className="text-flag-red-500 hover:text-flag-red-600 transition-colors"
                                                    aria-label={`Deletar ${diet.name}`}
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
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
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-deep-space-blue-500 dark:text-slate-100 font-semibold mb-1">
                                                    Nenhuma dieta encontrada
                                                </p>
                                                <p className="text-deep-space-blue-400 dark:text-slate-400 text-sm mb-4">
                                                    Comece criando uma nova dieta.
                                                </p>
                                                <Link
                                                    href={route('diets.create')}
                                                    className="inline-flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-vivid-tangerine-500 text-white text-sm font-bold hover:opacity-90 transition-opacity"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Nova Dieta
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Info Footer */}
                {diets && diets.length > 0 && (
                    <div className="flex items-center justify-between p-4 border-t border-deep-space-blue-500/10 dark:border-slate-700">
                        <div className="text-sm text-deep-space-blue-400 dark:text-slate-400">
                            Mostrando <span className="font-bold">{diets.length}</span> dieta(s)
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
