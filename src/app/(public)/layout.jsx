import React from 'react';
import { PublicHeader } from '@/features/public-layout/PublicHeader';
import { PublicFooter } from '@/features/public-layout/PublicFooter';

export default function PublicLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50/50">
            <PublicHeader />
            <main className="flex-1 w-full">
                {children}
            </main>
            <PublicFooter />
        </div>
    );
}
