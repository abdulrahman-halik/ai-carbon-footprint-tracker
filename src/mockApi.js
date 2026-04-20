/**
 * Mock Authentication Service
 * Simulates backend API calls for authentication.
 */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const authService = {
    /**
     * Mock logging in a user
     * @param {Object} credentials - { email, password }
     * @returns {Promise<Object>}
     */
    login: async (credentials) => {
        await delay(1000); // Simulate network request

        // Mock validation (accept any non-empty values for now)
        if (credentials.email && credentials.password) {
            const user = {
                name: "Eco Warrior",
                email: credentials.email,
                token: "mock-jwt-token-123456",
                onboardingCompleted: true // Returning user defaults to true for mock testing
            };

            localStorage.setItem("user", JSON.stringify(user));
            return user;
        }

        throw new Error("Invalid credentials");
    },

    /**
     * Mock registering a user
     * @param {Object} userData - { name, email, password }
     * @returns {Promise<Object>}
     */
    register: async (userData) => {
        await delay(1000); // Simulate network request

        if (userData.email && userData.password && userData.name) {
            const user = {
                name: userData.name,
                email: userData.email,
                token: "mock-jwt-token-register-789012",
                onboardingCompleted: false // New user has not completed onboarding
            };

            localStorage.setItem("user", JSON.stringify(user));
            return user;
        }

        throw new Error("Invalid registration data");
    },

    /**
     * Mock logging out a user
     * @returns {Promise<void>}
     */
    logout: async () => {
        await delay(500);
        localStorage.removeItem("user");
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
     * Mock submit onboarding data
     * @param {Object} data - Onboarding data
     * @returns {Promise<Object>}
     */
    submitOnboarding: async (data) => {
        await delay(800);

        // Mock default successful response with dummy data
        const dummyData = {
            id: "eco-profile-" + Math.floor(Math.random() * 10000),
            status: "active",
            createdAt: new Date().toISOString(),
            ...data
        };

        if (typeof window !== "undefined") {
            const userJson = localStorage.getItem("user");
            if (userJson) {
                const userObj = JSON.parse(userJson);
                userObj.onboardingCompleted = true;
                localStorage.setItem("user", JSON.stringify(userObj));
            }
            localStorage.setItem("onboarding_profile", JSON.stringify(dummyData));
        }
        return dummyData;
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
        const defaultStats = {
            budget: { percentage: 45, used: 450, total: 1000 },
            neighbors: { diffPercentage: 12, user: 450, avg: 512 },
            bestPerformance: { day: "Tuesday", change: 25, compareLabel: "vs last week" },
            majorImpact: { category: "Business Travel", percentage: 40, label: "of total this month" },
            warning: { title: "High Commute", change: 15, label: "vs last month" }
        };

        if (typeof window !== "undefined") {
            const savedStats = localStorage.getItem("dashboard_stats");
            if (savedStats) return JSON.parse(savedStats);
            localStorage.setItem("dashboard_stats", JSON.stringify(defaultStats));
        }
        return defaultStats;
    },

    /**
     * Mock logging an activity and updating stats
     */
    logActivity: async (data) => {
        await delay(800);
        if (typeof window !== "undefined") {
            const stats = JSON.parse(localStorage.getItem("dashboard_stats") || '{"budget":{"percentage":45,"used":450,"total":1000}}');

            // Simulating carbon impact based on logic
            const impact = Math.floor(Math.random() * 10) + 2; // 2-12 kg impact
            stats.budget.used += impact;
            stats.budget.percentage = Math.round((stats.budget.used / stats.budget.total) * 100);

            localStorage.setItem("dashboard_stats", JSON.stringify(stats));
            return { success: true, impact, totalUsed: stats.budget.used };
        }
        return { success: true, impact: 5, totalUsed: 455 };
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
