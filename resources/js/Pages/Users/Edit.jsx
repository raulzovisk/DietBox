import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

export default function Edit({ user, roles }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role_id: user.role_id || 1,
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('users.update', user.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Editar ${user.name}`} />

            {/* Header Section */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex min-w-72 flex-col gap-1">
                    <h1 className="text-deep-space-blue-500 dark:text-slate-100 text-3xl md:text-4xl font-black leading-tight">
                        Editar Usuário
                    </h1>
                    <p className="text-deep-space-blue-400 dark:text-slate-400 text-base font-normal leading-normal">
                        Atualize as informações do usuário.
                    </p>
                </div>
                <Link
                    href={route('users.index')}
                    className="flex items-center justify-center gap-2 min-w-[84px] cursor-pointer overflow-hidden rounded-lg h-11 px-6 bg-slate-100 dark:bg-slate-700 text-deep-space-blue-500 dark:text-slate-100 text-sm font-bold leading-normal hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="truncate">Voltar</span>
                </Link>
            </div>

            {/* Form Section */}
            <div className="overflow-hidden rounded-xl border border-deep-space-blue-500/20 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-colors">
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-deep-space-blue-500 dark:text-slate-200"
                        >
                            Nome
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="form-input w-full rounded-lg border border-deep-space-blue-500/20 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-deep-space-blue-500 dark:text-slate-100 focus:border-vivid-tangerine-500 focus:ring-2 focus:ring-vivid-tangerine-500/50"
                            placeholder="Nome do usuário"
                        />
                        {errors.name && (
                            <p className="text-sm text-flag-red-500">{errors.name}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-deep-space-blue-500 dark:text-slate-200"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="form-input w-full rounded-lg border border-deep-space-blue-500/20 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-deep-space-blue-500 dark:text-slate-100 focus:border-vivid-tangerine-500 focus:ring-2 focus:ring-vivid-tangerine-500/50"
                            placeholder="email@exemplo.com"
                        />
                        {errors.email && (
                            <p className="text-sm text-flag-red-500">{errors.email}</p>
                        )}
                    </div>

                    {/* Role Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="role_id"
                            className="block text-sm font-medium text-deep-space-blue-500 dark:text-slate-200"
                        >
                            Função
                        </label>
                        <select
                            id="role_id"
                            value={data.role_id}
                            onChange={(e) => setData('role_id', parseInt(e.target.value))}
                            className="form-select w-full rounded-lg border border-deep-space-blue-500/20 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-deep-space-blue-500 dark:text-slate-100 focus:border-vivid-tangerine-500 focus:ring-2 focus:ring-vivid-tangerine-500/50"
                        >
                            <option value={1}>Usuário</option>
                            <option value={2}>Nutricionista</option>
                            <option value={3}>Administrador</option>
                        </select>
                        {errors.role_id && (
                            <p className="text-sm text-flag-red-500">{errors.role_id}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-deep-space-blue-500 dark:text-slate-200"
                        >
                            Nova Senha (opcional)
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="form-input w-full rounded-lg border border-deep-space-blue-500/20 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-deep-space-blue-500 dark:text-slate-100 focus:border-vivid-tangerine-500 focus:ring-2 focus:ring-vivid-tangerine-500/50"
                            placeholder="Deixe em branco para manter a senha atual"
                        />
                        {errors.password && (
                            <p className="text-sm text-flag-red-500">{errors.password}</p>
                        )}
                        <p className="text-xs text-deep-space-blue-400 dark:text-slate-400">
                            Deixe em branco para manter a senha atual.
                        </p>
                    </div>

                    {/* User Info */}
                    <div className="pt-4 border-t border-deep-space-blue-500/10 dark:border-slate-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-deep-space-blue-400 dark:text-slate-400">
                            <div>
                                <span className="font-medium">Criado em: </span>
                                {new Date(user.created_at).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </div>
                            <div>
                                <span className="font-medium">Atualizado em: </span>
                                {new Date(user.updated_at).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4 pt-4">
                        <Link
                            href={route('users.index')}
                            className="flex items-center justify-center gap-2 min-w-[84px] cursor-pointer overflow-hidden rounded-lg h-11 px-6 bg-slate-100 dark:bg-slate-700 text-deep-space-blue-500 dark:text-slate-100 text-sm font-bold leading-normal hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center justify-center gap-2 min-w-[84px] cursor-pointer overflow-hidden rounded-lg h-11 px-6 bg-vivid-tangerine-500 text-white text-sm font-bold leading-normal hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            <Save className="h-5 w-5" />
                            <span className="truncate">Salvar Alterações</span>
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
