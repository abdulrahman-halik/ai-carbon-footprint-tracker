"use client";
import React, { useState } from 'react';
import { Download, FileText, Printer } from 'lucide-react';
import reportService from '@/services/reportService';

export default function ExportButton() {
    const [isExporting, setIsExporting] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [error, setError] = useState('');

    const handleExport = async (type) => {
        setIsExporting(true);
        setShowMenu(false);
        setError('');

        try {
            if (type === 'print') {
                window.print();
            } else {
                await reportService.downloadReport(type === 'yearly' ? 'yearly' : 'monthly');
            }
        } catch (err) {
            console.error('Failed to export report:', err);
            setError('Could not export the report. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                disabled={isExporting}
                className="bg-white text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all flex items-center gap-2"
            >
                {isExporting ? (
                    <><span className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /> Exporting...</>
                ) : (
                    <><Download size={18} /> Export Data</>
                )}
            </button>

            {showMenu && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-1">
                            <button
                                onClick={() => handleExport('monthly')}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2"
                            >
                                <FileText size={16} className="text-emerald-600" /> Download Monthly CSV
                            </button>
                            <button
                                onClick={() => handleExport('yearly')}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2"
                            >
                                <FileText size={16} className="text-blue-600" /> Download Yearly CSV
                            </button>
                            <button
                                onClick={() => handleExport('print')}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2"
                            >
                                <Printer size={16} className="text-indigo-600" /> Print Report
                            </button>
                        </div>
                    </div>
                </>
            )}
            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
