import React from 'react';

export const ScenarioSlider = ({
    label,
    value,
    min = 0,
    max = 100,
    unit = '',
    icon,
    description,
    onChange
}) => {
    return (
        <div className="group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center text-lg shadow-inner transform transition-transform duration-300 group-hover:scale-105">
                            <div className="text-lg">{icon}</div>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-bold text-gray-900">{label}</label>
                        {description && (
                            <p className="text-xs text-gray-500 mt-0.5 max-w-[200px] sm:max-w-xs leading-relaxed">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                    <span className="text-lg font-bold text-blue-900 tabular-nums">
                        {value}
                    </span>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {unit}
                    </span>
                </div>
            </div>

            <div className="relative h-6 flex items-center">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer focus:outline-none transition-all"
                    style={{ background: `linear-gradient(90deg, #60a5fa ${value}%, #e6eef6 ${value}%)` }}
                />
                <div className="absolute right-0 -top-7 text-xs font-medium text-gray-600">{value}%</div>
            </div>

            <div className="flex justify-between text-[10px] uppercase font-bold text-gray-300 tracking-wider px-1">
                <span>Min</span>
                <span>Max</span>
            </div>
        </div>
    );
};

export default ScenarioSlider;
