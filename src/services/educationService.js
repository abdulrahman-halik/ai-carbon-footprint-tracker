import apiClient from '@/lib/apiClient';

export async function getArticles() {
    const response = await apiClient.get('/api/education/articles');
    return response.data;
}

export async function getArticleBySlug(slug) {
    const response = await apiClient.get(`/api/education/articles/${encodeURIComponent(slug)}`);
    return response.data;
}
