'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse" />
});
import 'react-quill/dist/quill.snow.css';

interface ArticleData {
  title: string;
  summary: string;
  content: string;
  preview_image: string;
}

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState<ArticleData>({
    title: '',
    summary: '',
    content: '',
    preview_image: '',
  });

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/news/${params.id}`);
      if (!response.ok) {throw new Error('Failed to fetch article');}
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      setMessage('Error loading article');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`/api/news/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {throw new Error('Failed to update article');}

      setMessage('Article updated successfully!');
      router.push('/admin/news');
    } catch (error) {
      setMessage('Error updating article');
    }
  };

  if (isLoading) {return <div className="p-8">Loading...</div>;}

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Edit Article</h1>
      
      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes('Error') ? 'bg-red-100' : 'bg-green-100'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="summary" className="block mb-2 font-semibold">
            Summary
          </label>
          <textarea
            id="summary"
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            className="w-full p-2 border rounded h-24"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="preview_image" className="block mb-2 font-semibold">
            Preview Image URL
          </label>
          <input
            type="url"
            id="preview_image"
            value={formData.preview_image}
            onChange={(e) => setFormData({ ...formData, preview_image: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 font-semibold">
            Content
          </label>
          <div className="border rounded">
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(content) => {
                // eslint-disable-next-line no-console
                console.log('content', content);
                setFormData({ ...formData, content })
              }}
              modules={modules}
              className="h-96 mb-12"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Update Article
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/news')}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
} 