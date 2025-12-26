import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <>
            <Head title="Redefinir Senha" />

            <div className="flex flex-col min-h-screen bg-slate-50">
                {/* Header */}
                <header className="bg-slate-50 shadow-sm border-t-4 border-orange-500">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex-shrink-0">
                                <Link href={route('login')} className="text-2xl font-bold text-orange-500">
                                    NutriSystem
                                </Link>
                            </div>
                            <nav className="hidden md:flex md:space-x-8">
                                <a className="text-slate-500 hover:text-orange-500 transition-colors" href="#">
                                    Início
                                </a>
                                <a className="text-slate-500 hover:text-orange-500 transition-colors" href="#">
                                    Sobre
                                </a>
                                <a className="text-slate-500 hover:text-orange-500 transition-colors" href="#">
                                    Serviços
                                </a>
                                <a className="text-slate-500 hover:text-orange-500 transition-colors" href="#">
                                    Contato
                                </a>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div
                            className="bg-white p-8 sm:p-10 rounded-lg shadow-lg border border-slate-200"
                            style={{
                                boxShadow: '0 0 30px 5px rgba(249, 115, 22, 0.2)'
                            }}
                        >
                            {/* Icon and Title */}
                            <div className="flex flex-col items-center mb-8">
                                <div className="bg-orange-500 rounded-full p-3 mb-4 inline-flex">
                                    <svg
                                        className="h-8 w-8 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-center text-3xl font-extrabold text-slate-900">
                                    Redefinir Senha
                                </h2>
                            </div>

                            {/* Description */}
                            <div className="mb-6 text-sm text-slate-600 text-center">
                                Escolha uma nova senha para sua conta.
                            </div>

                            {/* Form */}
                            <form onSubmit={submit} className="space-y-6">
                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-slate-700"
                                    >
                                        E-mail
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            autoComplete="username"
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white text-slate-900"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-slate-700"
                                    >
                                        Nova Senha
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Mínimo 8 caracteres"
                                            autoFocus
                                            className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white text-slate-900"
                                        />
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block text-sm font-medium text-slate-700"
                                    >
                                        Confirmar Senha
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Digite a senha novamente"
                                            className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white text-slate-900"
                                        />
                                    </div>
                                    {errors.password_confirmation && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.password_confirmation}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Redefinindo...' : 'Redefinir Senha'}
                                    </button>
                                </div>
                            </form>

                            {/* Back to Login Link */}
                            <div className="mt-6 text-center">
                                <p className="text-sm text-slate-600">
                                    <Link
                                        href={route('login')}
                                        className="font-medium text-orange-500 hover:underline"
                                    >
                                        Voltar ao login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-slate-50 border-t-4 border-orange-500">
                    <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-sm text-slate-500">
                            Copyright © {new Date().getFullYear()} NutriSystem -{' '}
                            <a className="hover:underline" href="#">
                                Termos de Serviço
                            </a>{' '}
                            |{' '}
                            <a className="hover:underline" href="#">
                                Política de Privacidade
                            </a>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
