
import React, { useState, useEffect } from 'react';
import Card from './common/Card';
import Icon from './common/Icon';
import type { LibraryResource } from '../types';

const mockResources: LibraryResource[] = [
  { id: 1, title: 'Advanced Calculus', author: 'Sunita Desai', coverUrl: 'https://picsum.photos/seed/book1/300/400', category: 'Mathematics' },
  { id: 2, title: 'The World of Programming', author: 'Rajesh Kumar', coverUrl: 'https://picsum.photos/seed/book2/300/400', category: 'Programming' },
  { id: 3, title: 'A Brief History of Time', author: 'Stephen Hawking', coverUrl: 'https://picsum.photos/seed/book3/300/400', category: 'Science' },
  { id: 4, title: 'Mastering React', author: 'Amit Patel', coverUrl: 'https://picsum.photos/seed/book4/300/400', category: 'Programming' },
  { id: 5, title: 'Organic Chemistry Insights', author: 'Priya Sharma', coverUrl: 'https://picsum.photos/seed/book5/300/400', category: 'Science' },
  { id: 6, title: 'Linear Algebra', author: 'Gilbert Strang', coverUrl: 'https://picsum.photos/seed/book6/300/400', category: 'Mathematics' },
];

const ResourceCard: React.FC<{ resource: LibraryResource }> = ({ resource }) => (
  <Card className="flex flex-col">
    <img src={resource.coverUrl} alt={resource.title} className="w-full h-48 object-cover rounded-t-lg" />
    <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold flex-grow">{resource.title}</h3>
        <p className="text-text-secondary text-sm mb-2">by {resource.author}</p>
        <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full self-start">{resource.category}</span>
    </div>
  </Card>
);

const ResourceCardSkeleton: React.FC = () => {
    const shimmerClass = "bg-gray-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer bg-[length:200%_100%]";
    return (
        <Card className="flex flex-col">
            <div className={`${shimmerClass} w-full h-48 rounded-t-lg`}></div>
            <div className="p-4 space-y-3">
                <div className={`${shimmerClass} h-6 rounded w-3/4`}></div>
                <div className={`${shimmerClass} h-4 rounded w-1/2`}></div>
                <div className={`${shimmerClass} h-6 rounded w-1/4 self-start`}></div>
            </div>
        </Card>
    );
};


const DigitalLibrary: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    const categories = ['All', ...Array.from(new Set(mockResources.map(r => r.category)))];

    const filteredResources = mockResources.filter(resource => 
        (selectedCategory === 'All' || resource.category === selectedCategory) &&
        resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const timer = setTimeout(() => setIsInitialLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Digital Library</h1>
        <p className="text-text-secondary mt-1">Access a world of knowledge at your fingertips.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="search" className="w-5 h-5 text-gray-400" />
          </div>
          <input 
            type="text"
            placeholder="Search for books, articles..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
            className="p-2 border rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isInitialLoading ? (
          Array.from({ length: 4 }).map((_, index) => <ResourceCardSkeleton key={index} />)
        ) : filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl font-semibold text-text-secondary">No resources found.</p>
            <p className="text-text-secondary mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalLibrary;