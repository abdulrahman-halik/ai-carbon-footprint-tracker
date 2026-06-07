import apiClient from "@/lib/apiClient";

const goalService = {
    setGoal: async (goalData) => {
        const response = await apiClient.post("/api/goals/set", goalData);
        return response.data;
    },

    getProgress: async () => {
        try {
            const response = await apiClient.get("/api/goals/progress");
            return response.data;
        } catch (error) {
            console.error("Failed to fetch goals progress:", error?.response?.data || error.message);
            return [];
        }
    }
};

export default goalService;
