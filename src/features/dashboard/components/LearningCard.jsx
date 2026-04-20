"use client";

import React from "react";
import { BookOpen } from "lucide-react";

export default function LearningCard() {
    return (
        <div className="glass-card bg-white/80 p-6 rounded-3xl border border-white/70 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Continue Learning</h2>
                <button className="text-sm font-medium text-gray-500 hover:text-gray-900">View All</button>
            </div>
            <div className="space-y-4">
                <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-emerald-50/60 border border-transparent hover:border-emerald-100 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 flex-shrink-0">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">Sustainable Logistics 101</h4>
                        <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-gray-500">2 modules remaining</span>
                            <div className="flex-1 h-1 bg-emerald-100 rounded-full">
                                <div className="h-full bg-emerald-500 rounded-full w-[60%]" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-sky-50/60 border border-transparent hover:border-sky-100 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center text-sky-700 flex-shrink-0">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-sky-700 transition-colors">Intro to Carbon Tracking</h4>
                        <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-gray-500">Not started</span>
                            <div className="flex-1 h-1 bg-sky-100 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
