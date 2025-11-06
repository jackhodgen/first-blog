import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, author, published_at, cover_url")
        .order("published_at", { ascending: false });

      if (cancelled) return;
      if (error) setError(error);
      else setPosts(data ?? []);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { posts, loading, error };
}
