import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select(
            "id, title, content, author, slug, published_at, excerpt, cover_url"
          )
          .ilike("slug", slug) // case-insensitive match
          .maybeSingle();

        if (error) setError(error);
        else setPost(data || null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) return <p className="text-center py-10">Loading post...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500">{error.message}</p>;
  if (!post)
    return (
      <div className="container mx-auto px-4 py-6">
        <p className="text-gray-500">Post not found</p>
        <Link
          to="/"
          className="inline-block mt-6 text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      {post.cover_url && (
        <img
          src={post.cover_url}
          alt={post.title}
          className="mb-4 rounded-lg"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {post.author || "Unknown"} •{" "}
        {new Date(post.published_at).toLocaleDateString()}
      </p>
      <p className="text-gray-800 leading-relaxed">
        {post.content || "No content available"}
      </p>
      <Link to="/" className="inline-block mt-6 text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}
