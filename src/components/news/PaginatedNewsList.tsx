'use client';

import { useState, useEffect } from 'react';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  preview_image: string;
}

interface PaginatedNewsListProps {
  newsItems: NewsItem[];
}

const ITEMS_PER_PAGE = 4;

export default function PaginatedNewsList({ newsItems: initialItems }: PaginatedNewsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsItems, setNewsItems] = useState(initialItems);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/news?page=${currentPage}&limit=4`);
        const data = await res.json();
        setNewsItems(data.items);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch news:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchNews();
  }, [currentPage]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = newsItems.slice(startIndex, endIndex);

  return (
    <div>
      <div className="space-y-6">
        {isLoading ? (
          // Add loading skeletons for news items
          [...Array(ITEMS_PER_PAGE)].map((_, index) => (
            <div 
              key={index}
              className="border rounded-lg overflow-hidden shadow-sm animate-pulse"
            >
              <div className="aspect-video bg-gray-200" />
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))
        ) : (
          currentItems.map((item) => (
            <article 
              key={item.id} 
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <a href={`/news/${item.id}`} className="block">
                <div className="aspect-video relative">
                  <img
                    src={item.preview_image}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-3">{item.date}</p>
                  <p className="text-gray-700">{item.summary}</p>
                </div>
              </a>
            </article>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || isLoading}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
          >
            Previous
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              type="button"
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              disabled={isLoading}
              className={`w-10 h-10 rounded-lg ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-50'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            type="button"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || isLoading}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
} 