"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { ArrowRight, Check, Car, Utensils, Plane, Zap, ShoppingBag } from 'lucide-react';

const questions = [
    {
        id: 'transport',
        icon: Car,
        title: "How do you usually get around?",
        options: [
            { label: "Car (Gas/Diesel)", score: 4 },
            { label: "Car (Electric/Hybrid)", score: 2 },
            { label: "Public Transport", score: 1 },
            { label: "Bike / Walk", score: 0 },
        ]
    },
    {
        id: 'diet',
        icon: Utensils,
        title: "What represents your diet best?",
        options: [
            { label: "Heavy Meat Eater", score: 4 },
            { label: "Average Omnivore", score: 3 },
            { label: "Vegetarian", score: 1 },
            { label: "Vegan", score: 0 },
        ]
    },
    {
        id: 'flights',
        icon: Plane,
        title: "How often do you fly?",
        options: [
            { label: "Multiple long-haul flights", score: 5 },
            { label: "1-2 flights per year", score: 3 },
            { label: "Rarely / Never", score: 0 },
        ]
    },
    {
        id: 'energy',
        icon: Zap,
        title: "What powers your home?",
        options: [
            { label: "Standard Grid Mix", score: 3 },
            { label: "Partially Renewable", score: 1 },
            { label: "100% Green Energy", score: 0 },
        ]
    },
    {
        id: 'shopping',
        icon: ShoppingBag,
        title: "How are your shopping habits?",
        options: [
            { label: "I love buying new things often", score: 4 },
            { label: "I buy what I need (Average)", score: 2 },
            { label: "I'm a minimalist / Buy second-hand", score: 1 },
        ]
    }
];

export default function EstimatorPage() {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (points) => {
        const newScore = score + points;
        if (step < questions.length - 1) {
            setScore(newScore);
            setStep(step + 1);
        } else {
            setScore(newScore);
            setShowResult(true);
        }
    };

    const getResultFeedback = (totalScore) => {
        if (totalScore < 5) return { text: "Eco Warrior! 🌿", color: "text-green-600", desc: "You're living very sustainably. Keep it up!" };
        if (totalScore < 12) return { text: "Conscious Citizen 🌍", color: "text-blue-600", desc: "You're doing well, but there's room for improvement." };
        return { text: "Carbon Intensive 🏭", color: "text-orange-600", desc: "Your footprint is higher than average. We can help you reduce it." };
    };

    const currentQuestion = questions[step];
    const Icon = currentQuestion?.icon;

    return (
        <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[80vh]">
            <Card className="w-full max-w-lg shadow-xl border-t-4 border-primary">
                {!showResult ? (
                    <>
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto bg-primary-100 text-primary h-12 w-12 rounded-full flex items-center justify-center mb-4">
                                {Icon && <Icon size={24} />}
                            </div>
                            <CardTitle className="text-2xl">{currentQuestion.title}</CardTitle>
                            <CardDescription>Question {step + 1} of {questions.length}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-3">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option.label}
                                    onClick={() => handleAnswer(option.score)}
                                    className="w-full text-left p-4 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-primary transition-all flex items-center justify-between group"
                                >
                                    <span className="font-medium text-gray-700 group-hover:text-primary">{option.label}</span>
                                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                </button>
                            ))}
                        </CardContent>
                        <CardFooter className="justify-center pt-2 pb-6">
                            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                <div
                                    className="bg-primary h-full transition-all duration-300"
                                    style={{ width: `${((step) / questions.length) * 100}%` }}
                                />
                            </div>
                        </CardFooter>
                    </>
                ) : (
                    <div className="animate-in fade-in zoom-in duration-500">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold mb-2">Estimation Complete</CardTitle>
                            <div className="py-6">
                                <div className={`text-2xl font-bold ${getResultFeedback(score).color} mb-2`}>
                                    {getResultFeedback(score).text}
                                </div>
                                <p className="text-gray-600">
                                    {getResultFeedback(score).desc}
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                            <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-500">
                                This is just a rough estimate. For a precise calculation and personalized reduction plan, create your full profile.
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3">
                            <Link href="/register" className="w-full">
                                <Button className="w-full h-12 text-lg">Unlock Full Report</Button>
                            </Link>
                            <Button variant="ghost" onClick={() => { setStep(0); setScore(0); setShowResult(false); }}>
                                Start Over
                            </Button>
                        </CardFooter>
                    </div>
                )}
            </Card>
        </div>
    );
}
