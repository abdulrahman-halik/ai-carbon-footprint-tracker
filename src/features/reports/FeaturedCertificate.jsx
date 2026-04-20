"use client";

import React from 'react';
import { Download, Award } from 'lucide-react';
import { createCertificateSVG, downloadSVG } from '@/lib/reportUtils';
import { useAuth } from '@/hooks/useAuth';

export default function FeaturedCertificate() {
    const { user } = useAuth();
    const badge = user?.name || 'Eco Warrior';

    const handleDownload = () => {
        const metrics = [
            { label: 'Reduction', value: '15%' },
            { label: 'Period', value: 'January' }
        ];
        const svg = createCertificateSVG({
            title: 'Net Zero Hero',
            recipient: badge || 'Eco Advocate',
            achievement: 'Reduced carbon footprint by 15% versus prior month',
            metrics,
            issuer: 'Carbon Insights Team',
            id: `NETZERO-${Date.now()}`
        });
        downloadSVG(svg, 'certificate-net-zero-hero.svg');
    };

    return (
        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-sky-600 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-emerald-100 mb-3 font-medium uppercase tracking-[0.2em] text-xs">
                        <Award size={18} />
                        <span>Latest Achievement</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-2">Net Zero Hero</h2>
                    <p className="text-emerald-100 max-w-lg">Congratulations! You reduced your carbon footprint by 15% in January compared to last month.</p>
                </div>
                <button onClick={handleDownload} className="bg-white text-emerald-700 px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Download size={18} />
                    Download Certificate
                </button>
            </div>
        </div>
    );
}
