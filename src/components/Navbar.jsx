// import { Link } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext.jsx";
// import { supabase } from "../lib/supabaseClient";

// export default function Navbar() {
//   const { user } = useAuth();

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//   };

//   return (
//     <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <Link
//           to="/"
//           className="text-2xl font-bold hover:text-gray-200 transition-colors"
//         >
//           My Blog
//         </Link>
//         <div className="space-x-4">
//           <Link to="/" className="hover:text-gray-200 transition-colors">
//             Home
//           </Link>
//           <Link to="/about" className="hover:text-gray-200 transition-colors">
//             About
//           </Link>

//           {user ? (
//             <>
//               <Link
//                 to="/create"
//                 className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
//               >
//                 New Post
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <Link
//               to="/login"
//               className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
//             >
//               Login
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent text-white">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
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

          {user ? (
            <>
              <Link
                to="/create"
                className="bg-indigo-600/70 backdrop-blur-sm text-white px-4 py-2 rounded-md hover:bg-indigo-700/80 transition-colors"
              >
                New Post
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600/70 backdrop-blur-sm text-white px-4 py-2 rounded-md hover:bg-red-700/80 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-600/70 backdrop-blur-sm text-white px-4 py-2 rounded-md hover:bg-green-700/80 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
