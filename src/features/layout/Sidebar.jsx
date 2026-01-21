"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BarChart3,
    ListTodo,
    Users,
    FlaskConical,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Settings,
    Leaf,
    Target,
    Droplets,
    Zap,
    FileText,
    Globe,
    ClipboardList,
} from "lucide-react";
import { useState } from "react";
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

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "hidden h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 lg:flex sticky top-0",
                collapsed ? "w-20" : "w-64"
            )}
        >
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-100">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <div className="bg-emerald-500 p-1.5 rounded-lg text-white">
                            <Leaf size={20} fill="currentColor" />
                        </div>
                        <span className="text-xl font-bold text-green-600">
                            EcoTracker
                        </span>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="flex-1 space-y-1 p-4">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 group relative",
                                isActive
                                    ? "bg-green-50 text-green-700 font-medium"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon
                                size={22}
                                className={cn(
                                    "shrink-0 transition-colors",
                                    isActive ? "text-green-600" : "text-gray-500 group-hover:text-gray-700"
                                )}
                            />
                            {!collapsed && <span>{item.label}</span>}

                            {/* Tooltip for collapsed state */}
                            {collapsed && (
                                <div className="absolute left-14 top-1/2 -translate-y-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                    {item.label}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-gray-100 p-4 space-y-1">
                <Link
                    href="/settings"
                    className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                >
                    <Settings size={22} className="text-gray-500" />
                    {!collapsed && <span>Settings</span>}
                </Link>
            </div>
        </aside>
    );
}
