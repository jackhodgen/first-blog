import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import PostCard from "../components/PostCard.jsx";
import { TAGS, TAG_COLORS, TAG_ACTIVE_COLORS } from "../lib/tags.js";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("id, title, slug, content, author, published_at, excerpt, cover_url, tags")
          .order("published_at", { ascending: false })
          .limit(50);

        if (error) setError(error);
        else setPosts(data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  function toggleFilter(tag) {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  if (loading)
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center text-dust">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center text-red-700">
        {error.message}
      </div>
    );

  const filteredPosts =
    activeFilters.length === 0
      ? posts
      : posts.filter((p) => (p.tags || []).some((t) => activeFilters.includes(t)));

  const featured = activeFilters.length === 0 && filteredPosts.length > 0 ? filteredPosts[0] : null;
  const listPosts = featured ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="page-fade">
      {/* Masthead */}
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <div className="border-t-2 border-accent pt-5 pb-6 border-b border-rule text-center">
          <h1
            className="font-editorial text-6xl font-light text-ink leading-none mb-3"
            style={{ textShadow: '0 1px 0 rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)' }}
          >
            Entry Level
          </h1>
          <p className="text-xs text-dust uppercase tracking-widest">
            A developer&rsquo;s log &nbsp;&bull;&nbsp; Pasadena, CA &nbsp;&bull;&nbsp;{" "}
            {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      {/* Section filter bar */}
      <div className="max-w-2xl mx-auto px-6 py-3.5 border-b border-rule flex items-center gap-2 flex-wrap">
        <span className="text-[0.65rem] text-dust uppercase tracking-widest mr-0.5">Section:</span>
        {TAGS.map((tag) => {
          const active = activeFilters.includes(tag);
          const colors = active ? TAG_ACTIVE_COLORS[tag] : null;
          return (
            <button
              key={tag}
              onClick={() => toggleFilter(tag)}
              className="text-[0.65rem] uppercase tracking-wider px-2.5 py-0.5 rounded-sm border transition-colors"
              style={
                active
                  ? { background: colors.bg, color: colors.text, borderColor: colors.bg }
                  : { background: "transparent", color: "#6B6860", borderColor: "#D9D7D0" }
              }
            >
              {tag}
            </button>
          );
        })}
        {activeFilters.length > 0 && (
          <button
            onClick={() => setActiveFilters([])}
            className="text-[0.65rem] text-dust hover:text-ink ml-1 transition-colors underline underline-offset-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Featured post (unfiltered only) */}
      {featured && (
        <div className="max-w-2xl mx-auto px-6 pt-12 pb-10">
          <span className="text-xs text-accent uppercase tracking-widest mb-5 block">
            Latest
          </span>
          <Link to={`/post/${featured.slug}`} className="group block">
            <h2 className="font-editorial text-3xl font-normal text-ink mb-4 leading-snug group-hover:text-forest transition-colors duration-200">
              {featured.title}
            </h2>
          </Link>
          <p className="text-dust leading-relaxed mb-4 text-[0.9375rem]">
            {featured.excerpt || featured.content.slice(0, 220) + "..."}
          </p>
          {featured.tags && featured.tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap mb-5">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-sm"
                  style={{ background: TAG_COLORS[tag]?.bg, color: TAG_COLORS[tag]?.text }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-dust">
              {featured.author || "Jack Hodgen"}&nbsp;&middot;&nbsp;
              {new Date(featured.published_at).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <Link
              to={`/post/${featured.slug}`}
              className="group text-accent hover:opacity-75 font-medium transition-opacity inline-flex items-center gap-1"
            >
              <span>Read</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      )}

      {/* Ornamental divider */}
      {featured && listPosts.length > 0 && (
        <div className="max-w-2xl mx-auto px-6 flex items-center gap-4 py-2">
          <div className="flex-1 h-px bg-rule" />
          <svg viewBox="0 0 48 16" className="w-16 h-3 flex-shrink-0">
            <line x1="0" y1="8" x2="14" y2="8" stroke="#D9D7D0" strokeWidth="0.75" />
            <path d="M18 8 L24 2 L30 8 L24 14 Z" fill="#B5722A" opacity="0.8" />
            <line x1="34" y1="8" x2="48" y2="8" stroke="#D9D7D0" strokeWidth="0.75" />
          </svg>
          <div className="flex-1 h-px bg-rule" />
        </div>
      )}

      {/* Post list */}
      {listPosts.length > 0 && (
        <div className="max-w-2xl mx-auto px-6 pt-2 pb-20">
          {listPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {filteredPosts.length === 0 && (
        <div className="max-w-2xl mx-auto px-6 pt-16 pb-20 text-dust text-sm">
          {activeFilters.length > 0 ? "No posts in this section yet." : "No posts yet."}
        </div>
      )}
    </div>
  );
}
