'use client';

import { useEffect, useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  preview_image: string;
}

const ITEMS_PER_PAGE = 4;

export default function PaginatedNewsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

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

  if (!isLoading && (!newsItems || newsItems.length === 0)) {
    return <div>No news articles found</div>;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = newsItems.slice(startIndex, endIndex);

  return (
    <div>
      <div className="space-y-6">
        {isLoading
          ? // Add loading skeletons for news items
            [...Array(ITEMS_PER_PAGE)].map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-2 border rounded-lg overflow-hidden shadow-sm animate-pulse"
              >
                <div className="h-full bg-gray-200" />
                <div className="p-6">
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                  <div className="h-16 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))
          : currentItems.map((item) => (
              <article
                key={item.id}
                className="grid grid-cols-2 border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-[300px]">
                  <img
                    src={item.preview_image}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <a href={`/news/${item.id}`} className="block">
                    <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">{item.title}</h2>
                    <p className="text-gray-500 text-sm mb-3">{new Date(item.date).toLocaleDateString()}</p>
                    <p className="text-gray-700">{item.summary}</p>
                  </a>
                </div>
              </article>
            ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || isLoading}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
          >
            Назад
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              type="button"
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              disabled={isLoading}
              className={`w-10 h-10 rounded-lg border ${
                currentPage === index + 1 ? 'bg-[#405561] text-white' : 'hover:bg-[#7A2220]'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || isLoading}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
          >
            Вперед
          </button>
        </nav>
      </div>
    </div>
  );
}
