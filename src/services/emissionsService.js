import apiClient from "@/lib/apiClient";

const emissionsService = {
    getEmissions: async () => {
        const response = await apiClient.get("/api/emissions/");
        return response.data;
    },

    logActivity: async (data) => {
        const response = await apiClient.post("/api/emissions/", data);
        return response.data;
    },

    getEmissionsChartData: async () => {
        const response = await apiClient.get("/api/emissions/stats");
        return response.data.chart_data;
    }
};

export default emissionsService;
