"use client";

import { Menu, Sun, Search, User as UserIcon, Leaf, LogOut } from "lucide-react";
import NotificationBell from "@/features/notifications/NotificationBell";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button"; // Assuming you have a Button component
import { useState, useEffect, useRef } from "react";
import authService from "@/mockApi";

export default function Header({ onMenuClick }) {
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        } else {
            setUser({ name: "Guest", avatar: null });
        }

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await authService.logout();
        setUser(null);
        setIsDropdownOpen(false);
        router.push("/login");
    };

    const pathname = usePathname();

    const linkClass = (path) =>
        `relative py-7 text-xs font-bold tracking-widest uppercase transition-colors
        ${pathname === path
            ? "text-emerald-600 "
            : "text-gray-500 hover:text-emerald-600"
        }`;

    return (
        <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-gray-100 bg-white/90 px-4 backdrop-blur-md lg:px-8 transition-all">
            <div className="flex items-center gap-4 lg:gap-12">
                {/* Mobile Menu Trigger */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden text-gray-500 hover:bg-gray-100 p-2 rounded-lg"
                >
                    <Menu size={20} />
                </button>

                {/* Navigation Links - Tabs Style */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        href="/dashboard"
                        className={linkClass("/dashboard")}
                    >
                        Home

                    </Link>
                    <Link
                        href="/insights"
                        className={linkClass("/insights")}
                    >
                        Insights
                    </Link>
                </nav>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
                {/* Search Bar */}
                <div className="hidden lg:flex items-center gap-3 rounded-full bg-gray-100/80 px-5 py-2.5 w-72 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-100 focus-within:shadow-sm">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Activity..."
                        className="bg-transparent text-sm outline-none w-full placeholder:text-gray-400 text-gray-700 font-medium"
                    />
                </div>

                {/* Notifications */}
                <NotificationBell />

                <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block" />

                {/* User Menu */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-3 pl-2 pr-1 hover:bg-gray-50 rounded-full transition-colors cursor-pointer group"
                    >
                        <span className="hidden text-sm font-bold text-gray-700 sm:block group-hover:text-gray-900">
                            {user?.name || "Guest"}
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-2 ring-white shadow-sm group-hover:ring-emerald-100 transition-all">
                            {user?.avatar ? (
                                <Image src={user.avatar} alt="User Avatar" width={40} height={40} className="rounded-full object-cover" />
                            ) : (
                                <UserIcon size={18} strokeWidth={2.5} />
                            )}
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 transition-all origin-top-right">
                            <div className="px-4 py-3 border-b border-gray-100 mb-1">
                                <p className="text-sm font-medium text-gray-900">{user?.name || "Guest"}</p>
                                {user?.email && <p className="text-xs text-gray-500 truncate">{user.email}</p>}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
