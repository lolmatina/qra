import Footer from '@/src/widgets/footer';
import PaginatedNewsList from "@/src/components/news/PaginatedNewsList";
import Navigation from "@/src/widgets/navigation";
// Fetch function
async function getNews(page: number = 1, limit: number = 4) {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';
    
  const res = await fetch(
    new URL(`/api/news?page=${page}&limit=${limit}`, baseUrl).toString(),
    { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch news');
  }

  return res.json();
}

// Mock sidebar links (keep these static or create another API route if needed)
const sidebarLinks = [
  { id: 1, title: "Latest News", href: "#" },
  { id: 2, title: "Announcements", href: "#" },
  { id: 3, title: "Community Posts", href: "#" },
  { id: 4, title: "Archives", href: "#" },
];

export default async function NewsPage() {
  const initialData = await getNews();

  return (
    <>
      <Navigation />
      <section className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main content */}
            <div className="md:w-3/4">
              <h1 className="text-3xl font-bold mb-6">Latest News</h1>
              <PaginatedNewsList newsItems={initialData.items} />
            </div>
            
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
        </div>
      </section>
      <Footer />
    </>
  );
}
