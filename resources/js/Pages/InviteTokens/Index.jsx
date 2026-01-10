import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Copy, Trash2, Check, X, Key, Calendar, User, Clock, Users } from 'lucide-react';

export default function Index({ inviteTokens, isAdmin }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expiresAt, setExpiresAt] = useState('');
    const [roleType, setRoleType] = useState(1);
    const [processing, setProcessing] = useState(false);
    const [copiedToken, setCopiedToken] = useState(null);

    const handleCreate = (e) => {
        e.preventDefault();
        setProcessing(true);

        router.post(route('invite-tokens.store'), {
            expires_at: expiresAt || null,
            role_type: isAdmin ? roleType : 1,
        }, {
            onSuccess: () => {
                setIsModalOpen(false);
                setExpiresAt('');
                setRoleType(1);
                setProcessing(false);
            },
            onError: () => {
                setProcessing(false);
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir este token?')) {
            router.delete(route('invite-tokens.destroy', id));
        }
    };

    const copyToClipboard = (token) => {
        navigator.clipboard.writeText(token);
        setCopiedToken(token);
        setTimeout(() => setCopiedToken(null), 2000);
    };

    const getRoleTypeBadge = (roleTypeId) => {
        if (roleTypeId === 2) {
            return (
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
                    <Users className="h-3 w-3" />
                    Nutricionista
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400">
                <User className="h-3 w-3" />
                Usuário
            </span>
        );
    };

    const getStatusBadge = (token) => {
        if (token.used_at) {
            return (
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                    <Check className="h-3 w-3" />
                    Usado
                </span>
            );
        }
        if (token.expires_at && new Date(token.expires_at) < new Date()) {
            return (
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400">
                    <X className="h-3 w-3" />
                    Expirado
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400">
                <Check className="h-3 w-3" />
                Válido
            </span>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tokens de Convite" />

            {/* Header */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex min-w-72 flex-col gap-1">
                    <h1 className="text-slate-900 dark:text-slate-100 text-2xl sm:text-3xl font-bold leading-tight">
                        Tokens de Convite
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-normal">
                        Gerencie tokens para convidar novos usuários ao sistema.
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 rounded-lg h-11 px-6 bg-vivid-tangerine-500 text-white text-sm font-bold hover:bg-vivid-tangerine-600 transition-colors shadow-md shadow-vivid-tangerine-500/25"
                >
                    <Plus className="h-5 w-5" />
                    <span>Novo Token</span>
                </button>
            </div>

            {/* Tokens Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {inviteTokens && inviteTokens.length > 0 ? (
                    inviteTokens.map((token) => (
                        <div
                            key={token.id}
                            className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Token Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vivid-tangerine-100 dark:bg-vivid-tangerine-500/20">
                                        <Key className="h-5 w-5 text-vivid-tangerine-600 dark:text-vivid-tangerine-400" />
                                    </div>
                                    {getStatusBadge(token)}
                                    {getRoleTypeBadge(token.role_type)}
                                </div>
                                <button
                                    onClick={() => handleDelete(token.id)}
                                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                    title="Excluir token"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Token Value */}
                            <div className="mb-3">
                                <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Token</label>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 text-xs bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 font-mono truncate">
                                        {token.token.substring(0, 20)}...
                                    </code>
                                    <button
                                        onClick={() => copyToClipboard(token.token)}
                                        className={`p-2 rounded-lg transition-colors ${copiedToken === token.token
                                            ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400'
                                            : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                                            }`}
                                        title={copiedToken === token.token ? 'Copiado!' : 'Copiar token'}
                                    >
                                        {copiedToken === token.token ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Token Info */}
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                    <Calendar className="h-4 w-4" />
                                    <span>Criado: {formatDate(token.created_at)}</span>
                                </div>
                                {token.expires_at && (
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                        <Clock className="h-4 w-4" />
                                        <span>Expira: {formatDate(token.expires_at)}</span>
                                    </div>
                                )}
                                {token.used_at && (
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                        <User className="h-4 w-4" />
                                        <span>Usado em: {formatDate(token.used_at)} por {token.used_by?.name || 'Usuário'}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-12 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 mx-auto mb-4">
                            <Key className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                            Nenhum token criado
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-4">
                            Crie um token de convite para permitir novos cadastros.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-vivid-tangerine-500 text-white font-semibold hover:bg-vivid-tangerine-600 transition-colors"
                        >
                            <Plus className="h-5 w-5" />
                            Criar primeiro token
                        </button>
                    </div>
                )}
            </div>

            {/* Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-700 overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vivid-tangerine-100 dark:bg-vivid-tangerine-500/20">
                                    <Key className="h-5 w-5 text-vivid-tangerine-600 dark:text-vivid-tangerine-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    Novo Token de Convite
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleCreate} className="p-6">
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                                Um token único será gerado automaticamente. {isAdmin && 'Selecione o tipo de usuário que poderá usar este token.'}
                            </p>

                            {/* Role Type Selector (Admin only) */}
                            {isAdmin && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                                        Tipo de Usuário
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setRoleType(1)}
                                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${roleType === 1
                                                ? 'border-vivid-tangerine-500 bg-vivid-tangerine-50 dark:bg-vivid-tangerine-500/10 text-vivid-tangerine-600 dark:text-vivid-tangerine-400'
                                                : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-500'
                                                }`}
                                        >
                                            <User className="h-5 w-5" />
                                            <span className="font-medium">Usuário</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setRoleType(2)}
                                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${roleType === 2
                                                ? 'border-vivid-tangerine-500 bg-vivid-tangerine-50 dark:bg-vivid-tangerine-500/10 text-vivid-tangerine-600 dark:text-vivid-tangerine-400'
                                                : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-500'
                                                }`}
                                        >
                                            <Users className="h-5 w-5" />
                                            <span className="font-medium">Nutricionista</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="mb-6">
                                <label
                                    htmlFor="expires_at"
                                    className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2"
                                >
                                    Data de Expiração (opcional)
                                </label>
                                <input
                                    id="expires_at"
                                    type="datetime-local"
                                    value={expiresAt}
                                    onChange={(e) => setExpiresAt(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-slate-900 dark:text-slate-100 focus:border-vivid-tangerine-500 focus:ring-2 focus:ring-vivid-tangerine-500/20 focus:outline-none transition-colors"
                                />
                                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                    Deixe em branco para criar um token sem expiração.
                                </p>
                            </div>

                            {/* Modal Actions */}
                            <div className="flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                    disabled={processing}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 rounded-lg bg-vivid-tangerine-500 text-white font-semibold hover:bg-vivid-tangerine-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Gerando...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="h-4 w-4" />
                                            Gerar Token
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
