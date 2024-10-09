import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastTimeout = null;

const showToastWithThrottle = (message, type = 'default', duration = 1000) => {
    if (!toastTimeout && message) {
        switch (type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            case 'info':
                toast.info(message);
                break;
            case 'warning':
                toast.warn(message);
                break;
            default:
                toast(message);
        }

        toastTimeout = setTimeout(() => {
            toastTimeout = null;
        }, duration);
    }
};

export const showSuccessToast = (message) => showToastWithThrottle(message, 'success');
export const showErrorToast = (message) => showToastWithThrottle(message, 'error');
export const showInfoToast = (message) => showToastWithThrottle(message, 'info');
export const showWarningToast = (message) => showToastWithThrottle(message, 'warning');
