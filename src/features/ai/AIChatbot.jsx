"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your Eco-Assistant. How can I help you reduce your carbon footprint today?", sender: 'ai' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const { register, handleSubmit, reset, watch } = useForm({ defaultValues: { message: "" } });
    const inputText = watch("message");

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping, isOpen]);

    const onSubmit = async (data) => {
        if (!data.message.trim()) return;
        const userMsg = { id: Date.now(), text: data.message, sender: 'user' };
        const nextMessages = [...messages, userMsg];
        setMessages(nextMessages);
        reset();
        setIsTyping(true);

        try {
            const response = await fetch(`${API_BASE}/api/assistant/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: nextMessages.map((m) => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text })),
                }),
            });
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const result = await response.json();
            setMessages(prev => [...prev, { id: Date.now() + 1, text: result.reply || "Sorry, I could not generate a response.", sender: 'ai' }]);
        } catch {
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting. Please try again.", sender: 'ai' }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
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

                    {/* Messages */}
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

                    {/* Input */}
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

            {/* Toggle Button */}
            {isOpen ? (
                <button onClick={() => setIsOpen(false)} className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-900 transition-all duration-300">
                    <X size={24} />
                </button>
            ) : (
                <button onClick={() => setIsOpen(true)} className="group flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-emerald-500/30 bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:-translate-y-1 transition-all duration-300">
                    <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">1</span>
                </button>
            )}
        </div>
    );
}

