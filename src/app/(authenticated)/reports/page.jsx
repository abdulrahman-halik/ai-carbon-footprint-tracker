"use client";

import React from 'react';
import ReportsHeader from '@/features/reports/ReportsHeader';
import FeaturedCertificate from '@/features/reports/FeaturedCertificate';
import ReportCard from '@/features/reports/ReportCard';

/* ── Canvas utility ── */
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

/* ── Certificate download (Canvas → PNG) ── */
function downloadCertificate() {
    const W = 900, H = 620;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#4f46e5");
    grad.addColorStop(1, "#7c3aed");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // White card area
    ctx.fillStyle = "#ffffff";
    roundRect(ctx, 40, 40, W - 80, H - 80, 24);
    ctx.fill();

    // Gold border
    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 4;
    roundRect(ctx, 50, 50, W - 100, H - 100, 18);
    ctx.stroke();

    // Title
    ctx.fillStyle = "#4f46e5";
    ctx.font = "bold 36px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("Certificate of Achievement", W / 2, 140);

    // Subtitle decoration line
    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 200, 160);
    ctx.lineTo(W / 2 + 200, 160);
    ctx.stroke();

    // Body text
    ctx.fillStyle = "#374151";
    ctx.font = "22px Georgia, serif";
    ctx.fillText("This certifies that", W / 2, 210);

    ctx.fillStyle = "#065f46";
    ctx.font = "bold 32px Georgia, serif";
    ctx.fillText("Eco Warrior", W / 2, 260);

    ctx.fillStyle = "#374151";
    ctx.font = "20px Georgia, serif";
    ctx.fillText("has achieved the rank of", W / 2, 305);

    ctx.fillStyle = "#4f46e5";
    ctx.font = "bold 28px Georgia, serif";
    ctx.fillText("Net Zero Hero", W / 2, 350);

    ctx.fillStyle = "#6b7280";
    ctx.font = "16px Georgia, serif";
    ctx.fillText("by reducing carbon footprint by 15% in January 2026", W / 2, 390);
    ctx.fillText("compared to the previous month.", W / 2, 414);

    // Issue date
    ctx.fillStyle = "#9ca3af";
    ctx.font = "14px Arial, sans-serif";
    ctx.fillText(
        `Issued: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
        W / 2,
        480
    );

    // Score badge circle
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath();
    ctx.arc(W / 2, 530, 32, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "#92400e";
    ctx.font = "bold 22px Arial";
    ctx.textAlign = "center";
    ctx.fillText("A", W / 2, 538);

    // Trigger download
    const link = document.createElement("a");
    link.download = "eco_certificate_jan_2026.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

/* ── PDF report download (raw PDF spec, no library needed) ── */
function downloadReportPDF(report) {
    const now = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    // Build a minimal but valid PDF using plain-text PDF spec
    const bodyLines = [
        `BT`,
        `/F1 20 Tf`,
        `50 790 Td`,
        `(AI Carbon Footprint Tracker) Tj`,
        `/F1 14 Tf`,
        `0 -30 Td`,
        `(Monthly Impact Report  --  ${report.month}) Tj`,
        `/F1 10 Tf`,
        `0 -22 Td`,
        `(Generated: ${now}) Tj`,
        `0 -20 Td`,
        `(--------------------------------------------------) Tj`,
        `0 -20 Td`,
        `(Eco Score:         ${report.score}) Tj`,
        `0 -18 Td`,
        `(Achievement Badge: ${report.badge}) Tj`,
        `0 -18 Td`,
        `(Total CO2 Emitted: ${report.emissions} CO2e) Tj`,
        `0 -18 Td`,
        `(Carbon Saved:      -${report.saved}) Tj`,
        `0 -18 Td`,
        `(Status:             ${report.status}) Tj`,
        `0 -26 Td`,
        `(--------------------------------------------------) Tj`,
        `0 -22 Td`,
        `(Thank you for contributing to a greener planet.) Tj`,
        `0 -18 Td`,
        `(Keep tracking your impact with EcoTracker.) Tj`,
        `ET`,
    ].join("\n");

    const streamLength = bodyLines.length;

    const pdf = [
        `%PDF-1.4`,
        `1 0 obj`,
        `<< /Type /Catalog /Pages 2 0 R >>`,
        `endobj`,
        `2 0 obj`,
        `<< /Type /Pages /Kids [3 0 R] /Count 1 >>`,
        `endobj`,
        `3 0 obj`,
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>`,
        `endobj`,
        `4 0 obj`,
        `<< /Length ${streamLength} >>`,
        `stream`,
        bodyLines,
        `endstream`,
        `endobj`,
        `5 0 obj`,
        `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`,
        `endobj`,
        `xref`,
        `0 6`,
        `0000000000 65535 f `,
        `0000000009 00000 n `,
        `0000000058 00000 n `,
        `0000000115 00000 n `,
        `0000000274 00000 n `,
        `0000001000 00000 n `,
        `trailer`,
        `<< /Size 6 /Root 1 0 R >>`,
        `startxref`,
        `1100`,
        `%%EOF`,
    ].join("\n");

    const blob = new Blob([pdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `eco_report_${report.month.replace(/\s+/g, "_").toLowerCase()}.pdf`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
}

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
        <div className="relative space-y-10 max-w-7xl mx-auto pb-10">
            <div className="pointer-events-none absolute -top-10 right-6 h-40 w-40 rounded-full bg-emerald-200/60 blur-3xl" />
            <div className="pointer-events-none absolute -top-6 left-1/3 h-32 w-32 rounded-full bg-amber-200/60 blur-3xl" />
            <div className="pointer-events-none absolute top-48 left-10 h-48 w-48 rounded-full bg-sky-200/60 blur-3xl" />

<<<<<<< HEAD
            <ReportsHeader />
            <FeaturedCertificate />
=======
            {/* Featured Certificate Card */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
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
                    <button
                        onClick={downloadCertificate}
                        className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <Download size={18} />
                        Download Certificate
                    </button>
                </div>
            </div>
>>>>>>> 48b88ac0bde4c25fc8ea2f622134df6ba38b17d6

            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Monthly Summaries</h3>
                <span className="rounded-2xl border border-emerald-200 bg-white/70 px-4 py-2 text-xs font-semibold text-emerald-800">2 reports ready</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
<<<<<<< HEAD
                    <ReportCard key={report.id} report={report} />
=======
                    <div key={report.id} className="glass-card flex flex-col group hover:border-indigo-200 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${report.color === "emerald"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-blue-100 text-blue-700"
                                        }`}
                                >
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
                            <button
                                onClick={() => downloadReportPDF(report)}
                                className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50 py-2 rounded-lg transition-colors border border-gray-200"
                            >
                                <Download size={16} />
                                PDF
                            </button>
                            <button className="flex items-center justify-center p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50">
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>
>>>>>>> 48b88ac0bde4c25fc8ea2f622134df6ba38b17d6
                ))}
            </div>
        </div>
    );
}
