import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="py-6 border-b border-rule">
      <div className="flex items-baseline justify-between gap-6 mb-1.5">
        <Link
          to={`/post/${post.slug}`}
          className="font-editorial text-lg font-normal text-ink hover:text-forest transition-colors leading-snug"
        >
          {post.title}
        </Link>
        <span className="text-xs text-dust whitespace-nowrap flex-shrink-0 tabular-nums">
          {new Date(post.published_at).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
      <p className="text-sm text-dust leading-relaxed line-clamp-1">
        {post.excerpt || post.content.slice(0, 120) + "..."}
      </p>
    </div>
  );
}
