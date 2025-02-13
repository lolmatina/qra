import PaginatedNewsList from '@/src/components/news/PaginatedNewsList';
import Footer from '@/src/widgets/footer';
import Navigation from '@/src/widgets/navigation';

export default async function NewsPage() {
  return (
    <>
      <Navigation />
      <section className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main content */}
            <div className="md:w-full">
              <h1 className="text-3xl font-bold mb-6">Последние новости</h1>
              <PaginatedNewsList />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
