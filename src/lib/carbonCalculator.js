// Carbon footprint calculation utilities
// Emission factors sourced from IPCC and environmental databases

export const EMISSION_FACTORS = {
    // Energy
    electricity: 0.85,
    lpg: 2.98,
    water: 0.0003,
    // Transport
    car: 0.25,
    bike: 0.02,
    public_transport: 0.08,
    air_travel: 0.15,
    // Waste
    waste: 0.57,
    // Food & Diet (kg CO2e per unit)
    meat_meals: 3.5,       // per meal/week → monthly
    dairy_portions: 0.6,   // per portion/week → monthly
    food_waste: 2.5,       // kg/week → monthly
    // Shopping & Consumption
    clothing: 10.0,        // items/month
    electronics: 70.0,     // devices/month
    online_orders: 2.5,    // orders/month
    // Home
    ac_usage: 0.85,        // hours/day → monthly kWh equivalent
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
    meat_meals: 4.33,
    dairy_portions: 4.33,
    food_waste: 4.33,
    clothing: 1,
    electronics: 1,
    online_orders: 1,
    ac_usage: 30,
};

// Diet type base multiplier (in addition to meal inputs)
export const DIET_BASE = {
    vegan: 30,        // kg CO2e/month
    vegetarian: 60,
    mixed: 100,
    heavy_meat: 150,
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
    ['Meat Consumption', 'meat_meals', '#DC2626'],
    ['Dairy', 'dairy_portions', '#F97316'],
    ['Food Waste', 'food_waste', '#84CC16'],
    ['Clothing', 'clothing', '#A78BFA'],
    ['Electronics', 'electronics', '#60A5FA'],
    ['Online Shopping', 'online_orders', '#34D399'],
    ['AC Usage', 'ac_usage', '#FBBF24'],
];

export const calculateCarbonFootprint = (inputs = {}) => {
    const values = {};
    let energy = 0, transport = 0, waste = 0, food = 0, shopping = 0;

    for (const [, key] of BREAKDOWN_META.map(m => [m[0], m[1]])) {
        const raw = Number(inputs[key]) || 0;
        const monthly = raw * (MONTH_FACTORS[key] ?? 1);
        const emission = monthly * (EMISSION_FACTORS[key] ?? 0);
        values[key] = emission;

        if (['electricity', 'lpg', 'water', 'ac_usage'].includes(key)) energy += emission;
        else if (['car', 'bike', 'public_transport', 'air_travel'].includes(key)) transport += emission;
        else if (key === 'waste') waste += emission;
        else if (['meat_meals', 'dairy_portions', 'food_waste'].includes(key)) food += emission;
        else if (['clothing', 'electronics', 'online_orders'].includes(key)) shopping += emission;
    }

    // Add diet base
    const dietBase = DIET_BASE[inputs.diet_type] ?? DIET_BASE.mixed;
    food += dietBase;

    // Renewable energy discount (30% off energy if solar)
    if (inputs.energy_source === 'solar') energy *= 0.7;
    else if (inputs.energy_source === 'hybrid') energy *= 0.85;

    // Per-person adjustment for household size
    const householdSize = Math.max(1, Number(inputs.household_size) || 1);
    const perPerson = { energy: energy / householdSize, transport, waste, food, shopping };
    // Keep totals as household but show per-person context
    const totalFootprint = energy + transport + waste + food + shopping;

    const breakdown = BREAKDOWN_META.map(([label, key, color]) => ({
        category: label,
        value: values[key],
        percentage: totalFootprint > 0 ? (values[key] / totalFootprint) * 100 : 0,
        color,
    }));

    // Add diet base as a separate breakdown item
    breakdown.push({
        category: 'Diet Base',
        value: dietBase,
        percentage: totalFootprint > 0 ? (dietBase / totalFootprint) * 100 : 0,
        color: '#F87171',
    });

    return {
        totalFootprint,
        breakdown,
        categories: { energy, transport, waste, food, shopping },
        perPerson,
        inputs,
    };
};

export const getFootprintFeedback = (totalFootprint) => {
    if (totalFootprint < 500) {
        return { text: 'Eco Warrior! 🌿', color: 'text-green-600', desc: "You're living very sustainably. Keep it up!", level: 'excellent' };
    } else if (totalFootprint < 1000) {
        return { text: 'Conscious Citizen 🌍', color: 'text-blue-600', desc: "You're doing well, but there's room for improvement.", level: 'good' };
    } else if (totalFootprint < 1500) {
        return { text: 'Average Impact 📊', color: 'text-yellow-600', desc: 'Your footprint is about average. Small changes can make a big difference.', level: 'average' };
    } else {
        return { text: 'Carbon Intensive 🏭', color: 'text-orange-600', desc: 'Your footprint is higher than average. We can help you reduce it.', level: 'high' };
    }
};

