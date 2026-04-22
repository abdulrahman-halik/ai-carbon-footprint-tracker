import apiClient from "@/lib/apiClient";

const waterService = {
    getLogs: async () => {
        const response = await apiClient.get("/api/water/");
        return response.data;
    },

    logWater: async (data) => {
        const response = await apiClient.post("/api/water/", data);
        return response.data;
    },

    updateLog: async (id, data) => {
        const response = await apiClient.put(`/api/water/${id}`, data);
        return response.data;
    },

    deleteLog: async (id) => {
        const response = await apiClient.delete(`/api/water/${id}`);
        return response.data;
    }
};

export default waterService;
