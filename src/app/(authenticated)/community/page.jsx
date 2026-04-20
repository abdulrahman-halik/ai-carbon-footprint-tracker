"use client";
import React from 'react';
import Leaderboard from '@/features/social/Leaderboard';
import PeerComparison from '@/features/social/PeerComparison';

export default function CommunityPage() {
    return (
        <div className="relative space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="pointer-events-none absolute -top-10 right-6 h-40 w-40 rounded-full bg-emerald-200/60 blur-3xl" />
            <div className="pointer-events-none absolute -top-6 left-1/3 h-32 w-32 rounded-full bg-amber-200/60 blur-3xl" />
            <div className="pointer-events-none absolute top-48 left-10 h-48 w-48 rounded-full bg-sky-200/60 blur-3xl" />

            <section className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-emerald-100 via-teal-100 to-sky-100 p-8 sm:p-10 shadow-2xl">
                <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 -translate-y-12 translate-x-10 rounded-full bg-white/70 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 -translate-x-12 translate-y-8 rounded-full bg-white/60 blur-2xl" />

                <div className="relative flex flex-col gap-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
                        Community Hub
                    </div>
                    <div>
                        <h1
                            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900"
                            style={{ fontFamily: '"Fraunces", "Times New Roman", serif' }}
                        >
                            Connect. Compete. Grow.
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm sm:text-base text-emerald-900/80">
                            Celebrate wins, compare progress, and keep your neighborhood footprint trending lower together.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-2xl border border-emerald-200 bg-white/70 px-5 py-2 text-xs font-semibold text-emerald-800">🌱 142 Active Neighbors</span>
                        <span className="rounded-2xl border border-emerald-200 bg-white/70 px-5 py-2 text-xs font-semibold text-emerald-800">Weekly leaderboard</span>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <PeerComparison />
                <Leaderboard />
            </div>
        </div>
    );
}
