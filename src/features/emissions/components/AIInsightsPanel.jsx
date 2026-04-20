"use client";
import React from "react";
import { Brain, Lightbulb, CheckCircle2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

/**
 * AIInsightsPanel — displays AI-generated insights and smart recommendations.
 * @param {string[]} insights       - Array of insight sentences
 * @param {string[]} recommendations - Array of recommendation strings
 */
export default function AIInsightsPanel({ insights = [], recommendations = [] }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Insights */}
            <Card className="border-0 shadow-sm overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg p-1.5">
                            <Brain className="w-4 h-4 text-white" />
                        </div>
                        <span>AI Insights</span>
                        <span className="ml-auto text-xs font-normal text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Live
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    {insights.length === 0 ? (
                        <p className="text-sm text-gray-400 italic">Enter your lifestyle data to see personalized insights.</p>
                    ) : (
                        <ul className="space-y-3">
                            {insights.map((insight, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                                    <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                    {insight}
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>

            {/* Smart Recommendations */}
            <Card className="border-0 shadow-sm overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-400 to-indigo-500" />
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-1.5">
                            <Lightbulb className="w-4 h-4 text-white" />
                        </div>
                        Smart Recommendations
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    {recommendations.length === 0 ? (
                        <p className="text-sm text-gray-400 italic">Recommendations will appear once you update your data.</p>
                    ) : (
                        <ul className="space-y-3">
                            {recommendations.map((rec, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                    {rec}
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
