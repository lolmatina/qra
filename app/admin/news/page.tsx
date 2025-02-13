'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
}

interface PaginationData {
  total: number;
  page: number;
  perPage: number;
}

interface ArticlesResponse {
  items: Article[];
  pagination: PaginationData;
}

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchArticles();
  }, [currentPage]);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/news');
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      
      const data: ArticlesResponse = await response.json();

      setArticles(data.items);
      setTotalPages(Math.ceil(data.pagination.total / data.pagination.perPage));
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

      fetchArticles();
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('Failed to delete article');
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }
  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  if (articles.length === 0) {
    return <div className="p-8">No articles found</div>;
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          <div key={article.id} className="border rounded-lg p-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-600">{article.summary}</p>
              <p className="text-sm text-gray-500">{new Date(article.date).toLocaleDateString()}</p>
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

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            type="button"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              type="button"
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
