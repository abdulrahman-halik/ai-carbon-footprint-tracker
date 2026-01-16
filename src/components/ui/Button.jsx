import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled,
    children,
    ...props
}, ref) => {

    const variants = {
        primary: "bg-primary text-white hover:bg-green-600 shadow-sm hover:shadow-md",
        secondary: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-sm",
        ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        destructive: "bg-alert-red text-white hover:bg-red-600 shadow-sm",
        outline: "border-2 border-primary text-primary hover:bg-primary-100",
        link: "text-primary underline-offset-4 hover:underline"
    };

    const sizes = {
        sm: "h-9 px-3 text-sm rounded-lg",
        md: "h-11 px-5 py-2 rounded-xl",
        lg: "h-14 px-8 text-lg rounded-2xl",
        icon: "h-11 w-11 p-2 rounded-xl"
    };

    const baseStyles = "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95";

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                className
            )}
            ref={ref}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
});

Button.displayName = "Button";

export { Button };
