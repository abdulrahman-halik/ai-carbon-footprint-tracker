"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

export default function DashboardShell({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen w-full bg-gray-50 text-gray-900 font-sans">
            {/* Sidebar (Desktop) */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col h-full overflow-hidden relative">
                <Header onMenuClick={() => setSidebarOpen(true)} />

                {/* Mobile Sidebar System */}
                <Sidebar mobile isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8 scroll-smooth pb-24 lg:pb-8">
                    <div className="mx-auto max-w-7xl space-y-8">
                        {children}
                    </div>
                    <Footer />
                </main>

                <BottomNav />
            </div>
        </div>
    );
}
