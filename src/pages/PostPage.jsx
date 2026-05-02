import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("id, title, content, author, slug, published_at, excerpt, cover_url")
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

  async function handleDelete() {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("posts").delete().eq("id", post.id);
    if (error) {
      alert("Failed to delete post.");
    } else {
      navigate("/");
    }
  }

  if (loading)
    return (
      <div className="max-w-[65ch] mx-auto px-6 py-20 text-center text-dust">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="max-w-[65ch] mx-auto px-6 py-20 text-center text-red-700">
        {error.message}
      </div>
    );

  if (!post)
    return (
      <div className="max-w-[65ch] mx-auto px-6 pt-16">
        <p className="text-dust mb-6">Post not found.</p>
        <Link to="/" className="text-sm text-forest hover:text-moss transition-colors">
          ← Back to Home
        </Link>
      </div>
    );

  return (
    <div className="page-fade max-w-[65ch] mx-auto px-6">
      {/* Post header */}
      <div className="pt-14 pb-8 border-b border-rule mb-10">
        <h1 className="font-editorial text-4xl font-normal leading-tight text-ink mb-5">
          {post.title}
        </h1>
        <p className="text-sm text-dust">
          {post.author || "Jack Hodgen"}&nbsp;&middot;&nbsp;
          {new Date(post.published_at).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      {post.cover_url && (
        <img
          src={post.cover_url}
          alt={post.title}
          className="w-full mb-10 rounded-sm"
        />
      )}

      <div className="text-ink leading-[1.85] text-[1.0625rem] whitespace-pre-line">
        {post.content || "No content available"}
      </div>

      <div className="mt-16 pt-8 border-t border-rule flex justify-between items-center pb-20">
        <Link
          to="/"
          className="text-sm text-forest hover:text-moss transition-colors"
        >
          ← Back to Home
        </Link>
        {user && (
          <button
            onClick={handleDelete}
            className="text-sm text-dust hover:text-red-700 transition-colors"
          >
            Delete post
          </button>
        )}
      </div>
    </div>
  );
}
