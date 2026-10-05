import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const getInitials = (name) => {
    if (!name) return "?";
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(n => n.charAt(0))
        .join('')
        .toUpperCase();
};
