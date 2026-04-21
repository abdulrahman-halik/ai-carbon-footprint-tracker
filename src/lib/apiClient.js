import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor for adding JWT token
apiClient.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user");
            if (user) {
                const { access_token } = JSON.parse(user);
                if (access_token) {
                    config.headers.Authorization = `Bearer ${access_token}`;
                }
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error (e.g., redirect to login or refresh token)
            if (typeof window !== "undefined") {
                // localStorage.removeItem("user");
                // window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
