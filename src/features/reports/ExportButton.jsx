"use client";
import React, { useState } from 'react';
import { Download, FileText, Printer, Check } from 'lucide-react';

export default function ExportButton() {
    const [isExporting, setIsExporting] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleExport = (type) => {
        setIsExporting(true);
        setShowMenu(false);

        setTimeout(() => {
            if (type === 'print') {
                window.print();
            } else {
                // Mock download
                const data = [
                    ["Date", "Activity", "Carbon (kg)", "Distance (km)", "Type"],
                    ["2023-10-01", "Commute", "2.5", "15", "Car"],
                    ["2023-10-02", "Diet", "1.2", "0", "Beef Impact"],
                    ["2023-10-03", "Energy", "5.0", "0", "Electricity"]
                ];

                const csvContent = "data:text/csv;charset=utf-8,"
                    + data.map(e => e.join(",")).join("\n");

                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_eco_impact_report.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            setIsExporting(false);
        }, 1500);
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
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-1">
                            <button
                                onClick={() => handleExport('csv')}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2"
                            >
                                <FileText size={16} className="text-emerald-600" /> Download CSV
                            </button>
                            <button
                                onClick={() => handleExport('print')}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2"
                            >
                                <Printer size={16} className="text-blue-600" /> Print Report
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
