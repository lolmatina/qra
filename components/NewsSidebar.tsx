import Link from 'next/link';

export default function NewsSidebar() {
  return (
    <div className="w-full lg:w-1/4 p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/news/category/technology" className="text-gray-600 hover:text-blue-500">
              Technology
            </Link>
          </li>
          <li>
            <Link href="/news/category/business" className="text-gray-600 hover:text-blue-500">
              Business
            </Link>
          </li>
          <li>
            <Link href="/news/category/sports" className="text-gray-600 hover:text-blue-500">
              Sports
            </Link>
          </li>
          {/* Add more categories as needed */}
        </ul>
      </div>
    </div>
  );
} 