// Carbon footprint calculation utilities based on EcoTrack proof of concept
// Emission factors sourced from IPCC and environmental databases

export const EMISSION_FACTORS = {
    electricity: 0.85,
    lpg: 2.98,
    water: 0.0003,
    car: 0.25,
    bike: 0.02,
    public_transport: 0.08,
    air_travel: 0.15,
    waste: 0.57,
};

const MONTH_FACTORS = {
    electricity: 1,
    lpg: 1,
    water: 30,
    car: 30,
    bike: 30,
    public_transport: 30,
    air_travel: 1 / 12,
    waste: 4.33,
};

const BREAKDOWN_META = [
    ['Electricity', 'electricity', '#3B82F6'],
    ['LPG', 'lpg', '#EF4444'],
    ['Water', 'water', '#06B6D4'],
    ['Car Travel', 'car', '#F59E0B'],
    ['Bike Travel', 'bike', '#10B981'],
    ['Public Transport', 'public_transport', '#8B5CF6'],
    ['Air Travel', 'air_travel', '#EC4899'],
    ['Waste', 'waste', '#6B7280'],
];

export const calculateCarbonFootprint = (inputs = {}) => {
    const values = {};
    let energy = 0,
        transport = 0,
        waste = 0;

    for (const [, key] of BREAKDOWN_META.map((m) => [m[0], m[1]])) {
        const raw = Number(inputs[key]) || 0;
        const monthly = raw * (MONTH_FACTORS[key] ?? 1);
        const emission = monthly * (EMISSION_FACTORS[key] ?? 0);
        values[key] = emission;
        if (['electricity', 'lpg', 'water'].includes(key)) energy += emission;
        else if (['car', 'bike', 'public_transport', 'air_travel'].includes(key)) transport += emission;
        else if (key === 'waste') waste += emission;
    }

    const totalFootprint = energy + transport + waste;

    const breakdown = BREAKDOWN_META.map(([label, key, color]) => ({
        category: label,
        value: values[key],
        percentage: totalFootprint > 0 ? (values[key] / totalFootprint) * 100 : 0,
        color,
    }));

    return {
        totalFootprint,
        breakdown,
        categories: { energy, transport, waste },
        inputs,
    };
};

/**
 * Get feedback based on total footprint
 * @param {number} totalFootprint - Monthly footprint in kg CO2e
 * @returns {Object} - Feedback object with text, color, and description
 */
export const getFootprintFeedback = (totalFootprint) => {
    if (totalFootprint < 500) {
        return {
            text: "Eco Warrior! 🌿",
            color: "text-green-600",
            desc: "You're living very sustainably. Keep it up!",
            level: "excellent"
        };
    } else if (totalFootprint < 1000) {
        return {
            text: "Conscious Citizen 🌍",
            color: "text-blue-600",
            desc: "You're doing well, but there's room for improvement.",
            level: "good"
        };
    } else if (totalFootprint < 1500) {
        return {
            text: "Average Impact 📊",
            color: "text-yellow-600",
            desc: "Your footprint is about average. Small changes can make a big difference.",
            level: "average"
        };
    } else {
        return {
            text: "Carbon Intensive 🏭",
            color: "text-orange-600",
            desc: "Your footprint is higher than average. We can help you reduce it.",
            level: "high"
        };
    }
};

/**
 * Calculate potential savings from lifestyle changes
 * @param {Object} currentInputs - Current user inputs
 * @param {Object} targetInputs - Target/reduced inputs
 * @returns {Object} - Savings calculation
 */
export const calculatePotentialSavings = (currentInputs, targetInputs) => {
    const currentFootprint = calculateCarbonFootprint(currentInputs);
    const targetFootprint = calculateCarbonFootprint(targetInputs);

    const savings = currentFootprint.totalFootprint - targetFootprint.totalFootprint;

    return {
        currentFootprint: currentFootprint.totalFootprint,
        targetFootprint: targetFootprint.totalFootprint,
        savings,
        percentageReduction: currentFootprint.totalFootprint > 0 ?
            (savings / currentFootprint.totalFootprint) * 100 : 0
    };
};