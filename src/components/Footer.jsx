import { Mail, Instagram, Linkedin } from "lucide-react";

export default function ContactSection() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

        <div className="flex justify-center space-x-8 mb-6">
          <a
            href="https://www.instagram.com/jack_hodgen"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition"
          >
            <Instagram size={28} />
          </a>

          <a
            href="https://www.linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <Linkedin size={28} />
          </a>

          <a
            href="mailto:john@johnhodgen.com"
            className="hover:text-green-400 transition"
          >
            <Mail size={28} />
          </a>
        </div>

        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} My Blog
        </p>
      </div>
    </footer>
  );
}
