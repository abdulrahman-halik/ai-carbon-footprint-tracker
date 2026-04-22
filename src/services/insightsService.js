import apiClient from "@/lib/apiClient";

const insightsService = {
    search: async (query, topK = 3) => {
        const response = await apiClient.get("/api/insights/search", {
            params: { q: query, top_k: topK }
        });
        return response.data;
    },

    indexDocuments: async (documents) => {
        const response = await apiClient.post("/api/insights/index", documents);
        return response.data;
    }
};

export default insightsService;
