import apiClient from "@/lib/apiClient";

const dashboardService = {
    getStats: async () => {
        try {
            const response = await apiClient.get("/api/dashboard/summary");
            return response.data;
        } catch (error) {
            console.error("Failed to fetch dashboard stats:", error?.response?.data || error.message);
            return null;
        }
    },

    getImpactData: async () => {
        try {
            const response = await apiClient.get("/api/dashboard/summary");
            return response.data.impact_data || {
                labels: ["Transport", "Food", "Energy", "Shopping"],
                datasets: [{ data: [0, 0, 0, 0] }]
            };
        } catch (error) {
            console.error("Failed to fetch impact data:", error?.response?.data || error.message);
            return {
                labels: ["Transport", "Food", "Energy", "Shopping"],
                datasets: [{ data: [0, 0, 0, 0] }]
            };
        }
    }
};

export default dashboardService;
