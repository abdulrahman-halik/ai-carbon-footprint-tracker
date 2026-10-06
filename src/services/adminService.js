import apiClient from "@/lib/apiClient";

const adminService = {
    // 1. Regular Users
    getUsers: async () => {
        const response = await apiClient.get("/api/admin/users");
        return response.data;
    },

    // 2. User Emission & Resource Summary
    getUserSummary: async (userId) => {
        const response = await apiClient.get(`/api/admin/users/${userId}/summary`);
        return response.data;
    },

    // 3. User Activation / Deactivation Status
    updateUserStatus: async (userId, isActive) => {
        const response = await apiClient.patch(`/api/admin/users/${userId}/status`, {
            is_active: isActive,
        });
        return response.data;
    },

    // 4. Carbon Footprint Analytics across users
    getEmissionsAnalytics: async () => {
        const response = await apiClient.get("/api/admin/analytics/emissions");
        return response.data;
    },

    // 5. Water Usage Analytics across users
    getWaterAnalytics: async () => {
        const response = await apiClient.get("/api/admin/analytics/water");
        return response.data;
    },

    // 6. Electricity / Energy Usage Analytics across users
    getEnergyAnalytics: async () => {
        const response = await apiClient.get("/api/admin/analytics/energy");
        return response.data;
    },

    // 7. Active and Reducing Goals Analytics
    getGoalsAnalytics: async () => {
        const response = await apiClient.get("/api/admin/analytics/goals");
        return response.data;
    },
};

export default adminService;