/** Generate contextual AI insights based on results */
export const generateAIInsights = (results, inputs) => {
    const insights = [];
    const recs = [];
    const { categories, totalFootprint } = results;

    const GLOBAL_AVG = 430; // kg CO2e/month global avg

    const transportPct = totalFootprint > 0 ? (categories.transport / totalFootprint) * 100 : 0;
    const energyPct = totalFootprint > 0 ? (categories.energy / totalFootprint) * 100 : 0;
    const foodPct = totalFootprint > 0 ? (categories.food / totalFootprint) * 100 : 0;

    if (transportPct > 40) {
        insights.push(`🚗 Transport is ${transportPct.toFixed(0)}% of your total — above the healthy 30% threshold.`);
        recs.push('Switch to public transport 2–3 days/week to save ~18 kg CO₂/month.');
    } else if (transportPct < 20) {
        insights.push(`🚲 Great job! Transport is only ${transportPct.toFixed(0)}% of your footprint.`);
    }

    if (categories.energy > 200) {
        insights.push(`⚡ Electricity & energy usage is above the optimal range (${categories.energy.toFixed(0)} kg CO₂e/mo).`);
        recs.push('Reduce AC usage by 1–2 hours/day — this alone saves ~20 kg CO₂/month.');
    }
    if (inputs.electricity > 400) {
        recs.push('Consider switching to LED bulbs and energy-efficient appliances.');
    }

    if (foodPct > 35) {
        insights.push(`🍖 Food & diet accounts for ${foodPct.toFixed(0)}% of your emissions — higher than global average.`);
        recs.push('Try 2 vegetarian meals per week to reduce food emissions by ~12 kg CO₂/month.');
    }

    if (totalFootprint > GLOBAL_AVG) {
        insights.push(`📊 Your total (${totalFootprint.toFixed(0)} kg) is ${(((totalFootprint - GLOBAL_AVG) / GLOBAL_AVG) * 100).toFixed(0)}% above the global average of ${GLOBAL_AVG} kg.`);
    } else {
        insights.push(`🌟 You're ${(((GLOBAL_AVG - totalFootprint) / GLOBAL_AVG) * 100).toFixed(0)}% below the global average. Keep it up!`);
    }

    if ((inputs.air_travel || 0) > 5000) {
        insights.push('✈️ Air travel is a major driver. One less long-haul flight saves 500+ kg CO₂.');
        recs.push('For short trips, consider train travel instead of flying.');
    }

    if (recs.length === 0) {
        recs.push('Maintain your current habits — you\'re already a green champion!');
        recs.push('Share your results with friends to inspire them. 🌍');
    }

    return { insights: insights.slice(0, 4), recommendations: recs.slice(0, 4) };
};

/** Comparison vs average and last-month mock */
export const getComparisonData = (totalFootprint) => {
    const AVERAGE = 430;
    const lastMonth = +(totalFootprint * (0.92 + Math.random() * 0.16)).toFixed(1);
    const forecast = +(totalFootprint * 1.05).toFixed(1);
    return { average: AVERAGE, lastMonth, forecast, totalFootprint };
};

/** Gamification level based on footprint */
export const getUserLevel = (totalFootprint) => {
    if (totalFootprint < 300) return { level: 'Carbon Champion', icon: '🏆', xp: 100, color: 'emerald' };
    if (totalFootprint < 600) return { level: 'Eco Warrior', icon: '🌿', xp: 70, color: 'green' };
    if (totalFootprint < 1000) return { level: 'Eco Learner', icon: '🌱', xp: 45, color: 'yellow' };
    return { level: 'Eco Beginner', icon: '🌍', xp: 20, color: 'orange' };
};

/** Potential savings from lifestyle changes */
export const calculatePotentialSavings = (currentInputs, targetInputs) => {
    const currentFootprint = calculateCarbonFootprint(currentInputs);
    const targetFootprint = calculateCarbonFootprint(targetInputs);
    const savings = currentFootprint.totalFootprint - targetFootprint.totalFootprint;
    return {
        currentFootprint: currentFootprint.totalFootprint,
        targetFootprint: targetFootprint.totalFootprint,
        savings,
        percentageReduction: currentFootprint.totalFootprint > 0
            ? (savings / currentFootprint.totalFootprint) * 100 : 0,
    };
};