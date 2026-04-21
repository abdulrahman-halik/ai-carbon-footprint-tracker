import apiClient from "@/lib/apiClient";

const onboardingService = {
    completeOnboarding: async (data) => {
        const response = await apiClient.put("/api/onboarding/complete", { profile: data });
        return response.data;
    },

    startOnboarding: async () => {
        const response = await apiClient.post("/api/onboarding/start");
        return response.data;
    }
};

export default onboardingService;
