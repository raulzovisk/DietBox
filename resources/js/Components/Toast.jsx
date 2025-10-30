import { useEffect, useState } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export default function Toast() {
    const [toasts, setToasts] = useState([]);

    // Escutar eventos de toast
    useEffect(() => {
        const handleAddToast = (event) => {
            const { message, type = 'info', duration = 5000 } = event.detail;
            const id = Date.now();

            setToasts(prev => [...prev, { id, message, type, duration }]);

            // Auto remover após duração
            if (duration > 0) {
                setTimeout(() => {
                    removeToast(id);
                }, duration);
            }
        };

        window.addEventListener('show-toast', handleAddToast);
        return () => window.removeEventListener('show-toast', handleAddToast);
    }, []);

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const getToastStyles = (type) => {
        const styles = {
            success: {
                bg: 'bg-green-50',
                border: 'border-green-200',
                text: 'text-green-800',
                icon: 'text-green-600',
                Icon: CheckCircle,
            },
            error: {
                bg: 'bg-red-50',
                border: 'border-red-200',
                text: 'text-red-800',
                icon: 'text-red-600',
                Icon: AlertCircle,
            },
            warning: {
                bg: 'bg-yellow-50',
                border: 'border-yellow-200',
                text: 'text-yellow-800',
                icon: 'text-yellow-600',
                Icon: AlertTriangle,
            },
            info: {
                bg: 'bg-blue-50',
                border: 'border-blue-200',
                text: 'text-blue-800',
                icon: 'text-blue-600',
                Icon: Info,
            },
        };

        return styles[type] || styles.info;
    };

    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-3 pointer-events-none">
            {toasts.map((toast) => {
                const style = getToastStyles(toast.type);
                const Icon = style.Icon;

                return (
                    <div
                        key={toast.id}
                        className={`${style.bg} ${style.border} ${style.text} border rounded-lg shadow-lg p-4 max-w-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2 pointer-events-auto`}
                    >
                        <Icon className={`h-5 w-5 ${style.icon} flex-shrink-0 mt-0.5`} />
                        <p className="flex-1 text-sm font-medium">{toast.message}</p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
