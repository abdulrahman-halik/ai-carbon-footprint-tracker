"use client";

import React from "react";

export default function NotificationsHero() {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-emerald-100 via-teal-100 to-sky-100 p-8 sm:p-10 shadow-2xl">
            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 -translate-y-12 translate-x-10 rounded-full bg-white/70 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 -translate-x-12 translate-y-8 rounded-full bg-white/60 blur-2xl" />

            <div className="relative space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
                    Notifications
                </div>
                <h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900"
                    style={{ fontFamily: '"Fraunces", "Times New Roman", serif' }}
                >
                    All Updates
                </h1>
                <p className="text-sm sm:text-base text-emerald-900/80 max-w-2xl">
                    Review alerts, tips, and achievements across your sustainability journey.
                </p>
            </div>
        </section>
    );
}
