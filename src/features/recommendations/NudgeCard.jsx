import React from 'react';
import { Card } from '@/components/ui/Card';

export const NudgeCard = ({
    type = 'insight',
    title,
    description,
    impact,
    onDismiss,
    onAccept
}) => {
    const typeStyles = {
        insight: {
            bg: 'bg-blue-50/50',
            border: 'border-blue-100',
            icon: '💡',
            text: 'text-blue-900',
            ring: 'ring-blue-500/10',
            badge: 'bg-blue-100/50 text-blue-700'
        },
        action: {
            bg: 'bg-emerald-50/50',
            border: 'border-emerald-100',
            icon: '🌱',
            text: 'text-emerald-900',
            ring: 'ring-emerald-500/10',
            badge: 'bg-emerald-100/50 text-emerald-700'
        },
        alert: {
            bg: 'bg-amber-50/50',
            border: 'border-amber-100',
            icon: '⚠️',
            text: 'text-amber-900',
            ring: 'ring-amber-500/10',
            badge: 'bg-amber-100/50 text-amber-700'
        },
    };

    const style = typeStyles[type] || typeStyles.insight;

    return (
        <div className={`relative group overflow-hidden rounded-2xl backdrop-blur-xl border ${style.border} ${style.bg} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
            <div className="p-6">
                <div className="flex items-start gap-5">
                    <div className={`flex-shrink-0 h-12 w-12 rounded-xl bg-white/60 shadow-sm flex items-center justify-center text-2xl ring-1 ${style.ring}`}>
                        {style.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.badge} mb-2`}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </span>
                                <h4 className={`text-lg font-bold ${style.text}`}>
                                    {title}
                                </h4>
                            </div>
                            <button
                                onClick={onDismiss}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-black/5 transition-colors"
                                aria-label="Dismiss"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="mt-3 text-gray-600 leading-relaxed">
                            {description}
                        </p>
                        {impact && (
                            <div className="mt-4 flex items-center gap-2">
                                <div className="flex items-center text-sm font-semibold text-emerald-600 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-emerald-100/50">
                                    <span>⚡ Impact: {impact}</span>
                                </div>
                            </div>
                        )}
                        {onAccept && (
                            <div className="mt-5 pt-4 border-t border-gray-100/50">
                                <button
                                    onClick={onAccept}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-95"
                                >
                                    I&apos;ll try this action
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Decorative gradient overlay */}
            <div className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/40 via-transparent to-transparent`} />
        </div>
    );
};

export default NudgeCard;
