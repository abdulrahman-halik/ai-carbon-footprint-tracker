import { notFound } from 'next/navigation';
import { getArticleBySlug } from '@/services/educationService';

async function fetchArticle(slug) {
    try {
        return await getArticleBySlug(slug);
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        throw new Error('Unable to load article details.');
    }
}

export default async function ArticlePage({ params }) {
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const article = slug ? await fetchArticle(slug) : null;

    if (!article) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-green-600">{article.category}</p>
                    <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">{article.title}</h1>
                    <p className="mt-4 text-lg leading-8 text-slate-600">{article.excerpt}</p>
                    <div className="mt-4 text-sm text-slate-500">
                        {article.date} • {article.readTime}
                    </div>
                </div>

                <div className="prose prose-slate max-w-none">
                    {article.body?.split(/\n\n+/).map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
