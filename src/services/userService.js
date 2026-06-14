import apiClient from "@/lib/apiClient";

const userService = {
    updateProfile: async (profileData) => {
        const response = await apiClient.put("/api/users/profile", {
            full_name: profileData.name,
            profile: {
                ageGroup: profileData.ageGroup,
                location: profileData.location,
                vehicleType: profileData.vehicleType,
                commuteDistance: profileData.commuteDistance,
                mpg: profileData.mpg,
                electricityUsage: profileData.electricityUsage,
                dietType: profileData.dietType,
                householdSize: profileData.householdSize,
                profilePicture: profileData.profilePicture,
            },
        });
        return response.data;
    },

    changePassword: async (currentPassword, newPassword) => {
        const response = await apiClient.post("/api/auth/change-password", {
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
