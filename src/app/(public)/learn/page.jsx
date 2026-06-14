"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { ArticleCard } from '@/features/education/ArticleCard';
import { CategoryFilter } from '@/features/education/CategoryFilter';
import { getArticles } from '@/services/educationService';

export default function LearnPage() {
    const [articles, setArticles] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadArticles() {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getArticles();
                if (isMounted) {
                    setArticles(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err?.response?.data?.detail || err.message || 'Unable to load articles.');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        loadArticles();

        return () => {
            isMounted = false;
        };
    }, []);

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(articles.map(article => article.category)));
        return ['All', ...uniqueCategories.sort()];
    }, [articles]);

    const filteredArticles = useMemo(() => {
        if (activeCategory === 'All') {
            return articles;
        }
        return articles.filter(article => article.category === activeCategory);
    }, [articles, activeCategory]);

    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Eco Education Hub</h1>
                <p className="text-xl text-gray-600">
                    Discover insights, guides, and the latest research on sustainability and climate action.
                </p>
            </div>

            <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onSelect={setActiveCategory}
            />

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="h-72 rounded-3xl bg-slate-100 animate-pulse" />
                    ))}
                </div>
            ) : error ? (
                <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700">
                    {error}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                        {filteredArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>

                    {filteredArticles.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            No articles found for this category.
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
