import { Link } from "react-router-dom";
import { TAG_COLORS } from "../lib/tags.js";

export default function PostCard({ post }) {
  return (
    <div className="group py-6 border-b border-rule relative">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-forest origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-200" />
      <div className="transition-transform duration-200 group-hover:translate-x-2.5">
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
        <p className="text-sm text-dust leading-relaxed line-clamp-1 mb-2">
          {post.excerpt || post.content.slice(0, 120) + "..."}
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {post.tags.map((tag) => (
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
      </div>
    </div>
  );
}
