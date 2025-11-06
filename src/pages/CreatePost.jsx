import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx"; // auth context
import { Navigate } from "react-router-dom";

export default function CreatePost() {
  const { user, loading } = useAuth();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (!user) return <Navigate to="/login" />;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoadingSubmit(true);
    setError(null);

    // Auto-generate slug if empty
    const finalSlug = slug || title.toLowerCase().replace(/\s+/g, "-");

    const { error } = await supabase.from("posts").insert([
      {
        title,
        slug: finalSlug,
        content,
        author: user.email,
        published_at: new Date().toISOString(),
      },
    ]);

    setLoadingSubmit(false);

    if (error) {
      console.error("Error creating post:", error);
      setError(error.message);
    } else {
      navigate("/");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Slug (optional)
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="hello-world"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="6"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loadingSubmit}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {loadingSubmit ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
}
