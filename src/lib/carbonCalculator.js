// Carbon footprint calculation utilities based on EcoTrack proof of concept
// Emission factors sourced from IPCC and environmental databases

export const EMISSION_FACTORS = {
    // Energy Consumption (kg CO2e per unit)
    electricity: 0.85, // kg CO2e per kWh (global average)
    lpg: 2.98, // kg CO2e per kg (cooking gas)
    water: 0.0003, // kg CO2e per litre (water treatment & distribution)

    // Transport (kg CO2e per km)
    car: 0.25, // kg CO2e per km (average gasoline car)
    bike: 0.02, // kg CO2e per km (electric bike/assist)
    public_transport: 0.08, // kg CO2e per km (bus/train average)
    air_travel: 0.15, // kg CO2e per km (domestic flights)

    // Waste (kg CO2e per kg)
    waste: 0.57, // kg CO2e per kg (landfill methane emissions)
};

/**
 * Calculate carbon footprint from user inputs
 * @param {Object} inputs - User lifestyle inputs
 * @returns {Object} - Calculation results with breakdown
 */
export const calculateCarbonFootprint = (inputs) => {
    // Energy calculations (monthly)
    const electricityEmissions = (inputs.electricity || 0) * EMISSION_FACTORS.electricity;
    const lpgEmissions = (inputs.lpg || 0) * EMISSION_FACTORS.lpg;
    const waterEmissions = (inputs.water || 0) * EMISSION_FACTORS.water * 30; // Convert daily to monthly

    // Transport calculations (monthly)
    const carEmissions = (inputs.car || 0) * EMISSION_FACTORS.car * 30; // Convert daily to monthly
    const bikeEmissions = (inputs.bike || 0) * EMISSION_FACTORS.bike * 30;
    const publicTransportEmissions = (inputs.public_transport || 0) * EMISSION_FACTORS.public_transport * 30;
    const airTravelEmissions = (inputs.air_travel || 0) * EMISSION_FACTORS.air_travel / 12; // Convert yearly to monthly

    // Waste calculations (monthly)
    const wasteEmissions = (inputs.waste || 0) * EMISSION_FACTORS.waste * 4.33; // Convert weekly to monthly

    // Category totals
    const energyTotal = electricityEmissions + lpgEmissions + waterEmissions;
    const transportTotal = carEmissions + bikeEmissions + publicTransportEmissions + airTravelEmissions;
    const wasteTotal = wasteEmissions;

    const totalFootprint = energyTotal + transportTotal + wasteTotal;

    // Detailed breakdown
    const breakdown = [
        {
            category: 'Electricity',
            value: electricityEmissions,
            percentage: totalFootprint > 0 ? (electricityEmissions / totalFootprint) * 100 : 0,
            color: '#3B82F6'
        },
        {
            category: 'LPG',
            value: lpgEmissions,
            percentage: totalFootprint > 0 ? (lpgEmissions / totalFootprint) * 100 : 0,
            color: '#EF4444'
        },
        {
            category: 'Water',
            value: waterEmissions,
            percentage: totalFootprint > 0 ? (waterEmissions / totalFootprint) * 100 : 0,
            color: '#06B6D4'
        },
        {
            category: 'Car Travel',
            value: carEmissions,
            percentage: totalFootprint > 0 ? (carEmissions / totalFootprint) * 100 : 0,
            color: '#F59E0B'
        },
        {
            category: 'Bike Travel',
            value: bikeEmissions,
            percentage: totalFootprint > 0 ? (bikeEmissions / totalFootprint) * 100 : 0,
            color: '#10B981'
        },
        {
            category: 'Public Transport',
            value: publicTransportEmissions,
            percentage: totalFootprint > 0 ? (publicTransportEmissions / totalFootprint) * 100 : 0,
            color: '#8B5CF6'
        },
        {
            category: 'Air Travel',
            value: airTravelEmissions,
            percentage: totalFootprint > 0 ? (airTravelEmissions / totalFootprint) * 100 : 0,
            color: '#EC4899'
        },
        {
            category: 'Waste',
            value: wasteEmissions,
            percentage: totalFootprint > 0 ? (wasteEmissions / totalFootprint) * 100 : 0,
            color: '#6B7280'
        }
    ];

    return {
        totalFootprint,
        breakdown,
        categories: {
            energy: energyTotal,
            transport: transportTotal,
            waste: wasteTotal
        },
        inputs
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