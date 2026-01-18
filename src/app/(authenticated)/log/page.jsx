"use client";
import React from 'react';
import ActivityLogWizard from '@/features/tracking/ActivityLogWizard';

export default function LogActivityPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-12 pt-6 px-4 sm:px-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                    <span className="text-gradient">
                        Log Activity
                    </span>
                </h1>
                <p className="text-lg text-gray-500 max-w-xl mx-auto">
                    Track your transport and diet to measure your daily impact.
                </p>
            </div>

            <ActivityLogWizard />
        </div>
    );
}
