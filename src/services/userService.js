import apiClient from "@/lib/apiClient";

const userService = {
    updateProfile: async (profileData) => {
        const response = await apiClient.put("/api/users/profile", profileData);
        return response.data;
    },

    changePassword: async (currentPassword, newPassword) => {
        const response = await apiClient.put("/api/auth/change-password", {
            current_password: currentPassword,
            new_password: newPassword
        });
        return response.data;
    },

    toggle2FA: async (enabled) => {
        const response = await apiClient.put("/api/auth/2fa", { enabled });
        return response.data;
    },

    deleteAccount: async () => {
        const response = await apiClient.delete("/api/users/me");
        return response.data;
    }
};

export default userService;
