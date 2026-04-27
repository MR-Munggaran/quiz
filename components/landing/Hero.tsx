import { Button } from "@/components/ui/button";
import { ArrowRight, GiftIcon, Star, GitFork } from "lucide-react";

/**
 * Hero Section - Open Source Community Theme
 * Fresh emerald/teal palette, community-focused messaging
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
          opacity: 0.3,
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
              <GiftIcon className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">
                100% Gratis & Open Source untuk Semua
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Kuis Interaktif{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Untuk Semua
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Platform kuis open source — gratis selamanya, tanpa batas, tanpa
                kartu kredit. Dibangun oleh komunitas, untuk komunitas.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-8 py-6 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-200 group"
              >
                Mulai Sekarang — Gratis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-gray-300 hover:border-emerald-600 hover:text-emerald-700 text-gray-900 rounded-lg px-8 py-6 text-lg font-semibold transition-all duration-300 gap-2"
                >
                  <GiftIcon className="w-5 h-5" />
                  Lihat di GitHub
                </Button>
              </a>
            </div>

            {/* GitHub Stats */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                <span className="font-semibold">2.4k Stars</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                <GitFork className="w-4 h-4 text-gray-500" />
                <span className="font-semibold">430 Forks</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">Aktif Dikembangkan</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-6 border-t border-gray-200">
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
                <p className="text-2xl font-bold text-gray-900">MIT</p>
                <p className="text-sm text-gray-600">Lisensi</p>
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

      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-emerald-100 rounded-full opacity-30 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-teal-100 rounded-full opacity-20 blur-3xl animate-pulse" />
    </section>
  );
}