export const waterChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
        {
            label: "Water Usage (Liters)",
            data: [145, 132, 155, 120, 140, 180, 165],
            backgroundColor: (ctx) => {
                const chart = ctx.chart;
                const { ctx: c, chartArea } = chart;
                if (!chartArea) return "rgba(56, 189, 248, 0.6)";
                const gradient = c.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                gradient.addColorStop(0, "rgba(56, 189, 248, 0.2)");
                gradient.addColorStop(1, "rgba(14, 165, 233, 0.7)");
                return gradient;
            },
            borderColor: "rgb(14, 165, 233)",
            borderWidth: 2,
            borderRadius: 10,
            borderSkipped: false,
            hoverBackgroundColor: "rgba(14, 165, 233, 0.85)",
        },
    ],
};

export const waterChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
        legend: { display: false },
        title: { display: false },
        tooltip: {
            backgroundColor: "rgba(17, 24, 39, 0.9)",
            titleFont: { size: 13, weight: "bold" },
            bodyFont: { size: 12 },
            padding: 12,
            cornerRadius: 12,
            displayColors: false,
            callbacks: {
                label: (ctx) => `${ctx.parsed.y} Liters`,
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: { color: "rgba(0, 0, 0, 0.04)", drawBorder: false },
            ticks: { color: "#9ca3af", font: { size: 11 }, padding: 8 },
            border: { display: false },
        },
        x: {
            grid: { display: false },
            ticks: { color: "#9ca3af", font: { size: 11 }, padding: 8 },
            border: { display: false },
        },
    },
};
