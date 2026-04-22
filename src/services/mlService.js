import apiClient from "@/lib/apiClient";

const mlService = {
    predict: async (features) => {
        const response = await apiClient.post("/api/ml/predict", { features });
        return response.data;
    },

    train: async (data, featureNames, targetKey, options = {}) => {
        const response = await apiClient.post("/api/ml/train", {
            data,
            feature_names: featureNames,
            target_key: targetKey,
            ...options
        });
        return response.data;
    }
};

export default mlService;
