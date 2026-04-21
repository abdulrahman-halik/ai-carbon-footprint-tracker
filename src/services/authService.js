import apiClient from "@/lib/apiClient";

const authService = {
    login: async (credentials) => {
        const formData = new URLSearchParams();
        formData.append("username", credentials.email);
        formData.append("password", credentials.password);

        const response = await apiClient.post("/api/auth/login", formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        // Fetch user profile after successful login
        const tokenData = response.data;
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${tokenData.access_token}`;

        const userResponse = await apiClient.get("/api/users/me");
        const userData = {
            ...userResponse.data,
            token: tokenData.access_token,
            access_token: tokenData.access_token,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
    },

    register: async (userData) => {
        const response = await apiClient.post("/api/auth/register", userData);
        // After registration, we might need to login or just return user data
        // For simplicity, let's assume registration doesn't auto-login or does return UserOut
        return response.data;
    },

    logout: async () => {
        localStorage.removeItem("user");
        delete apiClient.defaults.headers.common["Authorization"];
    },

    forgotPassword: async (email) => {
        const response = await apiClient.post("/api/auth/forgot-password", { email });
        return response.data;
    },

    getCurrentUser: () => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user");
            return user ? JSON.parse(user) : null;
        }
        return null;
    }
};

export default authService;
