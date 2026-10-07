"use client";

import React from 'react';

const VIDEO_IDS = [
    'KxkTphDQDRM',
    '8CfK1PLObRU',
    'JoXnmEjy8DY',
    '6_4s6MM_Ip4',
    'Xy5XL30CvIg',
    'mdmU7-vbHpI',
];

export default function ProjectsPage() {
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Carbon Offset Projects</h1>
                <p className="text-xl text-gray-600">
                    Explore transparent, high-impact projects that are making a real difference in the fight against climate change.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {VIDEO_IDS.map((id) => (
                    <div key={id} className="aspect-video overflow-hidden rounded-3xl bg-slate-100 shadow-md">
                        <iframe
                            className="h-full w-full"
                            src={`https://www.youtube.com/embed/${id}`}
                            title={`Carbon offset project video ${id}`}
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
