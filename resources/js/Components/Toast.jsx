import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast() {
    const { flash } = usePage().props;
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        if (flash?.success) {
            addToast('success', flash.success);
        }
        if (flash?.error) {
            addToast('error', flash.error);
        }
        if (flash?.warning) {
            addToast('warning', flash.warning);
        }
        if (flash?.info) {
            addToast('info', flash.info);
        }
    }, [flash]);

    const addToast = (type, message) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, message }]);

        // Auto remove após 4 segundos
        setTimeout(() => {
            removeToast(id);
        }, 4000);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const getToastStyles = (type) => {
        switch (type) {
            case 'success':
                return {
                    bg: 'bg-green-50 border-green-500',
                    text: 'text-green-800',
                    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                };
            case 'error':
                return {
                    bg: 'bg-red-50 border-red-500',
                    text: 'text-red-800',
                    icon: <XCircle className="h-5 w-5 text-red-500" />,
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-50 border-yellow-500',
                    text: 'text-yellow-800',
                    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
                };
            case 'info':
                return {
                    bg: 'bg-blue-50 border-blue-500',
                    text: 'text-blue-800',
                    icon: <Info className="h-5 w-5 text-blue-500" />,
                };
            default:
                return {
                    bg: 'bg-gray-50 border-gray-500',
                    text: 'text-gray-800',
                    icon: <Info className="h-5 w-5 text-gray-500" />,
                };
        }
    };

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
            {toasts.map((toast) => {
                const styles = getToastStyles(toast.type);
                return (
                    <div
                        key={toast.id}
                        className={`flex items-center gap-3 p-4 rounded-lg border-l-4 shadow-lg ${styles.bg} animate-slide-in`}
                    >
                        {styles.icon}
                        <p className={`flex-1 text-sm font-medium ${styles.text}`}>
                            {toast.message}
                        </p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className={`${styles.text} hover:opacity-70 transition-opacity`}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
