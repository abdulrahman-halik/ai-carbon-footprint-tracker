export const DEFAULT_SPARKLINE_DATA = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
        {
            label: "CO2 Emissions (kg)",
            data: [12, 19, 15, 8, 22, 14, 10],
            borderColor: "#22C55E", // Primary Green
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, "rgba(34, 197, 94, 0.4)");
                gradient.addColorStop(1, "rgba(34, 197, 94, 0)");
                return gradient;
            },
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#22C55E",
            pointBorderColor: "#FFFFFF",
            pointHoverRadius: 6,
        },
    ],
};

export const DEFAULT_IMPACT_DATA = {
    labels: ["Transport", "Diet", "Energy", "Shopping"],
    datasets: [
        {
            label: "Emissions by Category",
            data: [45, 25, 20, 10],
            backgroundColor: [
                "#3B82F6", // Blue-500 (Transport)
                "#22C55E", // Green-500 (Diet)
                "#EAB308", // Yellow-500 (Energy)
                "#A855F7", // Purple-500 (Shopping)
            ],
            hoverOffset: 4,
            borderWidth: 0,
        },
    ],
};
