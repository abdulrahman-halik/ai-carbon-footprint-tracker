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
        await apiClient.post("/api/auth/register", userData);
        // Automatically login after successful registration
        return await authService.login({
            email: userData.email,
            password: userData.password
        });
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
