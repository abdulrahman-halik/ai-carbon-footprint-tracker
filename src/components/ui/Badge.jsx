import React from 'react';
import { cn } from '@/lib/utils';

const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
    const variants = {
        default: "border-transparent bg-primary text-white hover:bg-primary/80",
        secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200/80",
        destructive: "border-transparent bg-alert-red text-white hover:bg-alert-red/80",
        outline: "text-gray-950 border-gray-200",
        success: "border-transparent bg-green-100 text-green-700 hover:bg-green-200",
        warning: "border-transparent bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    };

    return (
        <div
            ref={ref}
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        />
    );
});

Badge.displayName = "Badge";

export { Badge };
