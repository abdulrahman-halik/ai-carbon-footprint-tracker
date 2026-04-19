"use client";
import React from 'react';

export default function Sparkline({ logs = [] }) {
    if (!logs || logs.length < 2) return null;
    const max = Math.max(...logs.map(l => l.liters || 0), 1);
    const width = Math.max(80, logs.length * 12);
    return (
        <svg className="w-full h-12" viewBox={`0 0 ${width} 40`} preserveAspectRatio="none">
            {logs.map((l, i) => {
                const h = Math.min(36, ((l.liters || 0) / max) * 36 || 4);
                return (
                    <rect key={l.id} x={i * 12 + 2} y={40 - h - 2} width={8} height={h} rx={2} fill="#38bdf8" opacity={0.9} />
                );
            })}
        </svg>
    );
}
