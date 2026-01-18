"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    PlusCircle,
    User,
    BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOBILE_NAV_ITEMS = [
    { label: "Home", href: "/dashboard", icon: LayoutDashboard },
    { label: "Emissions", href: "/emissions", icon: BarChart3 },
    { label: "Log", href: "/actions", icon: PlusCircle, isPrimary: true }, // Highlighted action
    { label: "Profile", href: "/profile", icon: User },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 block border-t border-gray-200 bg-white pb-safe pt-2 lg:hidden">
            <div className="flex items-end justify-around pb-2">
                {MOBILE_NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    if (item.isPrimary) {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center justify-end -mt-6"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 shadow-lg shadow-green-200 text-white transition-transform active:scale-95">
                                    <Icon size={24} />
                                </div>
                                <span className="mt-1 text-[10px] font-medium text-gray-600">
                                    {item.label}
                                </span>
                            </Link>
                        )
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center p-2 text-center transition-colors",
                                isActive ? "text-green-600" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            <Icon size={24} className={cn("mb-1", isActive && "fill-current")} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
