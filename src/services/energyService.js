import apiClient from "@/lib/apiClient";

const energyService = {
    getLogs: async () => {
        try {
            const response = await apiClient.get("/api/energy/");
            return response.data;
        } catch (error) {
            console.error("Failed to fetch energy logs:", error?.response?.data || error.message);
            throw error;
        }
    },

    logEnergy: async (data) => {
        try {
            const response = await apiClient.post("/api/energy/", data);
            return response.data;
        } catch (error) {
            console.error("Failed to log energy:", error?.response?.data || error.message);
            throw error;
        }
    },

    updateLog: async (id, data) => {
        try {
            const response = await apiClient.put(`/api/energy/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Failed to update energy log:", error?.response?.data || error.message);
            throw error;
        }
    },

    deleteLog: async (id) => {
        try {
            const response = await apiClient.delete(`/api/energy/${id}`);
            return response.data;
        } catch (error) {
            console.error("Failed to delete energy log:", error?.response?.data || error.message);
            throw error;
        }
    }
};

export default energyService;
