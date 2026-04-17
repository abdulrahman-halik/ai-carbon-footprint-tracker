export const waterChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
        {
            label: "Water Usage (Liters)",
            data: [145, 132, 155, 120, 140, 180, 165],
            backgroundColor: "rgba(56, 189, 248, 0.6)",
            borderColor: "rgb(56, 189, 248)",
            borderWidth: 1,
            borderRadius: 8,
        },
    ],
};

export const waterChartOptions = {
    responsive: true,
    plugins: {
        legend: { display: false },
        title: { display: false },
    },
    scales: {
        y: { beginAtZero: true, grid: { color: "rgba(0, 0, 0, 0.05)" } },
        x: { grid: { display: false } },
    },
};
