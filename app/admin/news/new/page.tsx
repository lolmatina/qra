'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Import Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse" />
});
import 'react-quill/dist/quill.snow.css';

export default function NewArticlePage() {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    preview_image: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }

      setMessage('Article created successfully!');
      setFormData({ title: '', summary: '', content: '', preview_image: '' });
    } catch (error) {
      setMessage('Error creating article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Create New Article</h1>
      
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isSubmitting ? 'Creating...' : 'Create Article'}
        </button>
      </form>
    </div>
  );
} 