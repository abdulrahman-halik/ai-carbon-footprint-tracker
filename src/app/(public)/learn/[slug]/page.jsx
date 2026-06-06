// app/learn/[slug]/page.jsx

const articles = [
    {
        id: 1,
        title: "Understanding Your Carbon Footprint: The Basics",
        excerpt: "What exactly is a carbon footprint?",
        slug: "basics-of-carbon-footprint",
    },
    {
        id: 2,
        title: "10 Simple Ways to Reduce Home Energy Use",
        excerpt: "Cut down on your electricity bill",
        slug: "reduce-home-energy",
    },
];

export default function ArticlePage({ params }) {
    const article = articles.find(
        (item) => item.slug === params.slug
    );

    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-4">
                {article.title}
            </h1>

            <p className="text-gray-600">
                {article.excerpt}
            </p>
        </div>
    );
}