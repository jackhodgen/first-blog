import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDesktop, faFloppyDisk, faKeyboard, faHardDrive,
  faLaptopCode, faCodeBranch, faFaceGrimace,
} from "@fortawesome/free-solid-svg-icons";
import Home from "./pages/Home.jsx";
import PostPage from "./pages/PostPage.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Login from "./pages/Login.jsx";

const LEFT_ICONS = [
  { icon: faDesktop,     size: "2.75rem", opacity: 0.07,  top: "2%",  left: "16%", rotate: -6  },
  { icon: faKeyboard,    size: "2.25rem", opacity: 0.06,  top: "10%", left: "54%", rotate: 4   },
  { icon: faHardDrive,   size: "2.5rem",  opacity: 0.065, top: "19%", left: "12%", rotate: 5   },
  { icon: faFloppyDisk,  size: "2rem",    opacity: 0.055, top: "27%", left: "58%", rotate: -7  },
  { icon: faCodeBranch,  size: "2.5rem",  opacity: 0.06,  top: "36%", left: "20%", rotate: -8  },
  { icon: faLaptopCode,  size: "2.75rem", opacity: 0.065, top: "44%", left: "48%", rotate: 4   },
  { icon: faFaceGrimace, size: "2.25rem", opacity: 0.06,  top: "53%", left: "14%", rotate: 6   },
  { icon: faDesktop,     size: "2rem",    opacity: 0.05,  top: "62%", left: "56%", rotate: 3   },
  { icon: faKeyboard,    size: "2.5rem",  opacity: 0.06,  top: "71%", left: "18%", rotate: -4  },
  { icon: faHardDrive,   size: "2.25rem", opacity: 0.055, top: "80%", left: "50%", rotate: 7   },
  { icon: faCodeBranch,  size: "2.75rem", opacity: 0.065, top: "88%", left: "14%", rotate: -5  },
  { icon: faFloppyDisk,  size: "2rem",    opacity: 0.05,  top: "95%", left: "55%", rotate: 4   },
];

const RIGHT_ICONS = [
  { icon: faLaptopCode,  size: "2.75rem", opacity: 0.07,  top: "3%",  left: "14%", rotate: 7   },
  { icon: faFaceGrimace, size: "2.25rem", opacity: 0.06,  top: "11%", left: "52%", rotate: -5  },
  { icon: faFloppyDisk,  size: "2.5rem",  opacity: 0.065, top: "20%", left: "16%", rotate: -8  },
  { icon: faCodeBranch,  size: "2rem",    opacity: 0.055, top: "29%", left: "54%", rotate: 5   },
  { icon: faDesktop,     size: "2.75rem", opacity: 0.06,  top: "38%", left: "12%", rotate: 4   },
  { icon: faKeyboard,    size: "2.25rem", opacity: 0.06,  top: "47%", left: "50%", rotate: -6  },
  { icon: faHardDrive,   size: "2.5rem",  opacity: 0.065, top: "56%", left: "18%", rotate: 3   },
  { icon: faLaptopCode,  size: "2rem",    opacity: 0.05,  top: "65%", left: "52%", rotate: -4  },
  { icon: faFaceGrimace, size: "2.5rem",  opacity: 0.06,  top: "74%", left: "14%", rotate: 8   },
  { icon: faFloppyDisk,  size: "2.25rem", opacity: 0.055, top: "82%", left: "50%", rotate: -3  },
  { icon: faDesktop,     size: "2.75rem", opacity: 0.065, top: "90%", left: "16%", rotate: 5   },
  { icon: faCodeBranch,  size: "2rem",    opacity: 0.05,  top: "96%", left: "54%", rotate: -7  },
];

function SidePanel({ icons, className }) {
  return (
    <aside className={`side-panel ${className}`} aria-hidden="true">
      {icons.map(({ icon, size, opacity, top, left, rotate }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top,
            left,
            opacity,
            color: "#1C1917",
            transform: `rotate(${rotate}deg)`,
            fontSize: size,
          }}
        >
          <FontAwesomeIcon icon={icon} />
        </div>
      ))}
    </aside>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="site-shell">
          <SidePanel icons={LEFT_ICONS} className="side-panel-left" />

          <div className="main-column">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/"           element={<Home />} />
                <Route path="/post/:slug" element={<PostPage />} />
                <Route path="/about"      element={<About />} />
                <Route path="/create"     element={<CreatePost />} />
                <Route path="/login"      element={<Login />} />
              </Routes>
            </main>
            <Footer />
          </div>

          <SidePanel icons={RIGHT_ICONS} className="side-panel-right" />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
