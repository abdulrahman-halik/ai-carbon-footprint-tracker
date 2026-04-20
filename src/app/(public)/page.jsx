"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf, BarChart3, Globe, ShieldCheck, Users, Sparkles, Clock3, CheckCircle2, Bike, Home, UtensilsCrossed, Droplets, ChevronRight, Wind, SunMedium, Target } from 'lucide-react';
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
                "group border border-primary/10 bg-white/90 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-700 transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-primary-light rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-105 transition-transform">
                    <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed">
                    {description}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="h-4 w-4" />
                </div>
            </CardContent>
        </Card>
    );
};

const HeroHighlight = ({ icon: Icon, label }) => (
    <div className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-primary/40 hover:shadow-md transition-all">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-light text-primary group-hover:scale-105 transition-transform">
            <Icon size={16} />
        </span>
        {label}
    </div>
);

const ActionCard = ({ icon: Icon, title, description, colorClass, href, delay = 0 }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });

    return (
        <Link
            ref={ref}
            href={href}
            className={cn(
                "group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className={cn("mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-105", colorClass)}>
                <Icon size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Try now <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
        </Link>
    );
};

const FAQCard = ({ question, answer, delay = 0 }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.15 });

    return (
        <Card
            ref={ref}
            className={cn(
                "border border-primary/10 bg-white/90 hover:border-primary/30 hover:shadow-md transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <CardContent className="p-6">
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">{question}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{answer}</p>
            </CardContent>
        </Card>
    );
};

const StepCard = ({ icon: Icon, title, description, colorClass, iconClass, delay = 0 }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <Card
            ref={ref}
            className={cn(
                "border transition-all duration-700 hover:-translate-y-1 hover:shadow-lg",
                colorClass,
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <CardContent className="p-6">
                <div className={cn("mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl", iconClass)}>
                    <Icon size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
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
    const heroHighlights = [
        { icon: Sparkles, label: 'AI-powered recommendations' },
        { icon: Clock3, label: 'Setup in under 2 minutes' },
        { icon: CheckCircle2, label: 'Trusted verified projects' },
    ];

    const quickActions = [
        {
            icon: Bike,
            title: 'Track transport emissions',
            description: 'Log car, bus, and bike habits to discover your biggest mobility savings.',
            colorClass: 'bg-secondary-light text-secondary',
            href: '/estimator',
        },
        {
            icon: Home,
            title: 'Monitor home energy',
            description: 'Understand appliance usage and reduce electricity waste with simple insights.',
            colorClass: 'bg-primary-light text-primary',
            href: '/register',
        },
        {
            icon: UtensilsCrossed,
            title: 'Improve food impact',
            description: 'Compare meal choices and learn small diet shifts with meaningful results.',
            colorClass: 'bg-accent-light text-accent',
            href: '/learn',
        },
        {
            icon: Droplets,
            title: 'Reduce water footprint',
            description: 'Track water consumption patterns and apply practical conservation tips daily.',
            colorClass: 'bg-blue-100 text-blue-600',
            href: '/register',
        },
    ];

    const steps = [
        {
            icon: Target,
            title: 'Log your daily habits',
            description: 'Track transport, energy, and water in minutes with guided forms.',
            colorClass: 'border-primary/10 hover:border-primary/30',
            iconClass: 'bg-primary-light text-primary',
        },
        {
            icon: Sparkles,
            title: 'Get smart insights',
            description: 'Use clear dashboards and AI suggestions to spot your biggest wins.',
            colorClass: 'border-secondary/20 hover:border-secondary/40',
            iconClass: 'bg-secondary-light text-secondary',
        },
        {
            icon: CheckCircle2,
            title: 'Take action and share',
            description: 'Set goals, join community challenges, and show measurable progress.',
            colorClass: 'border-accent/20 hover:border-accent/40',
            iconClass: 'bg-accent-light text-accent',
        },
    ];

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
                    <div className="absolute left-6 top-20 hidden xl:flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary-light/70 px-3 py-1.5 text-secondary text-sm font-semibold shadow-sm animate-pulse">
                        <Wind size={16} /> Low-impact habits
                    </div>
                    <div className="absolute right-6 top-28 hidden xl:flex items-center gap-2 rounded-full border border-accent/30 bg-accent-light/80 px-3 py-1.5 text-accent text-sm font-semibold shadow-sm animate-pulse">
                        <SunMedium size={16} /> Climate positive
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-medium mb-8 border border-primary/20 shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        New: Personal AI Carbon Coach
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
                        Track Your Impact. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Heal the Planet.
                        </span>
                    </h1>

                    <div className="mx-auto mb-8 h-1.5 w-44 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-70" />

                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Measure your daily carbon footprint, discover personalized ways to reduce it,
                        and contribute to verified global offset projects.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/estimator">
                            <Button size="lg" className="group h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                                Quick Estimate <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                        {heroHighlights.map((item) => (
                            <HeroHighlight key={item.label} icon={item.icon} label={item.label} />
                        ))}
                    </div>

                    <div className="mt-16 flex items-center justify-center gap-8 text-gray-400 opacity-80">
                        {/* Placeholder logos for "Trusted by" */}
                        <div className="flex items-center gap-1 transition-colors hover:text-primary"><ShieldCheck size={20} /> <span className="font-semibold">EcoCert</span></div>
                        <div className="flex items-center gap-1 transition-colors hover:text-primary"><Leaf size={20} /> <span className="font-semibold">GreenAlliance</span></div>
                        <div className="flex items-center gap-1 transition-colors hover:text-primary"><Globe size={20} /> <span className="font-semibold">EarthFoundry</span></div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        How EcoTracker works
                    </h2>
                    <p className="text-lg text-gray-600">
                        A simple path from awareness to impact, built with clear steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step, idx) => (
                        <StepCard
                            key={step.title}
                            icon={step.icon}
                            title={step.title}
                            description={step.description}
                            colorClass={step.colorClass}
                            iconClass={step.iconClass}
                            delay={idx * 120}
                        />
                    ))}
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

            {/* Popular Actions */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            Popular first actions
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            Start with one area today and build momentum with quick, measurable improvements.
                        </p>
                    </div>
                    <Link href="/register" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors">
                        See full dashboard <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {quickActions.map((item, idx) => (
                        <ActionCard
                            key={item.title}
                            icon={item.icon}
                            title={item.title}
                            description={item.description}
                            colorClass={item.colorClass}
                            href={item.href}
                            delay={idx * 90}
                        />
                    ))}
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

            {/* Quick FAQ */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Questions people ask first
                    </h2>
                    <p className="text-lg text-gray-600">
                        Short answers so you can get started faster.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <FAQCard
                        question="Do I need smart devices to use EcoTracker?"
                        answer="No. You can begin with manual entries and still get meaningful insights and comparisons."
                        delay={0}
                    />
                    <FAQCard
                        question="How quickly will I see results?"
                        answer="Most users identify one to three easy reduction actions in their first week."
                        delay={120}
                    />
                    <FAQCard
                        question="Can I track progress over time?"
                        answer="Yes. Your dashboard keeps trends, goals, and milestones so progress stays visible."
                        delay={240}
                    />
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
