import React from 'react';

export const GoalThermometer = ({
    currentValue,
    targetValue,
    unit = '',
    title = 'Goal Progress',
    description = 'Keep it up to reach your target!'
}) => {
    // Calculate percentage, capped at 100
    const percentage = Math.min(100, Math.max(0, (currentValue / targetValue) * 100));

    // Determine color based on progress
    const isOverLimit = currentValue > targetValue;
    const barGradient = isOverLimit
        ? 'from-orange-400 to-red-500 shadow-red-200'
        : 'from-emerald-400 to-teal-500 shadow-emerald-200';

    const textColor = isOverLimit ? 'text-red-600' : 'text-emerald-700';

    return (
        <div className="w-full">
            <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{description}</p>
                    </div>
                    <div className="text-right">
                        <span className={`text-4xl font-extrabold tracking-tight ${textColor}`}>
                            {currentValue}
                        </span>
                        <span className="text-sm text-gray-400 ml-1 font-semibold">
                            / {targetValue} <span className="text-xs uppercase">{unit}</span>
                        </span>
                    </div>
                </div>

                {/* Progress Bar Container */}
                <div className="relative h-6 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200/50">
                    {/* Animated Progress Bar */}
                    <div
                        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${barGradient} transition-all duration-1000 ease-out rounded-full shadow-lg`}
                        style={{ width: `${percentage}%` }}
                    >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                </div>

                {/* Labels */}
                <div className="flex justify-between text-xs text-gray-400 font-bold tracking-wider uppercase">
                    <span>0</span>
                    <span>50%</span>
                    <span>{targetValue} {unit}</span>
                </div>
            </div>
        </div>
    );
};

export default GoalThermometer;
