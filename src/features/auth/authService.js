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
                token: "mock-jwt-token-123456"
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
                token: "mock-jwt-token-register-789012"
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
     * Get current user from local storage
     * @returns {Object|null}
     */
    getCurrentUser: () => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user");
            return user ? JSON.parse(user) : null;
        }
        return null;
    }
};

export default authService;
