"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BarChart3,
    Users,
    FlaskConical,
    ChevronLeft,
    Leaf,
    Target,
    Droplets,
    Zap,
    FileText,
    Globe,
    ClipboardList,
} from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Emissions", href: "/emissions", icon: BarChart3 },
    { label: "Activity", href: "/log", icon: ClipboardList },
    { label: "Goals", href: "/goals", icon: Target },
    { label: "Water", href: "/water", icon: Droplets },
    { label: "Energy", href: "/energy", icon: Zap },
    { label: "Reports", href: "/reports", icon: FileText },
    { label: "Community", href: "/community", icon: Globe },
    { label: "Team", href: "/social", icon: Users },
    { label: "Simulate", href: "/simulate", icon: FlaskConical },
];

export default function Sidebar({ mobile, isOpen, onClose }) {
    const pathname = usePathname();

    // If mobile, strictly use full width/overlay styles
    const sidebarClasses = mobile
        ? cn(
            "fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-white border-r border-gray-100 shadow-2xl transition-transform duration-300 ease-in-out font-sans",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )
        : "hidden h-screen w-64 flex-col border-r border-gray-100 bg-white lg:flex sticky top-0 font-sans";

    return (
        <>
            {/* Mobile Overlay */}
            {mobile && isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={sidebarClasses}>
                <div className="flex flex-col items-center justify-center py-8 relative px-6">
                    {mobile && (
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 lg:hidden"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}

                    <div className="bg-emerald-500 p-3 rounded-2xl shadow-lg shadow-emerald-200/10 text-white mb-1">
                        <Leaf size={22} fill="currentColor" strokeWidth={2.5} />
                    </div>
                    <span className="text-xl font-extrabold text-gray-900 tracking-tight">
                        EcoTracker
                    </span>
                </div>

                <nav className="flex-1 space-y-1 px-4 overflow-y-auto">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={mobile ? onClose : undefined}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 group relative font-medium",
                                    isActive
                                        ? "bg-emerald-50 text-emerald-600 shadow-sm"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon
                                    size={20}
                                    className={cn(
                                        "shrink-0 transition-colors",
                                        isActive ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-600"
                                    )}
                                />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>


            </aside>
        </>
    );
}
