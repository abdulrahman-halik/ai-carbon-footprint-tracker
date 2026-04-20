"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Download, Eye, FileText, Sparkles, Leaf, Gauge, ShieldCheck, Info, ListChecks, Route, UtensilsCrossed, Plane, Zap, ShoppingBag } from 'lucide-react';
import ReportsHeader from '@/features/reports/ReportsHeader';
import FeaturedCertificate from '@/features/reports/FeaturedCertificate';
import ReportCard from '@/features/reports/ReportCard';
import { Button } from '@/components/ui/Button';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal';
import { createCertificateSVG, downloadSVG } from '@/lib/reportUtils';

const ESTIMATED_REPORT_KEY = 'eco_estimated_report';
const ANSWER_TITLES = {
    transport: 'Transport',
    diet: 'Diet',
    flights: 'Flights',
    energy: 'Energy',
    shopping: 'Shopping',
};

const ANSWER_ICONS = {
    Transport: Route,
    Diet: UtensilsCrossed,
    Flights: Plane,
    Energy: Zap,
    Shopping: ShoppingBag,
};

function getEstimateTone(score) {
    const numeric = Number(score ?? 0);
    if (numeric < 5) {
        return {
            badge: 'Eco Positive',
            container: 'border-primary/30 bg-gradient-to-r from-primary-light/70 via-white to-secondary-light/40',
            chip: 'bg-primary-light text-primary border border-primary/20',
            score: 'text-primary',
        };
    }

    if (numeric < 12) {
        return {
            badge: 'Balanced Impact',
            container: 'border-secondary/30 bg-gradient-to-r from-secondary-light/70 via-white to-primary-light/40',
            chip: 'bg-secondary-light text-secondary border border-secondary/20',
            score: 'text-secondary',
        };
    }

    return {
        badge: 'Needs Improvement',
        container: 'border-accent/30 bg-gradient-to-r from-accent-light/70 via-white to-primary-light/30',
        chip: 'bg-accent-light text-accent border border-accent/20',
        score: 'text-accent',
    };
}

