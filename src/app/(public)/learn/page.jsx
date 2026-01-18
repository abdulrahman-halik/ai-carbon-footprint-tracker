"use client";

import React, { useState } from 'react';
import { ArticleCard } from '@/features/education/ArticleCard';
import { CategoryFilter } from '@/features/education/CategoryFilter';

const articles = [
    {
        id: 1,
        title: "Understanding Your Carbon Footprint: The Basics",
        excerpt: "What exactly is a carbon footprint? Learn about the key factors that contribute to your personal emissions and why tracking them matters.",
        category: "Basics",
        date: "Jan 12, 2025",
        readTime: "5 min",
        slug: "basics-of-carbon-footprint",
        imageColor: "bg-green-200"
    },
    {
        id: 2,
        title: "10 Simple Ways to Reduce Home Energy Use",
        excerpt: "Cut down on your electricity bill and your emissions with these practical tips for a more energy-efficient home.",
        category: "Lifestyle",
        date: "Jan 15, 2025",
        readTime: "7 min",
        slug: "reduce-home-energy",
        imageColor: "bg-blue-200"
    },
    {
        id: 3,
        title: "The Future of Sustainable Transportation",
        excerpt: "From electric vehicles to high-speed rail, explore how the way we move is changing to protect our planet.",
        category: "Technology",
        date: "Jan 18, 2025",
        readTime: "8 min",
        slug: "sustainable-transportation",
        imageColor: "bg-indigo-200"
    },
    {
        id: 4,
        title: "Plant-Based Diet: Myth vs. Reality",
        excerpt: "Does eating less meat really help the environment? We dive into the data behind food production and emissions.",
        category: "Food",
        date: "Jan 20, 2025",
        readTime: "6 min",
        slug: "plant-based-diet-impact",
        imageColor: "bg-orange-200"
    },
    {
        id: 5,
        title: "How Carbon Offsetting Works",
        excerpt: "Can you really pay to erase your emissions? Understanding the mechanics and ethics of carbon offset projects.",
        category: "Basics",
        date: "Jan 22, 2025",
        readTime: "10 min",
        slug: "how-offsets-work",
        imageColor: "bg-teal-200"
    },
    {
        id: 6,
        title: "Zero Waste Living for Beginners",
        excerpt: "A practical guide to reducing waste in your daily life, from grocery shopping to composting.",
        category: "Lifestyle",
        date: "Jan 25, 2025",
        readTime: "6 min",
        slug: "zero-waste-beginners",
        imageColor: "bg-yellow-200"
    },
];

const categories = ['Basics', 'Lifestyle', 'Technology', 'Food'];

export default function LearnPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredArticles = activeCategory === 'All'
        ? articles
        : articles.filter(article => article.category === activeCategory);

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>

            {filteredArticles.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No articles found in this category.
                </div>
            )}
        </div>
    );
}
