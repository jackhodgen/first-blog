import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function HeaderHero() {
  const [latestPost, setLatestPost] = useState(null);

  useEffect(() => {
    async function fetchLatestPost() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("slug")
          .order("published_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!error && data) setLatestPost(data);
      } catch (err) {
        console.error("Error fetching latest post:", err);
      }
    }

    fetchLatestPost();
  }, []);

  return (
    <header className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white pt-32 pb-20">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to My Blog
        </h1>
        <p className="text-lg md:text-2xl drop-shadow-md">
          Insights, stories, and updates from my world
        </p>

        {latestPost && (
          <Link
            to={`/post/${latestPost.slug}`}
            className="mt-6 inline-block bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Read Latest Post
          </Link>
        )}
      </div>

      <div className="absolute inset-0 bg-black opacity-20"></div>
    </header>
  );
}