export default function ReportsPage() {
    const [estimate, setEstimate] = useState(null);
    const [isEstimateOpen, setIsEstimateOpen] = useState(false);

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

    useEffect(() => {
        try {
            const saved = localStorage.getItem(ESTIMATED_REPORT_KEY);
            if (!saved) return;
            const parsed = JSON.parse(saved);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setEstimate(parsed);
        } catch (error) {
            console.error('Failed to load estimated report:', error);
        }
    }, []);

    const formattedEstimateDate = useMemo(() => {
        if (!estimate?.createdAt) return 'Not available';
        return new Date(estimate.createdAt).toLocaleString();
    }, [estimate]);

    const estimateAnswers = useMemo(() => {
        if (!estimate?.answers) return [];
        return Object.entries(estimate.answers).map(([key, value]) => ({
            label: ANSWER_TITLES[key] || key,
            value,
        }));
    }, [estimate]);

    const estimateTone = useMemo(() => getEstimateTone(estimate?.score), [estimate?.score]);

    const downloadEstimateReport = () => {
        if (!estimate) return;

        const metrics = [
            { label: 'Estimator Score', value: String(estimate.score ?? '-') },
            { label: 'Category', value: estimate.level || 'Unknown' },
            { label: 'Answered Questions', value: String(estimateAnswers.length) },
        ];

        const svg = createCertificateSVG({
            title: 'Estimated Carbon Report',
            recipient: 'EcoTracker User',
            achievement: estimate.description || 'Quick estimator result summary',
            metrics,
            issuer: 'EcoTracker Estimator',
            id: `EST-${Date.now()}`,
        });

        downloadSVG(svg, 'estimated-full-report.svg');
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-10">
            <ReportsHeader />
            <FeaturedCertificate />

            {estimate && (
                <div className={`relative overflow-hidden rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${estimateTone.container}`}>
                    <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/50 blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-14 -left-14 h-44 w-44 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="relative z-10">
                            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold mb-3 animate-in fade-in ${estimateTone.chip}`}>
                                <Sparkles size={14} />
                                Estimator Report
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <Leaf size={22} className="text-primary animate-pulse" />
                                Estimated Full Report
                            </h3>
                            <p className="text-gray-600 mt-1">Your latest quick estimate is saved here for review and download.</p>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${estimateTone.chip}`}>
                                    <Gauge size={12} />
                                    {estimateTone.badge}
                                </div>
                                <div className="inline-flex items-center gap-1 rounded-full bg-white/70 border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-600">
                                    <ShieldCheck size={12} className="text-primary" />
                                    Score {estimate?.score ?? '-'}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-3 animate-in fade-in duration-700">
                                <CalendarDays size={14} className="text-gray-400" />
                                Generated: {formattedEstimateDate}
                            </div>
                        </div>
                        <div className="relative z-10 flex flex-col sm:flex-row gap-3">
                            <Button variant="secondary" className="flex items-center gap-2 hover:-translate-y-0.5 transition-all" onClick={() => setIsEstimateOpen(true)}>
                                <Eye size={16} />
                                View Report
                            </Button>
                            <Button className="flex items-center gap-2 hover:-translate-y-0.5 transition-all" onClick={downloadEstimateReport}>
                                <Download size={16} />
                                Download Report
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {!estimate && (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                        <FileText className="text-gray-500 mt-0.5" size={18} />
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">No estimated report yet</h3>
                            <p className="text-gray-600 text-sm mt-1">Complete the quick estimator to generate a full estimated report in this section.</p>
                        </div>
                    </div>
                </div>
            )}

            <h3 className="text-xl font-bold text-gray-900 mt-8">Monthly Summaries</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                ))}
            </div>

            <Modal isOpen={isEstimateOpen} onClose={() => setIsEstimateOpen(false)}>
                <ModalContent className="max-w-2xl">
                    <ModalHeader>
                        <ModalTitle>Estimated Full Report</ModalTitle>
                    </ModalHeader>

                    <div className="p-4 sm:p-6 space-y-5">
                        <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent animate-in fade-in duration-700" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-4 transition-all hover:shadow-sm animate-in slide-in-from-bottom-2 duration-500">
                                <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-primary-light text-primary border border-primary/20 mb-2">
                                    <Gauge size={12} />
                                    Score
                                </div>
                                <p className={`text-3xl font-extrabold mt-1 ${estimateTone.score}`}>{estimate?.score ?? '-'}</p>
                                <p className="text-xs text-gray-500 mt-1">Out of a quick-estimate scale</p>
                            </div>
                            <div className="rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 p-4 transition-all hover:shadow-sm animate-in slide-in-from-bottom-2 duration-700">
                                <div className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-secondary-light text-secondary border border-secondary/20 mb-2">
                                    <Sparkles size={12} />
                                    Category
                                </div>
                                <p className="text-lg font-bold text-primary mt-2">{estimate?.level || 'Unknown'}</p>
                                <p className="text-xs text-gray-500 mt-1">Personalized from your selected habits</p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-primary/20 bg-primary-light/20 p-4 animate-in fade-in duration-700">
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <Info size={16} className="text-primary" />
                                Summary
                            </h4>
                            <p className="text-gray-700 text-sm">{estimate?.description || 'No summary available.'}</p>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-4 animate-in fade-in duration-700">
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <ListChecks size={17} className="text-secondary" />
                                Your Answers
                            </h4>
                            <div className="space-y-2">
                                {estimateAnswers.map((item) => (
                                    <div key={item.label} className="flex justify-between gap-4 text-sm rounded-lg px-2 py-1.5 hover:bg-gray-50 transition-colors">
                                        <span className="text-gray-600 inline-flex items-center gap-2">
                                            {(() => {
                                                const LabelIcon = ANSWER_ICONS[item.label] || FileText;
                                                return <LabelIcon size={14} className="text-gray-400" />;
                                            })()}
                                            {item.label}
                                        </span>
                                        <span className="text-gray-900 font-semibold text-right">{item.value}</span>
                                    </div>
                                ))}
                                {estimateAnswers.length === 0 && (
                                    <p className="text-sm text-gray-500">No answer details found for this estimate.</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <Button variant="secondary" onClick={() => setIsEstimateOpen(false)}>Close</Button>
                            <Button onClick={downloadEstimateReport} className="flex items-center gap-2">
                                <Download size={16} />
                                Download Report
                            </Button>
                        </div>
                    </div>
                </ModalContent>
            </Modal>
        </div>
    );
}
