import React from 'react';

export const NeighborhoodComparison = ({
    userValue,
    averageValue,
    category = 'Carbon Footprint',
    unit = 'kg CO2e',
    insight = 'You are doing better than 65% of your neighbors!',
}) => {
    // Determine max value for the chart scale (add some buffer)
    const maxValue = Math.max(userValue, averageValue) * 1.25;

    const userPercent = (userValue / maxValue) * 100;
    const avgPercent = (averageValue / maxValue) * 100;

    // Determine status color
    const isBetter = userValue <= averageValue;
    const statusColor = isBetter ? 'text-emerald-600' : 'text-amber-500';
    const barGradient = isBetter ? 'from-emerald-400 to-teal-500' : 'from-amber-400 to-orange-500';

    return (
        <div className="w-full">
            <div className="flex flex-col space-y-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Community Comparison</h3>
                    <p className="text-sm text-gray-500 mt-1">How you stack up against your neighborhood</p>
                </div>

                {/* Chart Area */}
                <div className="flex items-end space-x-16 justify-center h-48 py-2">

                    {/* User Bar */}
                    <div className="flex flex-col items-center group relative w-20">
                        {isBetter && (
                            <div className="absolute -top-10 animate-bounce text-3xl filter drop-shadow-sm">🏆</div>
                        )}
                        <div className="relative w-full bg-gray-100 rounded-2xl overflow-hidden h-32 flex items-end shadow-inner border border-gray-200/50">
                            <div
                                className={`w-full bg-gradient-to-t ${barGradient} transition-all duration-1000 ease-out rounded-t-lg group-hover:opacity-90 relative shadow-md`}
                                style={{ height: `${userPercent}%` }}
                            >
                                <div className="absolute inset-x-0 top-0 h-[2px] bg-white/40"></div>
                            </div>
                        </div>
                        <span className={`text-sm font-bold mt-3 ${statusColor}`}>You</span>
                        <span className="text-xs font-bold text-gray-700">{userValue}</span>
                    </div>

                    {/* Average Bar */}
                    <div className="flex flex-col items-center group w-20">
                        <div className="relative w-full bg-gray-100 rounded-2xl overflow-hidden h-32 flex items-end shadow-inner border border-gray-200/50">
                            <div
                                className="w-full bg-gradient-to-t from-gray-300 to-gray-400 transition-all duration-1000 ease-out rounded-t-lg group-hover:bg-gray-400"
                                style={{ height: `${avgPercent}%` }}
                            >
                            </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-400 mt-3">My City</span>
                        <span className="text-xs font-bold text-gray-500">{averageValue}</span>
                    </div>
                </div>

                {/* Insight/Footer */}
                <div className="bg-blue-50/50 p-4 rounded-xl flex items-start space-x-3 border border-blue-100 backdrop-blur-sm">
                    <div className="p-1.5 bg-blue-100 rounded-full text-blue-600 shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wider text-blue-800 font-bold mb-0.5">Insight</p>
                        <p className="text-sm text-blue-900 font-medium leading-relaxed">
                            {insight}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NeighborhoodComparison;
