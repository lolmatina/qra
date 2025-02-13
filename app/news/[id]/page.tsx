import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Footer from '@/src/widgets/footer';
import Navigation from '@/src/widgets/navigation';
import './styles.css';
interface NewsArticle {
  id: number;
  title: string;
  date: string;
  content: string;
  preview_image: string;
  summary: string;
}

async function getArticle(id: string): Promise<NewsArticle> {
  const res = await fetch(`http://localhost:3000/api/news/${id}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch article');
  }

  return res.json();
}

async function getArticles(): Promise<{ items: NewsArticle[] }> {
  const res = await fetch(`http://localhost:3000/api/news`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch article');
  }

  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<any>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  try {
    const article = await getArticle(resolvedParams.id);

    return {
      title: article.title,
      description: article.content.substring(0, 160),
      openGraph: {
        images: [article.preview_image],
      },
    };
  } catch (error) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }
}


export default async function ArticlePage({
  params,
}: {
  params: Promise<any>;
}) {
  const resolvedParams = await params;

  try {
    const article = await getArticle(resolvedParams.id);
    const {items} = await getArticles();
    return (
      <div>
        <Navigation />
        <div className="container mx-auto flex flex-wrap py-20">
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
          {/* Sidebar */}
          <aside className="md:w-1/4">
            <div className="border rounded-lg p-4 shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Последние новости</h2>
              <nav>
                <ul className="space-y-2">
                  {items.map((item: NewsArticle) => (
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
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
