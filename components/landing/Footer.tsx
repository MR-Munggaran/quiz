import { Mail, Phone, MapPin, GitBranchIcon, TableRowsSplit, MessageCircle } from "lucide-react";

/**
 * Footer Component - Open Source Community Theme
 * Emerald/teal accents, community links, open source references
 */

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span className="text-xl font-bold text-white">QuizOpen</span>
            </div>
            <div className="inline-flex items-center px-2 py-1 rounded-md bg-emerald-900/50 border border-emerald-700/50 text-emerald-400 text-xs font-semibold">
              MIT License — Free Forever
            </div>
            <p className="text-gray-400 leading-relaxed">
              Platform kuis open source untuk guru dan siswa di seluruh Indonesia. Gratis selamanya.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors"
                title="GitHub"
              >
                <GitBranchIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors"
                title="Twitter"
              >
                <TableRowsSplit className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors"
                title="Discord"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Platform</h3>
            <ul className="space-y-2">
              {["Fitur", "Dokumentasi", "Changelog", "Roadmap"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Column */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Komunitas</h3>
            <ul className="space-y-2">
              {[
                { label: "GitHub", href: "https://github.com" },
                { label: "Diskusi", href: "#" },
                { label: "Kontribusi", href: "#" },
                { label: "Blog", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:hello@quizopen.id" className="text-gray-400 hover:text-white transition-colors">
                  hello@quizopen.id
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <a href="tel:+62123456789" className="text-gray-400 hover:text-white transition-colors">
                  +62 (123) 456-789
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800" />

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 QuizOpen. Dibuat dengan ❤️ oleh komunitas. Dirilis di bawah{" "}
            <a href="#" className="text-emerald-400 hover:underline">MIT License</a>.
          </p>
          <div className="flex gap-6 text-sm">
            {["Kebijakan Privasi", "Syarat Layanan", "Kebijakan Cookie"].map((item) => (
              <a key={item} href="#" className="text-gray-400 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}