"use client";

import { Menu, Search, User as UserIcon, LogOut, BarChart3, Droplets, Zap, Target, FileText, Users, FlaskConical, Activity, Lightbulb, LayoutDashboard, X } from "lucide-react";
import NotificationBell from "@/features/notifications/NotificationBell";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import authService from "@/mockApi";
import { useAuth } from "@/hooks/useAuth";

const SEARCH_INDEX = [
    { label: "Dashboard", desc: "Your home overview and stats", href: "/dashboard", icon: LayoutDashboard, category: "Pages" },
    { label: "Insights", desc: "AI-powered insight analysis", href: "/insights", icon: Lightbulb, category: "Pages" },
    { label: "Emissions", desc: "Carbon emissions breakdown", href: "/emissions", icon: BarChart3, category: "Pages" },
    { label: "Activity Log", desc: "Log transport, diet and habits", href: "/log", icon: Activity, category: "Pages" },
    { label: "Goals", desc: "Set and track reduction targets", href: "/goals", icon: Target, category: "Pages" },
    { label: "Water", desc: "Track water consumption", href: "/water", icon: Droplets, category: "Pages" },
    { label: "Energy", desc: "Monitor meter and electricity usage", href: "/energy", icon: Zap, category: "Pages" },
    { label: "Reports", desc: "Download monthly summaries and certificates", href: "/reports", icon: FileText, category: "Pages" },
    { label: "Community", desc: "Leaderboards and peer comparisons", href: "/community", icon: Users, category: "Pages" },
    { label: "Team", desc: "Collaborate with your team", href: "/social", icon: Users, category: "Pages" },
    { label: "Simulate", desc: "Run what-if carbon scenarios", href: "/simulate", icon: FlaskConical, category: "Pages" },
    { label: "Profile", desc: "Edit your account and settings", href: "/profile", icon: UserIcon, category: "Pages" },
    { label: "Log transport activity", desc: "Add a travel / commute entry", href: "/log", icon: Activity, category: "Quick Actions" },
    { label: "Log diet activity", desc: "Add a meal / food impact entry", href: "/log", icon: Activity, category: "Quick Actions" },
    { label: "Add meter reading", desc: "Submit a new electricity meter value", href: "/energy", icon: Zap, category: "Quick Actions" },
    { label: "Add water usage", desc: "Log daily water consumption", href: "/water", icon: Droplets, category: "Quick Actions" },
    { label: "Create a new goal", desc: "Set a carbon reduction target", href: "/goals", icon: Target, category: "Quick Actions" },
    { label: "View emissions breakdown", desc: "See full emissions analytics", href: "/emissions", icon: BarChart3, category: "Quick Actions" },
    { label: "Generate report", desc: "Download a monthly impact report", href: "/reports", icon: FileText, category: "Quick Actions" },
];

export default function Header({ onMenuClick }) {
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const router = useRouter();
    const { logout } = useAuth();

    const filteredResults = searchQuery.trim().length > 0
        ? SEARCH_INDEX.filter(item =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.desc.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const groupedResults = filteredResults.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    const navigateTo = useCallback((href) => {
        setSearchQuery("");
        setSearchOpen(false);
        setActiveIndex(-1);
        router.push(href);
    }, [router]);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        } else {
            setUser({ name: "Guest", avatar: null });
        }

        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearchKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex(i => Math.min(i + 1, filteredResults.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex(i => Math.max(i - 1, 0));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0 && filteredResults[activeIndex]) {
                navigateTo(filteredResults[activeIndex].href);
            } else if (filteredResults.length > 0) {
                navigateTo(filteredResults[0].href);
            }
        } else if (e.key === "Escape") {
            setSearchOpen(false);
            setSearchQuery("");
            inputRef.current?.blur();
        }
    };

    const handleLogout = async () => {
        await logout();
        setIsDropdownOpen(false);
        sessionStorage.setItem("logout_toast", "true");
        window.location.href = "/";
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
                <div ref={searchRef} className="relative hidden lg:block">
                    <div className={`flex items-center gap-3 rounded-full px-5 py-2.5 w-72 transition-all
                        ${searchOpen
                            ? "bg-white ring-2 ring-primary/30 shadow-md"
                            : "bg-gray-100/80 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:shadow-sm"
                        }`}>
                        <Search size={18} className={searchOpen ? "text-primary" : "text-gray-400"} />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); setActiveIndex(-1); }}
                            onFocus={() => setSearchOpen(true)}
                            onKeyDown={handleSearchKeyDown}
                            placeholder="Search Activity..."
                            className="bg-transparent text-sm outline-none w-full placeholder:text-gray-400 text-gray-700 font-medium"
                        />
                        {searchQuery && (
                            <button onClick={() => { setSearchQuery(""); setActiveIndex(-1); inputRef.current?.focus(); }}>
                                <X size={15} className="text-gray-400 hover:text-gray-600 transition-colors" />
                            </button>
                        )}
                    </div>

                    {/* Dropdown */}
                    {searchOpen && searchQuery.trim().length > 0 && (
                        <div className="absolute top-full mt-2 left-0 w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                            {filteredResults.length === 0 ? (
                                <div className="px-5 py-6 text-center text-sm text-gray-500">
                                    No results for <span className="font-semibold text-gray-800">&ldquo;{searchQuery}&rdquo;</span>
                                </div>
                            ) : (
                                <div className="py-2 max-h-80 overflow-y-auto">
                                    {Object.entries(groupedResults).map(([category, items]) => {
                                        const flatIndex = filteredResults.indexOf(items[0]);
                                        return (
                                            <div key={category}>
                                                <p className="px-4 pt-3 pb-1 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                                                    {category}
                                                </p>
                                                {items.map((item) => {
                                                    const itemIdx = filteredResults.indexOf(item);
                                                    const Icon = item.icon;
                                                    const isActive = activeIndex === itemIdx;
                                                    return (
                                                        <button
                                                            key={item.href + item.label}
                                                            onMouseDown={() => navigateTo(item.href)}
                                                            onMouseEnter={() => setActiveIndex(itemIdx)}
                                                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors
                                                                ${isActive ? "bg-primary-light" : "hover:bg-gray-50"}`}
                                                        >
                                                            <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg
                                                                ${isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-500"}`}>
                                                                <Icon size={15} />
                                                            </span>
                                                            <span className="flex-1 min-w-0">
                                                                <span className="block text-sm font-semibold text-gray-900 truncate">{item.label}</span>
                                                                <span className="block text-xs text-gray-500 truncate">{item.desc}</span>
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            <div className="border-t border-gray-100 px-4 py-2 flex items-center gap-3 text-[11px] text-gray-400 bg-gray-50/80">
                                <span><kbd className="font-mono bg-white border border-gray-200 rounded px-1">↑↓</kbd> navigate</span>
                                <span><kbd className="font-mono bg-white border border-gray-200 rounded px-1">↵</kbd> open</span>
                                <span><kbd className="font-mono bg-white border border-gray-200 rounded px-1">Esc</kbd> close</span>
                            </div>
                        </div>
                    )}
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
                            <Link
                                href="/profile"
                                onClick={() => setIsDropdownOpen(false)}
                                className="block px-4 py-3 border-b border-gray-100 mb-1 hover:bg-gray-50 transition-colors"
                            >
                                <p className="text-sm font-medium text-gray-900">{user?.name || "Guest"}</p>
                                {user?.email && <p className="text-xs text-gray-500 truncate">{user.email}</p>}
                            </Link>
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
