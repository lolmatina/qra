'use client';

import { useState, useEffect } from "react";

interface NewsArticle {
    id: number;
    title: string;
    summary: string;
    preview_image: string;
}

export default function Sidebar() {
    const [items, setItems] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchNews() {
          setIsLoading(true);
          try {
            const res = await fetch(`/api/news`);
            const data = await res.json();
            setItems(data.items);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Failed to fetch news:', error);
          } finally {
            setIsLoading(false);
          }
        }
    
        fetchNews();
    }, []);

    return (
        <aside className="md:w-1/4">
          <div className="border rounded-lg p-4 shadow-sm sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Последние новости</h2>
            <nav>
              <ul className="space-y-2">
                {isLoading ? (
                  [...Array(4)].map((_, index) => (
                    <li key={index} className="flex gap-4 mb-4 animate-pulse">
                      <div className="w-20 h-20 bg-gray-200 rounded" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-2" />
                        <div className="h-3 bg-gray-200 rounded" />
                      </div>
                    </li>
                  ))
                ) : (
                  items.map((item: NewsArticle) => (
                    <li key={item.id} className="flex gap-4 mb-4">
                      <img 
                        src={item.preview_image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <a href={`/news/${item.id}`} className="text-blue-600 hover:text-blue-800 font-medium block mb-1">
                          {item.title}
                        </a>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {item.summary}
                        </p>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </nav>
          </div>
        </aside>
    );
}
