"use client"

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/**
 * Header Component - Modern Minimalist Design
 * Features: Sticky navigation, smooth animations, responsive menu
 * Typography: Poppins Bold for logo, Inter Regular for nav items
 */

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Quiz</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Fitur
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Cara Kerja
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Harga
            </a>
            <a
              href="#faq"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Desktop CTA Buttons */}

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-900 hover:bg-gray-100 font-medium rounded-md"
            >
              Masuk
            </Link>

            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
            >
              Daftar Gratis
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
            <a
              href="#features"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Fitur
            </a>
            <a
              href="#how-it-works"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cara Kerja
            </a>
            <a
              href="#pricing"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Harga
            </a>
            <a
              href="#faq"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              FAQ
            </a>
            <div className="pt-3 space-y-2 border-t border-gray-200">
              <Button
                variant="ghost"
                className="w-full text-gray-900 hover:bg-gray-100 font-medium"
              >
                Masuk
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                Daftar Gratis
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
