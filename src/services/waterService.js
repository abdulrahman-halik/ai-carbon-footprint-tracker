import apiClient from "@/lib/apiClient";

const waterService = {
    getLogs: async () => {
        try {
            const response = await apiClient.get("/api/water/");
            return response.data;
        } catch (error) {
            console.error("Failed to fetch water logs:", error?.response?.data || error.message);
            return [];
        }
    },

    logWater: async (data) => {
        try {
            const response = await apiClient.post("/api/water/", data);
            return response.data;
        } catch (error) {
            console.error("Failed to log water:", error?.response?.data || error.message);
            throw error;
        }
    },

    updateLog: async (id, data) => {
        try {
            const response = await apiClient.put(`/api/water/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Failed to update water log:", error?.response?.data || error.message);
            throw error;
        }
    },

    deleteLog: async (id) => {
        try {
            const response = await apiClient.delete(`/api/water/${id}`);
            return response.data;
        } catch (error) {
            console.error("Failed to delete water log:", error?.response?.data || error.message);
            throw error;
        }
    }
};

export default waterService;
