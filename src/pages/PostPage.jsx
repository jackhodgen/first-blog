import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import PageHeader from "../components/PageHeader.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth(); //get current logged-in user

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select(
            "id, title, content, author, slug, published_at, excerpt, cover_url"
          )
          .ilike("slug", slug)
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

  //Delete post function
  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase.from("posts").delete().eq("id", post.id);

    if (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    } else {
      navigate("/"); // Go back home after deletion
    }
  }

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
    <div>
      <PageHeader title={post.title} />

      <div className="container mx-auto px-4 py-4 text-center text-gray-500 text-sm">
        {post.author || "Unknown"} •{" "}
        {new Date(post.published_at).toLocaleDateString()}
      </div>

      <div className="container mx-auto px-4 py-6 max-w-3xl bg-white rounded-lg shadow-md">
        {post.cover_url && (
          <img
            src={post.cover_url}
            alt={post.title}
            className="mb-4 rounded-lg w-full"
          />
        )}
        <div className="text-gray-800 leading-relaxed whitespace-pre-line">
          {post.content || "No content available"}
        </div>

        <div className="flex justify-between items-center mt-8">
          <Link
            to="/"
            className="text-indigo-600 font-semibold hover:underline"
          >
            ← Back to Home
          </Link>

          {/* NEW - Show Delete button only if logged in */}
          {user && (
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
