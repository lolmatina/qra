'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
}

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/news');
      if (!response.ok) { 
        throw new Error('Failed to fetch articles');
      }
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError('Failed to load articles');
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) { 
        throw new Error('Failed to delete article');
      }
      
      // Refresh the articles list
      fetchArticles();
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('Failed to delete article');
    }
  };

  if (isLoading) {return <div className="p-8">Loading...</div>;}
  if (error) {return <div className="p-8 text-red-500">{error}</div>;}

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">News Articles</h1>
        <Link 
          href="/admin/news/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New Article
        </Link>
      </div>

      <div className="grid gap-4">
        {articles.map((article) => (
          <div 
            key={article.id} 
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-600">{article.summary}</p>
              <p className="text-sm text-gray-500">
                {new Date(article.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/news/edit/${article.id}`}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(article.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 