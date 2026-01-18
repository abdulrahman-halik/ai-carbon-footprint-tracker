import React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function CategoryFilter({ categories, activeCategory, onSelect }) {
    return (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <Button
                variant={activeCategory === 'All' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => onSelect('All')}
                className={cn("rounded-full px-6", activeCategory === 'All' ? "" : "bg-white border-gray-200 text-gray-600")}
            >
                All
            </Button>
            {categories.map((category) => (
                <Button
                    key={category}
                    variant={activeCategory === category ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => onSelect(category)}
                    className={cn("rounded-full px-6", activeCategory === category ? "" : "bg-white border-gray-200 text-gray-600")}
                >
                    {category}
                </Button>
            ))}
        </div>
    );
}
