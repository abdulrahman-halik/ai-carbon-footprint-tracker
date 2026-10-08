"use client";

import React from 'react';

const VIDEO_IDS = [
    'ZEqpo9kEpXw',
    'td2A6CFL5fk',
    'bYb7YLsXvzg',
    'w3seLDxbt0E',
    '46NH9GB2-LY',
    'yyVkiBfP3as',
    'Nnky_oD8YLg',
];

export default function LearnPage() {
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Eco Education Hub</h1>
                <p className="text-xl text-gray-600">
                    Discover insights, guides, and the latest research on sustainability and climate action.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {VIDEO_IDS.map((id) => (
                    <div key={id} className="aspect-video overflow-hidden rounded-3xl bg-slate-100 shadow-md">
                        <iframe
                            className="h-full w-full"
                            src={`https://www.youtube.com/embed/${id}`}
                            title={`Eco education video ${id}`}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
