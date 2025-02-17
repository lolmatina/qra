'use client';

import { useEffect, useState } from "react";

interface NewsArticle {
    id: number;
    title: string;
    date: string;
    content: string;
    preview_image: string;
    summary: string;
}

export default function Article({id}: {id: string}) {
    const [isLoading, setIsLoading] = useState(true);
    const [article, setArticle] = useState<NewsArticle | null>(null);   

    useEffect(() => {
        const fetchArticle = async () => {
            const res = await fetch(`/api/news/${id}`);
            const data = await res.json();
            setArticle(data);
            setIsLoading(false);
        };
        fetchArticle();
    }, [id]);

    if (isLoading) {
        return (
            <article className="w-full lg:w-3/4 mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-64 bg-gray-200 rounded-lg mb-8" />
                    <div className="space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                        <div className="h-6 bg-gray-200 rounded" />
                    </div>
                </div>
            </article>
        );
    }

    if (!article) {
        return <div>Article not found</div>;
    }   

    return (<>   
    <article className="w-full lg:w-3/4 mx-auto px-4 py-8">
    <img
      src={article.preview_image}
      alt={article.title}
      className="w-full h-64 object-cover rounded-lg mb-8"
    />
    <div className="prose prose-lg max-w-none">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <time className="text-gray-500 mb-8 block">
        {new Date(article.date).toLocaleDateString()}
      </time>
      <div dangerouslySetInnerHTML={{ __html: article.content }} className='content-wrapper'/>
    </div>
  </article>
    </>
    )
}