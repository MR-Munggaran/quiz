import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * Hero Section - Modern Minimalist Design
 * Features: Asymmetric layout, gradient accent, smooth animations
 * Typography: Poppins Bold for heading, Inter Regular for body
 */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663579753178/Yx8gLBghxxtqZrjjXo6MhL/hero-bg-YBwnZaC4NgioZQUGgHJYpG.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80 z-1" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                Platform Pembelajaran Terpercaya
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Buat Kuis yang{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Menginspirasi
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Platform kuis online terpercaya untuk guru dan siswa. Buat,
                bagikan, dan evaluasi pembelajaran dengan mudah.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-6 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-200 group"
              >
                Mulai Gratis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-600 text-gray-900 rounded-lg px-8 py-6 text-lg font-semibold transition-all duration-300"
              >
                Lihat Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-8 border-t border-gray-200">
              <div>
                <p className="text-2xl font-bold text-gray-900">10K+</p>
                <p className="text-sm text-gray-600">Pengguna Aktif</p>
              </div>
              <div className="w-px h-12 bg-gray-300" />
              <div>
                <p className="text-2xl font-bold text-gray-900">50K+</p>
                <p className="text-sm text-gray-600">Kuis Dibuat</p>
              </div>
              <div className="w-px h-12 bg-gray-300" />
              <div>
                <p className="text-2xl font-bold text-gray-900">4.9★</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative h-96 lg:h-full animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663579753178/Yx8gLBghxxtqZrjjXo6MhL/illustration-quiz-NCbJccRm3sCWmMMZnsPUgt.webp"
              alt="Student taking quiz"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-blue-100 rounded-full opacity-20 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-10 blur-3xl animate-pulse" />
    </section>
  );
}
