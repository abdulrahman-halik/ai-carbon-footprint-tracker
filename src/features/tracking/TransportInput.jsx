import React, { useState } from 'react';

export const TransportInput = ({ onUpdate }) => {
    const [mode, setMode] = useState('car');
    const [distance, setDistance] = useState(0);

    const handleUpdate = (newMode, newDist) => {
        setMode(newMode);
        setDistance(newDist);
        if (onUpdate) {
            onUpdate({ type: 'transport', mode: newMode, distance: newDist });
        }
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">How did you travel?</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {['car', 'bus', 'train', 'walk'].map((m) => (
                        <button
                            key={m}
                            onClick={() => handleUpdate(m, distance)}
                            className={`group relative p-4 rounded-2xl border-2 text-sm font-bold capitalize transition-all duration-200 ${mode === m
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-md transform scale-[1.02]'
                                : 'bg-white border-gray-100 text-gray-500 hover:border-emerald-200 hover:bg-emerald-50/30'
                                }`}
                        >
                            <span className="block text-2xl mb-2">{getTransportIcon(m)}</span>
                            {m}
                            {mode === m && (
                                <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Distance traveled (km)</label>
                <div className="relative">
                    <input
                        type="number"
                        min="0"
                        value={distance}
                        onChange={(e) => handleUpdate(mode, parseFloat(e.target.value) || 0)}
                        className="w-full pl-4 pr-12 py-3 rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-emerald-500 focus:ring-emerald-500 transition-all text-lg font-medium"
                        placeholder="0"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium pointer-events-none">km</span>
                </div>
            </div>
        </div>
    );
};

const getTransportIcon = (type) => {
    switch (type) {
        case 'car': return '🚗';
        case 'bus': return '🚌';
        case 'train': return '🚆';
        case 'walk': return '🚶';
        default: return '🚗';
    }
};

export default TransportInput;
