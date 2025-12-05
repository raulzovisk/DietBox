import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function Edit({ diet }) {
    const { url } = usePage(); // Pegar URL atual
    const searchParams = new URLSearchParams(window.location.search);
    const from = searchParams.get('from'); // Verificar parâmetro 'from'
    
    // ✅ Definir para onde voltar baseado no parâmetro
    const backUrl = from === 'show' ? `/diets/${diet.id}` : '/diets';
    
    const { data, setData, put, processing, errors } = useForm({
        name: diet.name || '',
        description: diet.description || '',
        start_date: diet.start_date || '',
        end_date: diet.end_date || '',
        target_calories: diet.target_calories || '',
        is_active: diet.is_active || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        put(`/diets/${diet.id}`, {
            data: {
                ...data,
                is_active: data.is_active ? 1 : 0,
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={backUrl} // ✅ DINÂMICO
                        className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Editar Dieta: {diet.name}
                    </h2>
                </div>
            }
        >
            <Head title={`Editar ${diet.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Nome */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Nome da Dieta *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {/* Descrição */}
                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Descrição
                                    </label>
                                    <textarea
                                        id="description"
                                        rows="4"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        placeholder="Descreva os objetivos e características desta dieta..."
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                {/* Datas */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="start_date"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Data de Início
                                        </label>
                                        <input
                                            id="start_date"
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                        {errors.start_date && (
                                            <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="end_date"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Data de Término
                                        </label>
                                        <input
                                            id="end_date"
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        />
                                        {errors.end_date && (
                                            <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Meta de Calorias */}
                                <div>
                                    <label
                                        htmlFor="target_calories"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Meta de Calorias (kcal/dia)
                                    </label>
                                    <input
                                        id="target_calories"
                                        type="number"
                                        min="0"
                                        value={data.target_calories}
                                        onChange={(e) => setData('target_calories', e.target.value)}
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        placeholder="Ex: 2000"
                                    />
                                    {errors.target_calories && (
                                        <p className="mt-1 text-sm text-red-600">{errors.target_calories}</p>
                                    )}
                                </div>

                                {/* Checkbox Dieta Ativa */}
                                <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                                    <input
                                        id="is_active"
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                    />
                                    <label
                                        htmlFor="is_active"
                                        className="flex-1 cursor-pointer text-sm font-medium text-gray-700"
                                    >
                                        <div>
                                            <p className="font-semibold">Dieta Ativa</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Usuários atribuídos só conseguem visualizar dietas ativas
                                            </p>
                                        </div>
                                    </label>
                                    <div className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                        data.is_active 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-gray-200 text-gray-600'
                                    }`}>
                                        {data.is_active ? 'Ativa' : 'Inativa'}
                                    </div>
                                </div>
                                {errors.is_active && (
                                    <p className="mt-1 text-sm text-red-600">{errors.is_active}</p>
                                )}

                                {/* Botões */}
                                <div className="flex justify-end gap-3 border-t pt-6">
                                    <Link
                                        href={backUrl} // ✅ DINÂMICO
                                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancelar
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-50 transition-colors"
                                    >
                                        {processing ? 'Salvando...' : 'Salvar Alterações'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
