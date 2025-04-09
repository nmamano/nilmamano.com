import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Blog Post Not Found</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Oops! The blog post you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/blog"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Back to Blog
      </Link>
    </div>
  );
} 