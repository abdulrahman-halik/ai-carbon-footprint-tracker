"use client";

import React from 'react';
import { Download, Share2, Calendar } from 'lucide-react';
import { createCertificateSVG, downloadSVG } from '@/lib/reportUtils';
import { useAuth } from '@/hooks/useAuth';

export default function ReportCard({ report }) {
    const { user } = useAuth();
    const badge = user?.name || report.badge;

    const handleDownload = () => {
        const svg = createCertificateSVG({ title: `${report.month} Summary`, subtitle: `Emissions: ${report.emissions} • Saved: ${report.saved}`, badge, month: report.month });
        const filename = `report-${report.month.replace(/\s+/g, '-').toLowerCase()}.svg`;
        downloadSVG(svg, filename);
    };

    return (
        <div className="glass-card flex flex-col group hover:border-indigo-200 transition-colors">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${report.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
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

            <div className="mt-auto pt-4 border-t border-gray-100 flex gap-3">
                <button onClick={handleDownload} className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50 py-2 rounded-lg transition-colors border border-gray-200">
                    <Download size={16} />
                    PDF
                </button>
                <button className="flex items-center justify-center p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50">
                    <Share2 size={18} />
                </button>
            </div>
        </div>
    );
}
