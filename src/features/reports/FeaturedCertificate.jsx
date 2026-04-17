"use client";

import React from 'react';
import { Download, Award } from 'lucide-react';
import { createCertificateSVG, downloadSVG } from '@/lib/reportUtils';
import { useAuth } from '@/hooks/useAuth';

export default function FeaturedCertificate() {
    const { user } = useAuth();
    const badge = user?.name || 'Eco Warrior';

    const handleDownload = () => {
        const svg = createCertificateSVG({ title: 'Net Zero Hero', subtitle: 'Congratulations! You reduced your carbon footprint by 15% in January.', badge, month: 'January 2026' });
        downloadSVG(svg, 'certificate-net-zero-hero.svg');
    };

    return (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-indigo-100 mb-2 font-medium">
                        <Award size={20} />
                        <span>Latest Achievement</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Net Zero Hero</h2>
                    <p className="text-indigo-100 max-w-lg">Congratulations! You reduced your carbon footprint by 15% in January compared to last month.</p>
                </div>
                <button onClick={handleDownload} className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Download size={18} />
                    Download Certificate
                </button>
            </div>
        </div>
    );
}
