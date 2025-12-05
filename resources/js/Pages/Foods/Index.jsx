import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Index({ foods, filters }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/foods', { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja deletar este alimento?')) {
            router.delete(`/foods/${id}`);
        }
    };

    const foodsData = foods?.data || [];

    return (
        <AuthenticatedLayout>
            <Head title="Alimentos" />

            {/* Header Section */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex min-w-72 flex-col gap-1">
                    <h1 className="text-deep-space-blue-500 text-3xl md:text-4xl font-black leading-tight">
                        Gerenciar Alimentos
                    </h1>
                    <p className="text-deep-space-blue-400 text-base font-normal leading-normal">
                        Navegue, pesquise e gerencie os alimentos no banco de dados.
                    </p>
                </div>
                <Link
                    href={route('foods.create')}
                    className="flex items-center justify-center gap-2 min-w-[84px] cursor-pointer overflow-hidden rounded-lg h-11 px-6 bg-vivid-tangerine-500 text-white text-sm font-bold leading-normal hover:opacity-90 transition-opacity"
                >
                    <Plus className="h-5 w-5" />
                    <span className="truncate">Novo Alimento</span>
                </Link>
            </div>

            {/* Search Section */}
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
                <label className="flex flex-col min-w-40 h-12 w-full flex-1">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-deep-space-blue-500/20 bg-white">
                        <div className="text-deep-space-blue-400 flex items-center justify-center pl-4">
                            <Search className="h-5 w-5" />
                        </div>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-deep-space-blue-500 focus:outline-0 focus:ring-2 focus:ring-vivid-tangerine-500/50 border-none bg-white h-full placeholder:text-deep-space-blue-400 px-2 text-base font-normal leading-normal"
                            placeholder="Pesquisar por um alimento..."
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
            <div className="overflow-hidden rounded-xl border border-deep-space-blue-500/20 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="px-6 py-4 text-left text-deep-space-blue-400 text-xs font-medium uppercase tracking-wider">
                                    Nome
                                </th>
                                <th className="px-6 py-4 text-left text-deep-space-blue-400 text-xs font-medium uppercase tracking-wider">
                                    Categoria
                                </th>
                                <th className="px-6 py-4 text-left text-deep-space-blue-400 text-xs font-medium uppercase tracking-wider">
                                    Calorias (100g)
                                </th>
                                <th className="px-6 py-4 text-left text-deep-space-blue-400 text-xs font-medium uppercase tracking-wider">
                                    Proteínas (g)
                                </th>
                                <th className="px-6 py-4 text-left text-deep-space-blue-400 text-xs font-medium uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-deep-space-blue-500/10">
                            {foodsData.length > 0 ? (
                                foodsData.map((food) => (
                                    <tr
                                        key={food.id}
                                        className="hover:bg-black/5 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-deep-space-blue-500">
                                                {food.name}
                                            </div>
                                            {food.description && (
                                                <div className="text-xs text-deep-space-blue-400">
                                                    {food.description.substring(0, 50)}...
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-deep-space-blue-400">
                                            {food.category ? (
                                                <span className="inline-flex rounded-full bg-vivid-tangerine-100 px-2 text-xs font-semibold leading-5 text-vivid-tangerine-600">
                                                    {food.category}
                                                </span>
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-deep-space-blue-400">
                                            {food.calories_per_100g ? `${food.calories_per_100g} kcal` : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-deep-space-blue-400">
                                            {food.protein_per_100g ? `${food.protein_per_100g}g` : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center gap-4">
                                                <Link
                                                    href={route('foods.edit', food.id)}
                                                    className="text-vivid-tangerine-500 hover:underline transition-all"
                                                    aria-label={`Editar ${food.name}`}
                                                >
                                                    <Pencil className="h-5 w-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(food.id)}
                                                    className="text-flag-red-500 hover:underline transition-all"
                                                    aria-label={`Deletar ${food.name}`}
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
                                            <div className="rounded-full bg-slate-100 p-4">
                                                <svg
                                                    className="h-12 w-12 text-deep-space-blue-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-deep-space-blue-500 font-semibold mb-1">
                                                    Nenhum alimento encontrado
                                                </p>
                                                <p className="text-deep-space-blue-400 text-sm mb-4">
                                                    Comece adicionando um novo alimento.
                                                </p>
                                                <Link
                                                    href={route('foods.create')}
                                                    className="inline-flex items-center justify-center gap-2 rounded-lg h-10 px-5 bg-vivid-tangerine-500 text-white text-sm font-bold hover:opacity-90 transition-opacity"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Novo Alimento
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                {foodsData.length > 0 && (
                    <div className="flex items-center justify-between p-4 border-t border-deep-space-blue-500/10">
                        <div className="text-sm text-deep-space-blue-400">
                            Página <span className="font-bold">{foods.current_page}</span> de{' '}
                            <span className="font-bold">{foods.last_page}</span>
                        </div>
                        <div className="flex items-center justify-center">
                            {/* Botão Anterior */}
                            {foods.prev_page_url ? (
                                <Link
                                    href={foods.prev_page_url}
                                    preserveState
                                    className="flex size-10 items-center justify-center text-deep-space-blue-400 hover:text-deep-space-blue-500 transition-colors"
                                    aria-label="Página Anterior"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Link>
                            ) : (
                                <span className="flex size-10 items-center justify-center text-deep-space-blue-300 cursor-not-allowed">
                                    <ChevronLeft className="h-5 w-5" />
                                </span>
                            )}

                            {/* Números de página */}
                            {[...Array(foods.last_page)].map((_, index) => {
                                const pageNumber = index + 1;
                                if (
                                    pageNumber === 1 ||
                                    pageNumber === foods.last_page ||
                                    (pageNumber >= foods.current_page - 1 && pageNumber <= foods.current_page + 1)
                                ) {
                                    return (
                                        <Link
                                            key={pageNumber}
                                            href={`/foods?page=${pageNumber}`}
                                            preserveState
                                            className={`text-sm font-${pageNumber === foods.current_page ? 'bold' : 'normal'
                                                } leading-normal flex size-10 items-center justify-center rounded-full transition-colors ${pageNumber === foods.current_page
                                                    ? 'text-white bg-vivid-tangerine-500'
                                                    : 'text-deep-space-blue-400 hover:bg-black/5'
                                                }`}
                                        >
                                            {pageNumber}
                                        </Link>
                                    );
                                } else if (
                                    pageNumber === foods.current_page - 2 ||
                                    pageNumber === foods.current_page + 2
                                ) {
                                    return (
                                        <span
                                            key={pageNumber}
                                            className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-deep-space-blue-400 rounded-full"
                                        >
                                            ...
                                        </span>
                                    );
                                }
                                return null;
                            })}

                            {/* Botão Próximo */}
                            {foods.next_page_url ? (
                                <Link
                                    href={foods.next_page_url}
                                    preserveState
                                    className="flex size-10 items-center justify-center text-deep-space-blue-400 hover:text-deep-space-blue-500 transition-colors"
                                    aria-label="Próxima Página"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Link>
                            ) : (
                                <span className="flex size-10 items-center justify-center text-deep-space-blue-300 cursor-not-allowed">
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
