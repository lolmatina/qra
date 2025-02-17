import Footer from '@/src/widgets/footer';
import Navigation from '@/src/widgets/navigation';
import './styles.css';
import Article from '@/src/components/news/Article';
import Sidebar from '@/src/components/news/Sidebar';

export default async function ArticlePage({params}: {params: Promise<any>}) {
  const resolvedParams = await params;

  return (
    <div>
      <Navigation />
      <div className="container mx-auto flex flex-wrap py-20">
        <Article id={resolvedParams.id} />
        {/* Sidebar */}
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}
