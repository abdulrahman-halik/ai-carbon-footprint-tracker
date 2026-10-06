"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Shield, User as UserIcon, LogOut, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ADMIN_NAV_ITEMS } from "./AdminSidebar";

export default function AdminHeader({ onMenuClick }) {
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const pathname = usePathname();

    const currentNav = ADMIN_NAV_ITEMS.find((item) => item.href === pathname) || {
        label: "Admin Dashboard",
        description: "System Overview",
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
        sessionStorage.setItem("logout_toast", "true");
        window.location.href = "/login";
    };

    return (
        <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-gray-100 bg-white/90 px-4 backdrop-blur-md lg:px-8 transition-all">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden text-gray-500 hover:bg-gray-100 p-2 rounded-xl transition-colors"
                >
                    <Menu size={22} />
                </button>
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                        {currentNav.label}
                    </h1>
                    <p className="text-xs text-gray-500 hidden sm:block">
                        {currentNav.description}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Status indicator */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    <span>Admin Mode Active</span>
                </div>

                {/* Profile menu */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-gray-50 rounded-full transition-colors cursor-pointer group"
                    >
                        <div className="text-right hidden sm:block">
                            <span className="text-xs font-bold text-gray-800 block">
                                {user?.full_name || "Admin"}
                            </span>
                            <span className="text-[10px] uppercase font-semibold text-emerald-600 tracking-wider">
                                Administrator
                            </span>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white ring-2 ring-emerald-100 shadow-sm transition-all">
                            <Shield size={18} strokeWidth={2.5} />
                        </div>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 transition-all">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-sm font-bold text-gray-900">{user?.full_name || "Admin User"}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email || "admin@ecotracker.com"}</p>
                                <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                    Role: Admin
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left font-medium"
                            >
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
