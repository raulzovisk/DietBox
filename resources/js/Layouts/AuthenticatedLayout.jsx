import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Authenticated({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Mapear role_id para nome
    const getRoleName = (roleId) => {
        const roles = {
            1: 'Usuário',
            2: 'Nutricionista',
            3: 'Administrador',
        };
        return roles[roleId] || 'Usuário';
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-40 flex flex-col min-h-screen">
                <div className="max-w-7xl w-full mx-auto flex flex-col flex-1">
                    {/* Header - CINZA E BOLD */}
                    <header className="flex items-center justify-between whitespace-nowrap border-b border-deep-space-blue-500/20 px-2 md:px-4 py-6 bg-slate-50">
                        <div className="flex items-center gap-4">
                            <svg
                                className="h-10 w-10 text-vivid-tangerine-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <h2 className="text-deep-space-blue-500 text-2xl font-bold leading-tight tracking-tight">
                                NutriSystem
                            </h2>
                        </div>

                        {/* Desktop Navigation - MAIS BOLD */}
                        <nav className="hidden md:flex flex-1 justify-center gap-8">
                            <Link
                                href={route('dashboard')}
                                className={`text-base font-bold leading-normal transition-colors ${
                                    route().current('dashboard')
                                        ? 'text-vivid-tangerine-500 border-b-2 border-vivid-tangerine-500 pb-1'
                                        : 'text-deep-space-blue-400 hover:text-vivid-tangerine-500'
                                }`}
                            >
                                Dashboard
                            </Link>
                            {(user.role_id === 2 || user.role_id === 3) && (
                                <>
                                    <Link
                                        href={route('diets.index')}
                                        className={`text-base font-bold leading-normal transition-colors ${
                                            route().current('diets.*')
                                                ? 'text-vivid-tangerine-500 border-b-2 border-vivid-tangerine-500 pb-1'
                                                : 'text-deep-space-blue-400 hover:text-vivid-tangerine-500'
                                        }`}
                                    >
                                        Dietas
                                    </Link>
                                    <Link
                                        href={route('foods.index')}
                                        className={`text-base font-bold leading-normal transition-colors ${
                                            route().current('foods.*')
                                                ? 'text-vivid-tangerine-500 border-b-2 border-vivid-tangerine-500 pb-1'
                                                : 'text-deep-space-blue-400 hover:text-vivid-tangerine-500'
                                        }`}
                                    >
                                        Alimentos
                                    </Link>
                                </>
                            )}
                            {user.role_id === 1 && (
                                <Link
                                    href={route('my-diet.index')}
                                    className={`text-base font-bold leading-normal transition-colors ${
                                        route().current('my-diet.*')
                                            ? 'text-vivid-tangerine-500 border-b-2 border-vivid-tangerine-500 pb-1'
                                            : 'text-deep-space-blue-400 hover:text-vivid-tangerine-500'
                                    }`}
                                >
                                    Minha Dieta
                                </Link>
                            )}
                        </nav>

                        {/* User Actions */}
                        <div className="flex items-center gap-3">
                            <span className="hidden lg:inline text-deep-space-blue-400 text-sm font-medium px-4 py-2 rounded-lg bg-white border border-deep-space-blue-500/20">
                                {getRoleName(user.role_id)}
                            </span>
                            <Link
                                href={route('profile.edit')}
                                className="hidden sm:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-transparent text-deep-space-blue-500 text-sm font-bold leading-normal tracking-wide border border-deep-space-blue-500/20 hover:bg-deep-space-blue-500/5 transition-colors"
                            >
                                <span className="truncate">Perfil</span>
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 bg-transparent text-deep-space-blue-500 gap-2 text-sm font-bold leading-normal tracking-wide min-w-0 px-3 border border-deep-space-blue-500/20 hover:bg-deep-space-blue-500/5 transition-colors"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="-mr-2 flex items-center md:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-deep-space-blue-400 transition duration-150 ease-in-out hover:bg-deep-space-blue-500/5 hover:text-deep-space-blue-500 focus:bg-deep-space-blue-500/5 focus:text-deep-space-blue-500 focus:outline-none"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </header>

                    {/* Mobile Navigation */}
                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' md:hidden bg-slate-50'}>
                        <div className="space-y-1 pb-3 pt-2 border-b border-deep-space-blue-500/20">
                            <Link
                                href={route('dashboard')}
                                className={`block pl-3 pr-4 py-2 text-base font-bold transition-colors ${
                                    route().current('dashboard')
                                        ? 'border-l-4 border-vivid-tangerine-500 text-vivid-tangerine-500 bg-vivid-tangerine-50'
                                        : 'text-deep-space-blue-400 hover:bg-deep-space-blue-500/5 hover:text-vivid-tangerine-500'
                                }`}
                            >
                                Dashboard
                            </Link>
                            {(user.role_id === 2 || user.role_id === 3) && (
                                <>
                                    <Link
                                        href={route('diets.index')}
                                        className={`block pl-3 pr-4 py-2 text-base font-bold transition-colors ${
                                            route().current('diets.*')
                                                ? 'border-l-4 border-vivid-tangerine-500 text-vivid-tangerine-500 bg-vivid-tangerine-50'
                                                : 'text-deep-space-blue-400 hover:bg-deep-space-blue-500/5 hover:text-vivid-tangerine-500'
                                        }`}
                                    >
                                        Dietas
                                    </Link>
                                    <Link
                                        href={route('foods.index')}
                                        className={`block pl-3 pr-4 py-2 text-base font-bold transition-colors ${
                                            route().current('foods.*')
                                                ? 'border-l-4 border-vivid-tangerine-500 text-vivid-tangerine-500 bg-vivid-tangerine-50'
                                                : 'text-deep-space-blue-400 hover:bg-deep-space-blue-500/5 hover:text-vivid-tangerine-500'
                                        }`}
                                    >
                                        Alimentos
                                    </Link>
                                </>
                            )}
                            {user.role_id === 1 && (
                                <Link
                                    href={route('my-diet.index')}
                                    className={`block pl-3 pr-4 py-2 text-base font-bold transition-colors ${
                                        route().current('my-diet.*')
                                            ? 'border-l-4 border-vivid-tangerine-500 text-vivid-tangerine-500 bg-vivid-tangerine-50'
                                            : 'text-deep-space-blue-400 hover:bg-deep-space-blue-500/5 hover:text-vivid-tangerine-500'
                                    }`}
                                >
                                    Minha Dieta
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Page Content */}
                    <main className="flex-1 p-4 md:p-6 lg:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
