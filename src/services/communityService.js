import apiClient from "@/lib/apiClient";

const communityService = {
    createPost: async (postData) => {
        const response = await apiClient.post("/api/community/post", postData);
        return response.data;
    },

    getFeed: async (limit = 20) => {
        const response = await apiClient.get("/api/community/feed", {
            params: { limit }
        });
        return response.data;
    }
};

export default communityService;
