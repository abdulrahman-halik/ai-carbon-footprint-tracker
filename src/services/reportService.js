import apiClient from "@/lib/apiClient";

const reportService = {
    downloadReport: async (period) => {
        const response = await apiClient.get(`/api/reports/download/${period}`, {
            responseType: 'blob'
        });

        // Handle file download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const filename = `sustainability_report_${period}_${new Date().toISOString().split('T')[0]}.csv`;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        return response.data;
    }
};

export default reportService;
