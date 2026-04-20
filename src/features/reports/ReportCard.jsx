"use client";

import React from 'react';
import { Download, Share2, Calendar } from 'lucide-react';
import { createCertificateSVG, downloadSVG } from '@/lib/reportUtils';
import { useAuth } from '@/hooks/useAuth';

export default function ReportCard({ report }) {
    const { user } = useAuth();
    const badge = user?.name || report.badge;

    const handleDownload = () => {
        const metrics = [
            { label: 'Emissions', value: report.emissions },
            { label: 'Carbon Saved', value: report.saved }
        ];
        const svg = createCertificateSVG({
            title: `${report.month} Impact Certificate`,
            recipient: badge || 'Community Member',
            achievement: `Performance summary for ${report.month}`,
            metrics,
            issuer: 'Carbon Insights Team',
            id: `RPT-${report.id}-${Date.now()}`
        });
        const filename = `report-${report.month.replace(/\s+/g, '-').toLowerCase()}.svg`;
        downloadSVG(svg, filename);
    };

    return (
        <div className="glass-card flex flex-col group bg-white/85 border border-white/70 shadow-xl hover:shadow-2xl transition-all">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shadow-sm ${report.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'}`}>
                        {report.score}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">{report.month}</h4>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar size={12} />
                            <span>Monthly Report</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Emissions</span>
                    <span className="font-medium text-gray-900">{report.emissions} CO2e</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Carbon Saved</span>
                    <span className="font-medium text-emerald-600">-{report.saved}</span>
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-emerald-100/70 flex gap-3">
                <button onClick={handleDownload} className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 py-2 rounded-xl transition-colors border border-emerald-100/70">
                    <Download size={16} />
                    PDF
                </button>
                <button className="flex items-center justify-center p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-xl hover:bg-emerald-50">
                    <Share2 size={18} />
                </button>
            </div>
        </div>
    );
}
