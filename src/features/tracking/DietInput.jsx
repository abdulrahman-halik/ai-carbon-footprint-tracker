import React, { useState } from 'react';

export const DietInput = ({ onUpdate }) => {
    const [dietType, setDietType] = useState('omnivore');

    const diets = [
        { id: 'meat-heavy', label: 'Meat Heavy', icon: '🥩', desc: 'Daily meat & dairy' },
        { id: 'omnivore', label: 'Omnivore', icon: '🍗', desc: 'Mixed diet' },
        { id: 'vegetarian', label: 'Vegetarian', icon: '🥗', desc: 'No meat' },
        { id: 'vegan', label: 'Vegan', icon: '🥦', desc: 'No animal products' },
    ];

    const handleSelect = (id) => {
        setDietType(id);
        if (onUpdate) {
            onUpdate({ type: 'diet', diet: id });
        }
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">What did you eat today?</h3>
                <p className="text-gray-500 text-sm mb-6">Select the option that best describes your meals.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {diets.map((d) => (
                        <button
                            key={d.id}
                            onClick={() => handleSelect(d.id)}
                            className={`group relative flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${dietType === d.id
                                ? 'bg-emerald-50 border-emerald-500 shadow-md transform scale-[1.02]'
                                : 'bg-white border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30'
                                }`}
                        >
                            <span className="text-3xl bg-white p-2 rounded-full shadow-sm">{d.icon}</span>
                            <div>
                                <span className={`block text-sm font-bold ${dietType === d.id ? 'text-emerald-800' : 'text-gray-700'
                                    }`}>
                                    {d.label}
                                </span>
                                <span className="text-xs text-gray-500 font-medium">{d.desc}</span>
                            </div>

                            {dietType === d.id && (
                                <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-emerald-500 shadow-emerald-200 shadow-lg"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DietInput;
