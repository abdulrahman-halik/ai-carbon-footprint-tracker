import apiClient from "@/lib/apiClient";

const energyService = {
    getLogs: async () => {
        const response = await apiClient.get("/api/energy/");
        return response.data;
    },

    logEnergy: async (data) => {
        const response = await apiClient.post("/api/energy/", data);
        return response.data;
    },

    updateLog: async (id, data) => {
        const response = await apiClient.put(`/api/energy/${id}`, data);
        return response.data;
    },

    deleteLog: async (id) => {
        const response = await apiClient.delete(`/api/energy/${id}`);
        return response.data;
    }
};

export default energyService;
