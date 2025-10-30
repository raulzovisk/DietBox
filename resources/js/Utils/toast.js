export function showToast(message, type = 'info', duration = 5000) {
    const event = new CustomEvent('show-toast', {
        detail: { message, type, duration }
    });
    window.dispatchEvent(event);
}

export function showSuccess(message, duration = 5000) {
    showToast(message, 'success', duration);
}

export function showError(message, duration = 5000) {
    showToast(message, 'error', duration);
}

export function showWarning(message, duration = 5000) {
    showToast(message, 'warning', duration);
}

export function showInfo(message, duration = 5000) {
    showToast(message, 'info', duration);
}
