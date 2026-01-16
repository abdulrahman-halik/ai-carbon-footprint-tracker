import { cn } from "@/lib/utils";

/**
 * Icon Wrapper Component
 * Ensures consistent sizing and styling for Lucide icons.
 * 
 * @param {Object} props
 * @param {React.ElementType} props.icon - The Lucide icon component
 * @param {string} [props.className] - Additional classes
 * @param {number} [props.size=24] - Icon size in pixels
 */
const Icon = ({ icon: LucideIcon, className, size = 24, ...props }) => {
    if (!LucideIcon) return null;

    return (
        <LucideIcon
            className={cn("shrink-0", className)}
            size={size}
            {...props}
        />
    );
};

export default Icon;
