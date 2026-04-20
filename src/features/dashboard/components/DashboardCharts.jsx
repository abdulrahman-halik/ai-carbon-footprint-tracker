"use client";
import React from "react";

/* ── Inline mini bar chart ── */
export function MiniBarChart({ data, color = "#10b981" }) {
    const max = Math.max(...data, 1);
    return (
        <div className="flex items-end gap-1 h-12">
            {data.map((v, i) => (
                <div
                    key={i}
                    className="flex-1 rounded-t-sm transition-all"
                    style={{
                        height: `${Math.max(8, (v / max) * 48)}px`,
                        backgroundColor: i === data.length - 1 ? color : `${color}55`,
                    }}
                />
            ))}
        </div>
    );
}

/* ── Radial progress ring ── */
export function RingProgress({ pct, size = 80, stroke = 8, color = "#10b981", children }) {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const dash = ((pct || 0) / 100) * circ;
    return (
        <svg width={size} height={size} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={r} stroke="#f3f4f6" strokeWidth={stroke} fill="none" />
            <circle
                cx={size / 2} cy={size / 2} r={r}
                stroke={color} strokeWidth={stroke}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={circ - dash}
                style={{ transition: "stroke-dashoffset 0.9s ease" }}
            />
            <foreignObject x={0} y={0} width={size} height={size}>
                <div className="rotate-90 flex items-center justify-center w-full h-full">
                    {children}
                </div>
            </foreignObject>
        </svg>
    );
}
