import React from "react";
import { EmissionSparkline } from "./EmissionSparkline";
import { ImpactVisualizer } from "./ImpactVisualizer";

export default function EmissionsDashboard() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Trend Chart */}
                <EmissionSparkline />

                {/* Breakdown Chart */}
                <ImpactVisualizer />
            </div>

            {/* Additional Stats/Insights could go here */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <h4 className="text-green-800 font-medium text-sm">Best Day</h4>
                    <p className="text-2xl font-bold text-green-900 mt-1">Sunday</p>
                    <p className="text-xs text-green-600 mt-1">Lowest emissions recorded</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h4 className="text-blue-800 font-medium text-sm">Top Category</h4>
                    <p className="text-2xl font-bold text-blue-900 mt-1">Transport</p>
                    <p className="text-xs text-blue-600 mt-1">45% of total footprint</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <h4 className="text-orange-800 font-medium text-sm">Action Needed</h4>
                    <p className="text-2xl font-bold text-orange-900 mt-1">High Usage</p>
                    <p className="text-xs text-orange-600 mt-1">Energy increased by 10%</p>
                </div>
            </div>
        </div>
    );
}
