import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ArticleCard({ article }) {
    return (
        <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 border-none shadow-md group">
            <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
                {/* Placeholder for image */}
                <div className={cn("absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105", article.imageColor || "bg-green-100")} />
                <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-sm font-semibold text-xs py-1">
                        {article.category}
                    </Badge>
                </div>
            </div>

            <CardHeader className="pb-2">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                    <Link href={`/learn/${article.slug}`}>
                        {article.title}
                    </Link>
                </h3>
            </CardHeader>

            <CardContent className="flex-grow pb-4">
                <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                    {article.excerpt}
                </p>
            </CardContent>

            <CardFooter className="pt-0 flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 mt-auto p-4 bg-gray-50/50">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {article.readTime}
                    </span>
                </div>
                <Link href={`/learn/${article.slug}`} className="text-primary font-medium flex items-center gap-1 hover:underline">
                    Read <ArrowRight size={14} />
                </Link>
            </CardFooter>
        </Card>
    );
}
