import { notFound } from 'next/navigation';
import EditArticleForm from './EditArticleForm';

async function getArticle(id: string) {
  const response = await fetch(`http://localhost:3000/api/news/${id}`, {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    return null;
  }
  
  return response.json();
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.id);
  
  if (!article) {
    notFound();
  }

  return <EditArticleForm initialData={article} articleId={resolvedParams.id} />;
}
