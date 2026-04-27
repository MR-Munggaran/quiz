"use client"

import { Button } from "@/components/ui/button";
import { Menu, X, GiftIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/**
 * Header Component - Open Source Community Theme
 * Fresh green/teal palette, community-focused, free for everyone
 */

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-400 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className="text-xl font-bold text-gray-900">QuizOpen</span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 ml-1">
              Open Source
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
              Fitur
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
              Cara Kerja
            </a>
            <Link href="/community" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
              Komunitas
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 font-medium rounded-md transition-colors"
            >
              <GiftIcon className="w-4 h-4" />
              GitHub
            </a>
            <Link
              href="/login"
              className="px-4 py-2 text-gray-900 hover:bg-gray-100 font-medium rounded-md transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md transition-colors shadow-sm"
            >
              Mulai Gratis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <a href="#features" className="block px-4 py-2 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
              Fitur
            </a>
            <a href="#how-it-works" className="block px-4 py-2 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
              Cara Kerja
            </a>
            <a href="#community" className="block px-4 py-2 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
              Komunitas
            </a>
            <a href="#faq" className="block px-4 py-2 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors">
              FAQ
            </a>
            <div className="pt-3 space-y-2 border-t border-gray-200">
              <Button variant="ghost" className="w-full text-gray-900 hover:bg-gray-100 font-medium">
                Masuk
              </Button>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium">
                Mulai Gratis
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}