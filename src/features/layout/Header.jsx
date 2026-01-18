"use client";

import { Bell, Menu, Sun, Search, User as UserIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button"; // Assuming you have a Button component
import { useState } from "react";

export default function Header({ onMenuClick }) {
    // Mock user for now
    const user = {
        name: "Alex Doe",
        avatar: null,
    };

    return (
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md lg:px-6">
            <div className="flex items-center gap-4">
                {/* Mobile Menu Trigger */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden text-gray-500 hover:bg-gray-100 p-2 rounded-lg"
                >
                    <Menu size={20} />
                </button>

                {/* Mobile Logo */}
                <Link href="/dashboard" className="lg:hidden font-bold text-xl text-green-600">
                    EcoTracker
                </Link>

                {/* Desktop Search (Optional) */}
                <div className="hidden lg:flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 w-64">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent text-sm outline-none w-full placeholder:text-gray-400 text-gray-700"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                {/* Theme Toggle (Mock) */}
                <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors">
                    <Sun size={20} />
                </button>

                {/* Notifications */}
                <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors">
                    <Bell size={20} />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>

                <div className="h-6 w-px bg-gray-200 mx-1" />

                {/* User Menu */}
                <button className="flex items-center gap-3 rounded-full border border-gray-200 p-1 pl-3 pr-2 hover:bg-gray-50 transition-colors">
                    <span className="hidden text-sm font-medium text-gray-700 sm:block">
                        {user.name}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
                        {user.avatar ? <Image src={user.avatar} alt="User Avatar" width={32} height={32} className="rounded-full object-cover" /> : <UserIcon size={16} />}
                    </div>
                </button>
            </div>
        </header>
    );
}
