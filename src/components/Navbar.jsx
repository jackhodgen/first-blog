import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-gray-200 transition-colors"
        >
          My Blog
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-200 transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-200 transition-colors">
            About
          </Link>
          <Link
            to="/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            New Post
          </Link>
        </div>
      </div>
    </nav>
  );
}
