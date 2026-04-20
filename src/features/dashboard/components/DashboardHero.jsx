"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function DashboardHero({ displayName, onNewEntry }) {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-emerald-100 via-teal-100 to-sky-100 p-8 sm:p-10 shadow-2xl">
            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 -translate-y-12 translate-x-10 rounded-full bg-white/70 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 -translate-x-12 translate-y-8 rounded-full bg-white/60 blur-2xl" />

            <div className="relative flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
                    Daily Overview
                </div>

                <div>
                    <h1
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900"
                        style={{ fontFamily: '"Fraunces", "Times New Roman", serif' }}
                    >
                        Welcome back, {displayName}
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm sm:text-base text-emerald-900/80">
                        Here is what&apos;s happening today. Your footprint is trending lower, and your habits are stacking up.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={onNewEntry}
                        className="group inline-flex items-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-600/25 transition-all hover:translate-y-[-1px] hover:bg-emerald-800"
                    >
                        <span>New Entry</span>
                        <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                    <Link
                        href="/emissions"
                        className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-white/70 px-6 py-3 text-sm font-semibold text-emerald-800 shadow-sm transition-all hover:bg-white"
                    >
                        View Insights
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
