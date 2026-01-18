"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Leaf, Users, Globe, Award } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="pb-20">
            {/* Hero */}
            <section className="bg-green-900 text-white py-20 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Our Mission</h1>
                    <p className="text-xl md:text-2xl text-green-100 leading-relaxed font-light">
                        To empower 1 billion people to take measurable climate action through technology,
                        community, and transparency.
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="container mx-auto px-4 -mt-12 relative z-10 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="text-center shadow-lg border-none">
                        <CardContent className="pt-8">
                            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                                <Globe size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Global Impact</h3>
                            <p className="text-gray-500">We believe in solutions that scale across borders and cultures.</p>
                        </CardContent>
                    </Card>
                    <Card className="text-center shadow-lg border-none">
                        <CardContent className="pt-8">
                            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                                <Leaf size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Radical Transparency</h3>
                            <p className="text-gray-500">We verify every offset and track every calculation openly.</p>
                        </CardContent>
                    </Card>
                    <Card className="text-center shadow-lg border-none">
                        <CardContent className="pt-8">
                            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Community Driven</h3>
                            <p className="text-gray-500">Real change happens when we work together towards a common goal.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Story */}
            <section className="container mx-auto px-4 py-20 max-w-4xl">
                <div className="prose prose-lg mx-auto text-gray-600">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
                    <p className="mb-6">
                        EcoTracker began in 2024 with a simple observation: most people want to help the planet,
                        but they don&apos;t know where to start. The data was too complex, the solutions too expensive,
                        and the impact too abstract.
                    </p>
                    <p className="mb-6">
                        We set out to build a tool that makes carbon tracking as easy as tracking steps.
                        By combining behavioral science with precise data modeling, we created a platform that
                        doesn&apos;t just measure problems—it illuminates solutions.
                    </p>
                </div>
            </section>

            {/* Team */}
            <section className="bg-gray-50 py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet the Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: "Sarah Chen", role: "CEO & Founder", image: "bg-orange-200" },
                            { name: "David Miller", role: "Chief Scientist", image: "bg-blue-200" },
                            { name: "Elena Rodriguez", role: "Head of Product", image: "bg-pink-200" },
                            { name: "James Wilson", role: "CTO", image: "bg-indigo-200" }
                        ].map((member) => (
                            <div key={member.name} className="flex flex-col items-center">
                                <div className={`w-32 h-32 rounded-full mb-4 ${member.image} flex items-center justify-center text-2xl font-bold text-white/50`}>
                                    {member.name.charAt(0)}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                                <p className="text-primary font-medium">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
