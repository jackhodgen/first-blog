import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import PostCard from "../components/PostCard.jsx";
import HeaderHero from "../components/HeaderHero.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select(
            "id, title, slug, content, author, published_at, excerpt, cover_url"
          )
          .order("published_at", { ascending: false })
          .limit(5);

        if (error) {
          console.error("Error fetching posts:", error);
          setError(error);
        } else {
          setPosts(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center py-10">Loading posts...</p>;
  if (error)
    return <p className="text-center py-10 text-red-500">{error.message}</p>;

  return (
    <>
      {/* Hero section (navbar overlays this) */}
      <HeaderHero />

      {/* Main blog content */}
      <main className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={{
                ...post,
                excerpt: post.excerpt || post.content.slice(0, 150) + "...",
                content: post.content || "No content available",
                cover_url: post.cover_url || null,
              }}
            />
          ))}
        </div>

        <aside className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold mb-2 text-lg">Categories</h3>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>Tech</li>
              <li>Life</li>
              <li>Growth</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold mb-2 text-lg">Latest Posts</h3>
            <ul className="text-gray-700 text-sm space-y-1">
              {posts.slice(0, 3).map((post) => (
                <li key={post.id}>
                  <a
                    href={`/post/${post.slug}`}
                    className="hover:underline text-blue-600"
                  >
                    {post.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </>
  );
}
