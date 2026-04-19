import React from 'react';

export const GoalThermometer = ({
    currentValue,
    targetValue,
    unit = '',
    title = 'Goal Progress',
    description = 'Keep it up to reach your target!'
}) => {
    const percentage = Math.min(100, Math.max(0, (currentValue / targetValue) * 100));
    const isOverLimit = currentValue > targetValue;
    const barGradient = isOverLimit
        ? 'from-orange-400 to-red-500'
        : percentage >= 75
            ? 'from-emerald-400 to-teal-500'
            : percentage >= 40
                ? 'from-amber-400 to-yellow-500'
                : 'from-rose-400 to-pink-500';
    const textColor = isOverLimit ? 'text-red-600' : 'text-emerald-600';

    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-base font-bold text-gray-900">{title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{description}</p>
                </div>
                <div className="text-right">
                    <span className={`text-3xl font-extrabold tracking-tight ${textColor}`}>
                        {currentValue}
                    </span>
                    <span className="text-sm text-gray-400 ml-1 font-semibold">
                        / {targetValue} <span className="text-xs uppercase">{unit}</span>
                    </span>
                </div>
            </div>

            <div className="relative h-4 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                <div
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${barGradient} rounded-full shadow-lg transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                >
                    {!isOverLimit && <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />}
                </div>
            </div>

            <div className="flex justify-between text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                <span>0</span>
                <span>50%</span>
                <span>{targetValue} {unit}</span>
            </div>
        </div>
    );
};

export default GoalThermometer;
