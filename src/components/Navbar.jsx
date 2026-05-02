import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="border-b border-rule">
      <div className="max-w-2xl mx-auto px-6 py-5 flex justify-between items-baseline">
        <Link
          to="/"
          className="font-editorial text-xl tracking-tight text-ink hover:text-forest transition-colors"
        >
          Entry Level
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm text-dust hover:text-forest transition-colors tracking-wide"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-sm text-dust hover:text-forest transition-colors tracking-wide"
          >
            About
          </Link>

          {user && (
            <>
              <Link
                to="/create"
                className="text-sm text-forest hover:text-moss transition-colors tracking-wide"
              >
                New Post
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-dust hover:text-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
