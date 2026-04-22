import apiClient from "@/lib/apiClient";

const dashboardService = {
    getStats: async () => {
        const response = await apiClient.get("/api/dashboard/summary");
        return response.data;
    },

    getImpactData: async () => {
        // Assuming there's an endpoint for impact data, otherwise map from summary
        // For now, let's look at what /api/dashboard/summary returns
        const response = await apiClient.get("/api/dashboard/summary");
        return response.data.impact_data || {
            labels: ["Transport", "Food", "Energy", "Shopping"],
            datasets: [{ data: [0, 0, 0, 0] }]
        };
    }
};

export default dashboardService;
