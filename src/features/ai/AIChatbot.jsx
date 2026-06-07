"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

import insightsService from "@/services/insightsService";
import mlService from "@/services/mlService";
import dashboardService from "@/services/dashboardService";

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your Eco-Assistant. You can ask me questions about sustainability, or say 'predict' to get a carbon footprint prediction from your stats!", sender: 'ai' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
    } = useForm({
        defaultValues: {
            message: "",
        },
    });

    const inputText = watch("message");

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const onSubmit = async (data) => {
        if (!data.message.trim()) return;

        const userText = data.message.trim();
        const userMsg = { id: Date.now(), text: userText, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        reset();
        setIsTyping(true);

        try {
            let aiResponseText = "";
            const lowerText = userText.toLowerCase();

            // Intercept special predict command to use ML endpoint
            if (lowerText === "predict" || lowerText.includes("predict my carbon footprint")) {
                const stats = await dashboardService.getStats();
                const features = {
                    "Age": 30.0,
                    "Electricity_Usage_kWh_per_month": stats?.total_energy_usage || 0,
                    "Water_Usage_L_per_day": stats?.total_water_usage || 0,
                    "Carbon_Footprint_Score": stats?.total_emissions || 0,
                };

                try {
                    const response = await mlService.predict(features);
                    // mlService returns the parsed response body
                    const pred = response?.prediction ?? response;
                    aiResponseText = `Your predicted carbon footprint based on current data is: ${Number(pred).toFixed(2)} kg CO₂e. Keep improving your sustainable habits!`;
                } catch (err) {
                    // Provide a helpful message if the user is unauthenticated
                    const status = err?.response?.status;
                    if (status === 401) {
                        aiResponseText = "Please log in to get a personalized carbon footprint prediction.";
                    } else {
                        aiResponseText = "Sorry, I couldn't compute a prediction right now. Try again later.";
                    }
                }
            } else {
                // Otherwise use semantic insight search model
                const response = await insightsService.search(userText, 1);
                aiResponseText = response?.insight || "I couldn't find a specific answer for that. Focus on small, consistent changes like reducing waste and conserving water!";
            }

            const aiMsg = { id: Date.now() + 1, text: aiResponseText, sender: 'ai' };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("AI Error:", error);
            const errMsg = { id: Date.now() + 1, text: "Sorry, I am having trouble connecting to my neural network. Please try again.", sender: 'ai' };
            setMessages(prev => [...prev, errMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <Bot size={18} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">Eco-Assistant</h3>
                                <p className="text-xs text-emerald-100 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                    ? 'bg-emerald-600 text-white rounded-br-none'
                                    : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit(onSubmit)} className="p-3 bg-white border-t border-gray-100">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                {...register("message")}
                                placeholder="Ask for eco-tips..."
                                className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                disabled={!inputText?.trim()}
                                className="absolute right-2 p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-colors shadow-sm"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                        <p className="text-[10px] text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
                            <Sparkles size={10} /> AI can make mistakes. Verify important info.
                        </p>
                    </form>
                </div>
            )}

            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 ${isOpen ? 'bg-gray-800 text-white rotate-90 scale-0 opacity-0' : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:-translate-y-1 block opacity-100 scale-100'
                    }`}
                style={{ position: isOpen ? 'absolute' : 'relative', pointerEvents: isOpen ? 'none' : 'auto' }}
            >
                <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">1</span>
            </button>
            {/* Helper button to close when open if the X is missed or for alternative toggle interactions if needed, though hidden when closed effectively by logic above */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-900 transition-all duration-300 ${!isOpen ? 'hidden' : 'flex'
                    }`}
            >
                <X size={24} />
            </button>
        </div>
    );
}

