import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PostPage from "./pages/PostPage.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HeaderHero from "./components/HeaderHero.jsx";
import About from "./pages/About.jsx";
import CreatePost from "./pages/CreatePost.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <HeaderHero />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<PostPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
