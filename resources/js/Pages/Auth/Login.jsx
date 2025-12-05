import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Login" />

            <div className="flex flex-col min-h-screen bg-slate-50">
                {/* Header */}
                <header className="bg-slate-50 shadow-sm border-t-4 border-orange-500">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex-shrink-0">
                                <span className="text-2xl font-bold text-orange-500">NutriSystem</span>
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
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-center text-3xl font-extrabold text-slate-900">
                                    Login
                                </h2>
                            </div>

                            {/* Status Message */}
                            {status && (
                                <div className="mb-4 font-medium text-sm text-green-600 text-center">
                                    {status}
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={submit} className="space-y-6">
                                {/* Email */}
                                <div>
                                    <label 
                                        htmlFor="email" 
                                        className="block text-sm font-medium text-slate-700"
                                    >
                                        E-mail ou Nome de Usuário
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            autoComplete="username"
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="exemplo@email.com"
                                            required
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
                                        Senha
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Sua senha"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white text-slate-900"
                                        />
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Remember Me */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="rounded border-slate-300 text-orange-500 shadow-sm focus:ring-orange-500"
                                        />
                                        <span className="ml-2 text-sm text-slate-600">
                                            Lembrar-me
                                        </span>
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-orange-500 hover:underline"
                                        >
                                            Esqueceu a senha?
                                        </Link>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Entrando...' : 'Login'}
                                    </button>
                                </div>
                            </form>

                            {/* Register Link */}
                            <div className="mt-6 text-center">
                                <p className="text-sm text-slate-600">
                                    Não tem uma conta?{' '}
                                    <Link
                                        href={route('register')}
                                        className="font-medium text-orange-500 hover:underline"
                                    >
                                        Criar conta
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
