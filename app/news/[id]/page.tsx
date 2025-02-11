import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import Navigation from '@/src/widgets/navigation';
import Footer from '@/src/widgets/footer';

interface NewsArticle {
  id: number;
  title: string;
  date: string;
  content: string;
  preview_image: string;
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

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> | { id: string } }
): Promise<Metadata> {
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

const sidebarLinks = [
    { id: 1, title: "Latest News", href: "#" },
    { id: 2, title: "Announcements", href: "#" },
    { id: 3, title: "Community Posts", href: "#" },
    { id: 4, title: "Archives", href: "#" },
  ];

export default async function ArticlePage(
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  const resolvedParams = await params;
  
  try {
    const article = await getArticle(resolvedParams.id);

    return (<div>
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
                <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>
            </article>
            {/* Sidebar */}
            <aside className="md:w-1/4">
              <div className="border rounded-lg p-4 shadow-sm sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <nav>
                  <ul className="space-y-2">
                    {sidebarLinks.map((link) => (
                      <li key={link.id}>
                        <a 
                          href={link.href}
                          className="text-blue-600 hover:text-blue-800 block py-1"
                        >
                          {link.title}
                        </a>
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