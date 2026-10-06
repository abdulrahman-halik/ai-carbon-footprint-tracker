"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Users,
    BarChart3,
    Droplets,
    Zap,
    Target,
    TrendingDown,
    ChevronLeft,
    Shield,
    Leaf,
    ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const ADMIN_NAV_ITEMS = [
    { label: "Users", href: "/admin/users", icon: Users, description: "User accounts & access status" },
    { label: "Carbon Footprint", href: "/admin/emissions", icon: BarChart3, description: "CO2e emissions by user" },
    { label: "Water Usage", href: "/admin/water", icon: Droplets, description: "Consumption liters comparison" },
    { label: "Electricity Usage", href: "/admin/energy", icon: Zap, description: "Power & kWh usage metrics" },
    { label: "Active Goals", href: "/admin/goals", icon: Target, description: "Current sustainability goals" },
    { label: "Reducing Goals", href: "/admin/reducing-goals", icon: TrendingDown, description: "Emission reduction achievements" },
];

export default function AdminSidebar({ mobile, isOpen, onClose }) {
    const pathname = usePathname();

    const sidebarClasses = mobile
        ? cn(
            "fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col bg-white border-r border-gray-100 shadow-2xl transition-transform duration-300 ease-in-out font-sans",
            isOpen ? "translate-x-0" : "-translate-x-full"
        )
        : "hidden h-screen w-72 flex-col border-r border-gray-100 bg-white lg:flex sticky top-0 font-sans";

    return (
        <>
            {mobile && isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={sidebarClasses}>
                {/* Header / Brand */}
                <div className="flex flex-col items-center justify-center pt-8 pb-6 px-6 border-b border-gray-100 relative">
                    {mobile && (
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 lg:hidden rounded-lg"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}

                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-600 p-2.5 rounded-2xl shadow-lg shadow-emerald-500/20 text-white">
                            <Leaf size={22} fill="currentColor" strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="text-xl font-extrabold text-gray-900 tracking-tight block">
                                EcoTracker
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <Shield size={10} />
                                Admin Panel
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 space-y-1.5 p-4 overflow-y-auto">
                    <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        Management & Analytics
                    </p>
                    {ADMIN_NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={mobile ? onClose : undefined}
                                className={cn(
                                    "flex items-start gap-3 rounded-xl px-3.5 py-3 transition-all duration-200 group relative font-medium",
                                    isActive
                                        ? "bg-emerald-50 text-emerald-700 shadow-xs border border-emerald-100"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon
                                    size={20}
                                    className={cn(
                                        "shrink-0 mt-0.5 transition-colors",
                                        isActive ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-700"
                                    )}
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold leading-tight">{item.label}</span>
                                    <span className={cn(
                                        "text-xs transition-colors",
                                        isActive ? "text-emerald-600/80" : "text-gray-400 group-hover:text-gray-500"
                                    )}>
                                        {item.description}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Switcher */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <Link
                        href="/dashboard"
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:text-emerald-700 hover:bg-white border border-transparent hover:border-gray-200 transition-all shadow-xs"
                    >
                        <span className="flex items-center gap-2">
                            <span>Switch to User View</span>
                        </span>
                        <ArrowUpRight size={14} className="text-gray-400" />
                    </Link>
                </div>
            </aside>
        </>
    );
}
