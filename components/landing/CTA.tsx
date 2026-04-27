import { Button } from "@/components/ui/button";
import { ArrowRight, GiftIcon, Heart } from "lucide-react";

/**
 * CTA Section - Open Source Community Theme
 * Emerald gradient, community-focused messaging, free forever
 */

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400" />

      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm">
            <Heart className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-semibold text-white">Gratis Selamanya — Janji Komunitas</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Bergabung dengan Komunitas Kami Hari Ini
          </h2>

          {/* Description */}
          <p className="text-xl text-emerald-50 leading-relaxed">
            Tidak perlu mendaftar dengan kartu kredit. Tidak ada fitur premium tersembunyi.
            Platform ini milik komunitas — dibuat bersama, untuk semua orang.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-emerald-700 rounded-lg px-8 py-6 text-lg font-semibold transition-all duration-300 hover:shadow-xl group"
            >
              Mulai Gratis Sekarang
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-2 border-white hover:bg-white/10 text-white rounded-lg px-8 py-6 text-lg font-semibold transition-all duration-300 gap-2"
              >
                <GiftIcon className="w-5 h-5" />
                Kontribusi di GitHub
              </Button>
            </a>
          </div>

          {/* Trust Text */}
          <div className="pt-8 border-t border-white/30">
            <p className="text-emerald-50 text-sm">
              ✓ Open Source (MIT License) • ✓ Tidak ada kartu kredit • ✓ Deploy sendiri kapan saja
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}