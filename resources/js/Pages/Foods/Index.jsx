import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ foods, filters }) {
    const [search, setSearch] = useState(filters && filters.search ? filters.search : '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/foods', { search }, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja deletar este alimento?')) {
            router.delete(`/foods/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Alimentos
                    </h2>
                    <Link
                        href="/foods/create"
                        className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 transition-colors"
                    >
                        Novo Alimento
                    </Link>
                </div>
            }
        >
            <Head title="Alimentos" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Busca */}
                    <div className="mb-6 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSearch} className="flex gap-2">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Buscar alimentos por nome..."
                                    className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                                <button
                                    type="submit"
                                    className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 transition-colors"
                                >
                                    Buscar
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Lista de alimentos */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {foods && foods.data && foods.data.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Nome
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Categoria
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Calorias (100g)
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Proteínas (g)
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {foods.data.map((food) => (
                                        <tr key={food.id} className="hover:bg-gray-50">
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="font-medium text-gray-900">
                                                    {food.name}
                                                </div>
                                                {food.description && (
                                                    <div className="text-xs text-gray-500">
                                                        {food.description.substring(0, 50)}...
                                                    </div>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {food.category ? (
                                                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                                                        {food.category}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {food.calories_per_100g ? `${food.calories_per_100g} kcal` : '-'}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                {food.protein_per_100g ? `${food.protein_per_100g}g` : '-'}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                                <div className="flex gap-3">
                                                    <Link
                                                        href={`/foods/${food.id}/edit`}
                                                        className="text-amber-600 hover:text-amber-900 transition-colors"
                                                    >
                                                        Editar
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(food.id)}
                                                        className="text-red-600 hover:text-red-900 transition-colors"
                                                    >
                                                        Deletar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-6 text-center text-gray-500">
                                <h3 className="mb-2 text-lg font-semibold text-gray-700">
                                    Nenhum alimento encontrado
                                </h3>
                                <p>Comece adicionando um novo alimento.</p>
                            </div>
                        )}
                    </div>

                    {/* Paginação */}
                    {foods && foods.links && foods.links.length > 3 && (
                        <div className="mt-6 flex justify-center gap-2">
                            {foods.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${link.active
                                            ? 'bg-amber-600 text-white'
                                            : link.url
                                                ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
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
