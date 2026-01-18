import React, { useEffect, useState, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const ModalContext = createContext({});

const Modal = ({ isOpen, onClose, children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted) return null;

    return (
        <ModalContext.Provider value={{ onClose }}>
            {isOpen && createPortal(
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
                        onClick={onClose}
                    />
                    {children}
                </div>,
                document.body
            )}
        </ModalContext.Provider>
    );
};

const ModalContent = ({ className, children, ...props }) => {
    const { onClose } = useContext(ModalContext);
    return (
        <div className={cn("relative z-50 w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all animate-in zoom-in-95 duration-200", className)} {...props}>
            <button
                className="absolute right-4 top-4 z-10 rounded-full p-2 bg-white/50 hover:bg-gray-100 transition-colors focus:outline-none"
                onClick={onClose}
            >
                <X className="h-4 w-4 text-gray-500" />
            </button>
            {children}
        </div>
    );
};

const ModalHeader = ({ className, ...props }) => (
    <div className={cn("flex flex-col space-y-1.5 p-6 pb-2", className)} {...props} />
);

const ModalTitle = ({ className, ...props }) => (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-gray-900", className)} {...props} />
);

const ModalDescription = ({ className, ...props }) => (
    <p className={cn("text-sm text-gray-500", className)} {...props} />
);

const ModalFooter = ({ className, ...props }) => (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-2", className)} {...props} />
);

export { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter };
