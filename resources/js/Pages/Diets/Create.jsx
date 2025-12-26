import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Create({ users }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        target_calories: '',
        start_date: '',
        end_date: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('diets.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('diets.index')}
                        className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-slate-800 dark:text-slate-100">
                        Nova Dieta
                    </h2>
                </div>
            }
        >
            <Head title="Nova Dieta" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white dark:bg-slate-800 shadow-sm sm:rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-6">
                                {/* Nome */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-slate-700 dark:text-slate-200"
                                    >
                                        Nome da Dieta *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-slate-900 dark:text-slate-100 shadow-sm focus:border-vivid-tangerine-500 focus:ring-vivid-tangerine-500"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {/* Descrição */}
                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-slate-700 dark:text-slate-200"
                                    >
                                        Descrição
                                    </label>
                                    <textarea
                                        id="description"
                                        rows="4"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-slate-900 dark:text-slate-100 shadow-sm focus:border-vivid-tangerine-500 focus:ring-vivid-tangerine-500"
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* Meta de Calorias */}
                                <div>
                                    <label
                                        htmlFor="target_calories"
                                        className="block text-sm font-medium text-slate-700 dark:text-slate-200"
                                    >
                                        Meta de Calorias (por dia)
                                    </label>
                                    <input
                                        id="target_calories"
                                        type="number"
                                        value={data.target_calories}
                                        onChange={(e) => setData('target_calories', e.target.value)}
                                        className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-slate-900 dark:text-slate-100 shadow-sm focus:border-vivid-tangerine-500 focus:ring-vivid-tangerine-500"
                                    />
                                    {errors.target_calories && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.target_calories}
                                        </p>
                                    )}
                                </div>

                                {/* Datas */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="start_date"
                                            className="block text-sm font-medium text-slate-700 dark:text-slate-200"
                                        >
                                            Data de Início *
                                        </label>
                                        <input
                                            id="start_date"
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                            className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-slate-900 dark:text-slate-100 shadow-sm focus:border-vivid-tangerine-500 focus:ring-vivid-tangerine-500"
                                        />
                                        {errors.start_date && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.start_date}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="end_date"
                                            className="block text-sm font-medium text-slate-700 dark:text-slate-200"
                                        >
                                            Data de Término
                                        </label>
                                        <input
                                            id="end_date"
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                            className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-slate-900 dark:text-slate-100 shadow-sm focus:border-vivid-tangerine-500 focus:ring-vivid-tangerine-500"
                                        />
                                        {errors.end_date && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.end_date}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Botões */}
                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href={route('diets.index')}
                                        className="rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                                    >
                                        Cancelar
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-vivid-tangerine-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 transition-colors"
                                    >
                                        {processing ? 'Salvando...' : 'Criar Dieta'}
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
