import { Mail, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const handleMailClick = (e) => {
    e.preventDefault();
    window.location.href = "mailto:john@johnhodgen.com";
  };

  return (
    <footer className="border-t border-rule mt-20">
      <div className="max-w-2xl mx-auto px-6 py-10 flex justify-between items-center">
        <span className="font-editorial text-sm text-dust">Entry Level</span>

        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/jack_hodgen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dust hover:text-forest transition-colors"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/john-hodgen-59233b29b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dust hover:text-forest transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:john@johnhodgen.com"
            onClick={handleMailClick}
            className="text-dust hover:text-forest transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>

        <span className="text-xs text-dust">
          &copy; {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
