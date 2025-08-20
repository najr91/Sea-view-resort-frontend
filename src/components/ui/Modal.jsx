import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ open, onClose, size = 'md', children, overlayClassName = '', containerClassName = '' }) {
    useEffect(() => {
        if (!open) return;
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [open, onClose]);

    if (!open) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
        full: 'max-w-[95vw]'
    };

    const content = (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 ${overlayClassName}`}
            onClick={() => onClose?.()}
            role="dialog"
            aria-modal="true"
        >
            <div
                className={`w-full ${sizeClasses[size] || sizeClasses.md} mx-auto transform transition-all ${containerClassName}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );

    return createPortal(content, document.body);
}


