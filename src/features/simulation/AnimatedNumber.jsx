"use client";

import React, { useEffect, useRef, useState } from 'react';

export function AnimatedNumber({ value, duration = 600, format = (v) => v.toLocaleString() , className = '' }) {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const fromRef = useRef(value);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    const from = fromRef.current || 0;
    const to = Number(value) || 0;
    const start = performance.now();
    startRef.current = start;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // simple ease
      const cur = Math.round(from + (to - from) * eased);
      setDisplay(cur);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration]);

  return <span className={className}>{format(display)}</span>;
}

export function DonutPercent({ percent = 0, size = 120, stroke = 12, color = '#34d399', bg = '#e6eef6', textColor = '#0f172a' }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (percent / 100) * circumference;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${size/2},${size/2})`}>
        <circle r={radius} fill="none" stroke={bg} strokeWidth={stroke} />
        <circle r={radius} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`} transform={`rotate(-90)`} style={{ transition: 'stroke-dasharray 400ms cubic-bezier(.2,.8,.2,1)' }} />
        <text x="0" y="6" textAnchor="middle" fontSize="18" fill={textColor} fontWeight="700">{Math.round(percent)}%</text>
      </g>
    </svg>
  );
}

export default AnimatedNumber;
