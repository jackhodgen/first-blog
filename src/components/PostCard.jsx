import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
      <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-indigo-600 transition-colors">
        {post.title}
      </h2>

      <p className="text-gray-600 mb-4">
        {post.excerpt || post.content.slice(0, 100) + "..."}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{post.author || "Unknown"}</span>
        <span>{new Date(post.published_at).toLocaleDateString()}</span>
      </div>

      <Link
        to={`/post/${post.slug}`}
        className="mt-4 inline-block text-indigo-600 hover:underline font-medium"
      >
        Read More
      </Link>
    </div>
  );
}
