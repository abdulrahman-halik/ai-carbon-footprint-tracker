/**
 * Mock Authentication Service
 * Simulates backend API calls for authentication.
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

const getStoredToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
};

const storeToken = (token) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("access_token", token);
};

const clearToken = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("access_token");
};

const normalizeErrorMessage = async (response, fallback) => {
    try {
        const body = await response.json();
        if (typeof body?.detail === "string") return body.detail;
        if (Array.isArray(body?.detail) && body.detail.length > 0) {
            return body.detail[0]?.msg || fallback;
        }
    } catch {
        // no-op
    }
    return fallback;
};

const mapUserFromApi = (user, token) => ({
    id: user?._id || user?.id,
    name: user?.full_name || user?.name || "Eco User",
    email: user?.email,
    token: token || getStoredToken() || "",
    onboardingCompleted: Boolean(user?.onboarding_completed),
});

const fetchCurrentUser = async (token) => {
    const meRes = await fetch(`${API_BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
    });

    if (!meRes.ok) {
        const msg = await normalizeErrorMessage(meRes, "Unable to fetch current user");
        throw new Error(msg);
    }

    return meRes.json();
};

const authService = {
    /**
     * Log in a user against backend API
     * @param {Object} credentials - { email, password }
     * @returns {Promise<Object>}
     */
    login: async (credentials) => {
        const formData = new URLSearchParams();
        formData.append("username", credentials.email || "");
        formData.append("password", credentials.password || "");

        const loginRes = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
            credentials: "include",
        });

        if (!loginRes.ok) {
            const msg = await normalizeErrorMessage(loginRes, "Invalid credentials");
            throw new Error(msg);
        }

        const tokenData = await loginRes.json();
        storeToken(tokenData.access_token);

        const userData = await fetchCurrentUser(tokenData.access_token);
        const user = mapUserFromApi(userData, tokenData.access_token);

        localStorage.setItem("user", JSON.stringify(user));
        return user;
    },

    /**
     * Register user in backend API, then log in
     * @param {Object} userData - { name, email, password }
     * @returns {Promise<Object>}
     */
    register: async (userData) => {
        const registerRes = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,
                full_name: userData.name,
            }),
            credentials: "include",
        });

        if (!registerRes.ok) {
            const msg = await normalizeErrorMessage(registerRes, "Registration failed");
            throw new Error(msg);
        }

        // Backend register endpoint returns profile only; login to get token + consistent local state.
        return authService.login({ email: userData.email, password: userData.password });
    },

    /**
     * Log out from backend and clear local session
     * @returns {Promise<void>}
     */
    logout: async () => {
        try {
            await fetch(`${API_BASE_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch {
            // Even if backend logout fails, clear client session to avoid lock-in.
        }
        localStorage.removeItem("user");
        clearToken();
    },

    /**
     * Mock forgot password
     * @param {string} email
     * @returns {Promise<Object>}
     */
    forgotPassword: async (email) => {
        await delay(1000); // Simulate network request

        if (email) {
            return { message: "If that email is in our system, you will receive a password reset link." };
        }

        throw new Error("Invalid email");
    },

    /**
     * Get current user from local storage
     * @returns {Object|null}
     */
    getCurrentUser: () => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user");
            return user ? JSON.parse(user) : null;
        }
        return null;
    },

    /**
     * Submit onboarding data to backend and update local user state
     * @param {Object} data - Onboarding data
     * @returns {Promise<Object>}
     */
    submitOnboarding: async (data) => {
        const token = getStoredToken();
        if (!token) {
            throw new Error("Please sign in again to complete onboarding.");
        }

        const res = await fetch(`${API_BASE_URL}/onboarding/complete`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify({ profile: data }),
        });

        if (!res.ok) {
            const msg = await normalizeErrorMessage(res, "Failed to save onboarding data");
            throw new Error(msg);
        }

        const updatedUser = await res.json();
        const mapped = mapUserFromApi(updatedUser, token);

        if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(mapped));
            localStorage.setItem("onboarding_profile", JSON.stringify(data));
        }

        return data;
    },

    /**
     * Mock update profile
     */
    updateProfile: async (data) => {
        await delay(800);
        if (typeof window !== "undefined") {
            localStorage.setItem("onboarding_profile", JSON.stringify(data));
        }
        return { success: true, data };
    },

    /**
     * Mock change password
     */
    changePassword: async (currentPassword, newPassword) => {
        await delay(800);
        if (!currentPassword || !newPassword) {
            throw new Error("Missing required fields");
        }
        // Mock validation: assume current password is "Test@1234" or whatever mock allows
        if (currentPassword === newPassword) {
            throw new Error("New password must be different from current password");
        }
        return { success: true, message: "Password updated successfully" };
    },

    /**
     * Mock toggle 2FA
     */
    toggle2FA: async (enabled) => {
        await delay(800);
        if (typeof window !== "undefined") {
            const userJson = localStorage.getItem("user");
            if (userJson) {
                const userObj = JSON.parse(userJson);
                userObj.twoFactorEnabled = enabled;
                localStorage.setItem("user", JSON.stringify(userObj));
            }
        }
        return { success: true, enabled };
    },

    /**
     * Mock delete account
     */
    deleteAccount: async () => {
        await delay(1000);
        if (typeof window !== "undefined") {
            localStorage.removeItem("user");
            localStorage.removeItem("onboarding_profile");
        }
        return { success: true };
    }
};

const mockApi = {
    ...authService,

    /**
     * Get high-level dashboard stats
     */
    getStats: async () => {
        await delay(500);
        return {
            budget: { percentage: 45, used: 450, total: 1000 },
            neighbors: { diffPercentage: 12, user: 450, avg: 512 },
            bestPerformance: { day: "Tuesday", change: 25, compareLabel: "vs last week" },
            majorImpact: { category: "Business Travel", percentage: 40, label: "of total this month" },
            warning: { title: "High Commute", change: 15, label: "vs last month" }
        };
    },

    /**
     * Get data for emissions sparkline
     */
    getEmissionsData: async () => {
        await delay(500);
        return {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
                {
                    label: "CO2 Emissions (kg)",
                    data: [30, 45, 35, 50, 40, 20, 25],
                    borderColor: "#22C55E",
                    backgroundColor: (context) => {
                        const ctx = context.chart?.ctx;
                        if (!ctx) return "rgba(34, 197, 94, 0.2)";
                        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                        gradient.addColorStop(0, "rgba(34, 197, 94, 0.4)");
                        gradient.addColorStop(1, "rgba(34, 197, 94, 0)");
                        return gradient;
                    },
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: "#22C55E",
                    pointBorderColor: "#FFFFFF",
                    pointHoverRadius: 6,
                },
            ],
        };
    },

    /**
     * Get data for impact pie chart
     */
    getImpactData: async () => {
        await delay(500);
        return {
            labels: ["Transport", "Diet", "Energy", "Shopping"],
            datasets: [
                {
                    label: "Emissions by Category",
                    data: [45, 30, 15, 10],
                    backgroundColor: [
                        "#3B82F6", // Blue
                        "#22C55E", // Green
                        "#EAB308", // Yellow
                        "#A855F7", // Purple
                    ],
                    hoverOffset: 4,
                    borderWidth: 0,
                },
            ],
        };
    }
};

export default mockApi;

export const loginMockData = {
    email: "user@example.com",
    password: "Test@1234",
};

export const registerMockData = {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "Test@1234",
    confirmPassword: "Test@1234",
};
