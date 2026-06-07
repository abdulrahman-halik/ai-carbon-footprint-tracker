import apiClient from "@/lib/apiClient";

const emissionsService = {
    getEmissions: async () => {
        try {
            const response = await apiClient.get("/api/emissions/");
            return response.data;
        } catch (error) {
            console.warn("Failed to fetch emissions:", error?.response?.data || error.message);
            return [];
        }
    },

    logActivity: async (data) => {
        try {
            const response = await apiClient.post("/api/emissions/", data);
            return response.data;
        } catch (error) {
            console.warn("Failed to log activity:", error?.response?.data || error.message);
            throw error;
        }
    },

    getEmissionsChartData: async () => {
        try {
            const response = await apiClient.get("/api/emissions/stats");
            return response.data.chart_data;
        } catch (error) {
            console.warn("Failed to fetch emissions chart data:", error?.response?.data || error.message);
            return null;
        }
    }
};

export default emissionsService;
