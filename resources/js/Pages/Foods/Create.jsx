import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        category: '',
        calories_per_100g: '',
        protein_per_100g: '',
        carbs_per_100g: '',
        fat_per_100g: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/foods');
    };

    const categories = [
        'Proteína',
        'Carboidrato',
        'Vegetal',
        'Fruta',
        'Gordura',
        'Laticínio',
        'Bebida',
        'Outros',
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Novo Alimento
                </h2>
            }
        >
            <Head title="Novo Alimento" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-6">
                                {/* Nome */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Nome do Alimento *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {/* Categoria */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                        Categoria
                                    </label>
                                    <select
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    >
                                        <option value="">Selecione uma categoria</option>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                                    )}
                                </div>

                                {/* Descrição */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Descrição
                                    </label>
                                    <textarea
                                        id="description"
                                        rows="3"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                {/* Informações Nutricionais */}
                                <div>
                                    <h3 className="mb-4 text-sm font-medium text-gray-700">
                                        Informações Nutricionais (por 100g)
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="calories_per_100g" className="block text-sm font-medium text-gray-700">
                                                Calorias (kcal)
                                            </label>
                                            <input
                                                id="calories_per_100g"
                                                type="number"
                                                step="0.01"
                                                value={data.calories_per_100g}
                                                onChange={(e) => setData('calories_per_100g', e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="protein_per_100g" className="block text-sm font-medium text-gray-700">
                                                Proteínas (g)
                                            </label>
                                            <input
                                                id="protein_per_100g"
                                                type="number"
                                                step="0.01"
                                                value={data.protein_per_100g}
                                                onChange={(e) => setData('protein_per_100g', e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="carbs_per_100g" className="block text-sm font-medium text-gray-700">
                                                Carboidratos (g)
                                            </label>
                                            <input
                                                id="carbs_per_100g"
                                                type="number"
                                                step="0.01"
                                                value={data.carbs_per_100g}
                                                onChange={(e) => setData('carbs_per_100g', e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="fat_per_100g" className="block text-sm font-medium text-gray-700">
                                                Gorduras (g)
                                            </label>
                                            <input
                                                id="fat_per_100g"
                                                type="number"
                                                step="0.01"
                                                value={data.fat_per_100g}
                                                onChange={(e) => setData('fat_per_100g', e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Botões */}
                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href="/foods"
                                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancelar
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-50 transition-colors"
                                    >
                                        {processing ? 'Salvando...' : 'Criar Alimento'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
