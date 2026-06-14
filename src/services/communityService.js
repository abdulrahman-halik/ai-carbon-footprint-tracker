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
    },

    // ─── Team Members ───────────────────────────────────────────────────────

    getMembers: async () => {
        const response = await apiClient.get("/api/community/members");
        return response.data;
    },

    addMember: async (memberData) => {
        const response = await apiClient.post("/api/community/members", memberData);
        return response.data;
    },

    updateMember: async (memberId, memberData) => {
        const response = await apiClient.put(`/api/community/members/${memberId}`, memberData);
        return response.data;
    },

    deleteMember: async (memberId) => {
        await apiClient.delete(`/api/community/members/${memberId}`);
    },
};

export default communityService;
