'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import 'react-quill/dist/quill.snow.css';

// Import Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-gray-100 animate-pulse" />,
});

export default function NewArticlePage() {
  const form = useForm({
    initialValues: {
      title: '',
      summary: '',
      content: '',
      preview_image: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const handleSubmit = async (values: typeof form.values) => {
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }

      setMessage('Article created successfully!');
      form.reset();
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
        <div
          className={`p-4 mb-4 rounded ${message.includes('Error') ? 'bg-red-100' : 'bg-green-100'}`}
        >
          {message}
        </div>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)} className="max-w-4xl">
        <div className="mb-4">
          <TextInput
            label="Title"
            {...form.getInputProps('title')}
            required
            classNames={{
              root: 'mb-4',
              label: 'block mb-2 font-semibold',
              input: 'w-full p-2 border rounded',
            }}
          />
        </div>

        <Textarea
          label="Summary"
          {...form.getInputProps('summary')}
          required
          minRows={4}
          classNames={{
            root: 'mb-4',
            label: 'block mb-2 font-semibold',
            input: 'w-full p-2 border rounded',
          }}
        />

        <TextInput
          type="url"
          label="Preview Image URL"
          {...form.getInputProps('preview_image')}
          required
          classNames={{
            root: 'mb-4',
            label: 'block mb-2 font-semibold',
            input: 'w-full p-2 border rounded',
          }}
        />

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Content</label>
          <div className="border rounded">
            <ReactQuill
              theme="snow"
              value={form.values.content}
              onChange={(content) => form.setFieldValue('content', content)}
              modules={modules}
              className="h-96 mb-12"
            />
          </div>
        </div>

        <Button
          type="submit"
          loading={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isSubmitting ? 'Creating...' : 'Create Article'}
        </Button>
      </form>
    </div>
  );
}
