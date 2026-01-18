"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf, BarChart3, Globe, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

// Simple hook for scroll animation
function useIntersectionObserver(options = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsIntersecting(true);
                observer.disconnect(); // Trigger once
            }
        }, options);

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [options]);

    return [targetRef, isIntersecting];
}

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <Card
            ref={ref}
            className={cn(
                "border-none shadow-md hover:shadow-xl transition-all duration-700 transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 text-primary">
                    <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
};

const StatCounter = ({ value, label, suffix = "" }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isVisible) {
            let start = 0;
            const end = parseInt(value.replace(/,/g, ''));
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isVisible, value]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
                {count.toLocaleString()}{suffix}
            </div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</div>
        </div>
    );
};

export default function LandingPage() {
    return (
        <div className="flex flex-col gap-20 pb-20">
            {/* Hero Section */}
            <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary-100/50 rounded-full blur-3xl opacity-60" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl opacity-60" />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-primary text-sm font-medium mb-8 border border-green-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        New: Personal AI Carbon Coach
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
                        Track Your Impact. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-700">
                            Heal the Planet.
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Measure your daily carbon footprint, discover personalized ways to reduce it,
                        and contribute to verified global offset projects.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/register">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                                Start Your Journey
                            </Button>
                        </Link>
                        <Link href="/estimator">
                            <Button variant="secondary" size="lg" className="h-14 px-8 text-lg rounded-full border-gray-200">
                                Quick Estimate <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-16 flex items-center justify-center gap-8 text-gray-400 grayscale opacity-70">
                        {/* Placeholder logos for "Trusted by" */}
                        <div className="flex items-center gap-1"><ShieldCheck size={20} /> <span className="font-semibold">EcoCert</span></div>
                        <div className="flex items-center gap-1"><Leaf size={20} /> <span className="font-semibold">GreenAlliance</span></div>
                        <div className="flex items-center gap-1"><Globe size={20} /> <span className="font-semibold">EarthFoundry</span></div>
                    </div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Everything you need to make a difference
                    </h2>
                    <p className="text-lg text-gray-600">
                        Our platform provides powerful tools to help you understand your environmental impact and take meaningful action.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={BarChart3}
                        title="Accurate Tracking"
                        description="Connect your daily activities and get precise calculations of your carbon emissions in real-time."
                        delay={0}
                    />
                    <FeatureCard
                        icon={Users}
                        title="Community Challenges"
                        description="Join local groups, compete in leaderboards, and achieve sustainability goals together."
                        delay={150}
                    />
                    <FeatureCard
                        icon={Leaf}
                        title="Verified Offsets"
                        description="Directly support reforestation and renewable energy projects with full transparency."
                        delay={300}
                    />
                </div>
            </section>

            {/* Social Proof */}
            <section className="bg-gray-900 text-white py-24 my-10 rounded-3xl mx-4 lg:mx-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <StatCounter value="12,500" label="Active Users" />
                        <StatCounter value="850,000" label="kg CO2 Saved" />
                        <StatCounter value="50" label="Projects Funded" suffix="+" />
                    </div>
                </div>
            </section>

            {/* Modern CTA */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center pb-20">
                <Card className="bg-primary/5 border-primary/10 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <CardContent className="p-12 md:p-20 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                            Ready to reduce your footprint?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Join thousands of others making a positive impact on the planet today.
                            It takes less than 2 minutes to get started.
                        </p>
                        <Link href="/register">
                            <Button size="lg" className="rounded-full px-10 h-14 text-lg shadow-xl shadow-green-500/20">
                                Join EcoTracker Free
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
