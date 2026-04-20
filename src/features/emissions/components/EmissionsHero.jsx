"use client";

import React from "react";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function EmissionsHero({ showInputs, onToggleInputs }) {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-emerald-100 via-teal-100 to-sky-100 p-8 sm:p-10 shadow-2xl">
            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 -translate-y-12 translate-x-10 rounded-full bg-white/70 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 -translate-x-12 translate-y-8 rounded-full bg-white/60 blur-2xl" />

            <div className="relative flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
                    Emissions Studio
                </div>

                <div>
                    <h2
                        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900"
                        style={{ fontFamily: '"Fraunces", "Times New Roman", serif' }}
                    >
                        Emissions Dashboard
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm sm:text-base text-emerald-900/80">
                        Track, analyze, and compare your footprint with a live mix of energy, transport, and lifestyle signals.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Button
                        onClick={onToggleInputs}
                        className="flex items-center gap-2 rounded-2xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-600/25 transition-all hover:translate-y-[-1px] hover:bg-emerald-800"
                    >
                        <Calculator className="w-4 h-4" />
                        {showInputs ? "Hide" : "Update"} Data
                    </Button>
                    <span className="rounded-2xl border border-emerald-200 bg-white/70 px-6 py-3 text-xs font-semibold text-emerald-800">
                        Weekly trend ready
                    </span>
                </div>
            </div>
        </section>
    );
}
