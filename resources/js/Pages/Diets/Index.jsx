import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ diets, auth }) {
    // Verificar se diets existe e tem dados
    const hasDiets = diets && diets.data && Array.isArray(diets.data) && diets.data.length > 0;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Dietas
                    </h2>
                    {(auth.user.role_id === 2 || auth.user.role_id === 3) && (
                        <Link
                            href="/diets/create"
                            className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500"
                        >
                            Nova Dieta
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Dietas" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {hasDiets ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {diets.data.map((diet) => (
                                <Link
                                    key={diet.id}
                                    href={`/diets/${diet.id}`}
                                    className="overflow-hidden bg-white shadow-sm sm:rounded-lg hover:shadow-md transition-shadow"
                                >
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                            {diet.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {diet.description || 'Sem descrição'}
                                        </p>
                                        {diet.target_calories && (
                                            <div className="inline-block rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                                                Meta: {diet.target_calories} cal/dia
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-center text-gray-500">
                                <h3 className="mb-2 text-lg font-semibold text-gray-700">
                                    Nenhuma dieta encontrada
                                </h3>
                                <p>Comece criando uma nova dieta.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
