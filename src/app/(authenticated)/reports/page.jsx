"use client";

import { FileText, Download, Share2, Award, Calendar } from "lucide-react";

export default function ReportsPage() {
    const reports = [
        {
            id: 1,
            month: "January 2026",
            score: "A",
            emissions: "850 kg",
            saved: "120 kg",
            status: "Available",
            badge: "Eco Warrior",
            color: "emerald",
        },
        {
            id: 2,
            month: "December 2025",
            score: "B+",
            emissions: "1,100 kg",
            saved: "45 kg",
            status: "Available",
            badge: "Improver",
            color: "blue",
        },
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <FileText className="text-indigo-500" size={32} />
                    Impact Reports
                </h1>
                <p className="text-gray-500 mt-1">Download your monthly sustainability summaries and certificates.</p>
            </div>

            {/* Featured Certificate Card */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-100 mb-2 font-medium">
                            <Award size={20} />
                            <span>Latest Achievement</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Net Zero Hero</h2>
                        <p className="text-indigo-100 max-w-lg">
                            Congratulations! You reduced your carbon footprint by 15% in January compared to last month.
                        </p>
                    </div>
                    <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <Download size={18} />
                        Download Certificate
                    </button>
                </div>
            </div>

            {/* Reports Grid */}
            <h3 className="text-xl font-bold text-gray-900 mt-8">Monthly Summaries</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                    <div key={report.id} className="glass-card flex flex-col group hover:border-indigo-200 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${report.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
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
                            <button className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50 py-2 rounded-lg transition-colors border border-gray-200">
                                <Download size={16} />
                                PDF
                            </button>
                            <button className="flex items-center justify-center p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50">
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
