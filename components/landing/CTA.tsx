import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

/**
 * CTA Section - Modern Minimalist Design
 * Features: Gradient background, dual CTA buttons, smooth animations
 * Typography: Poppins Bold for heading, Inter Regular for body
 */

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400" />

      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Siap untuk Mengubah Cara Anda Mengajar?
          </h2>

          {/* Description */}
          <p className="text-xl text-blue-50 leading-relaxed">
            Bergabunglah dengan ribuan guru dan siswa yang telah merasakan
            manfaat platform kuis interaktif kami. Mulai gratis hari ini tanpa
            perlu kartu kredit.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-blue-600 rounded-lg px-8 py-6 text-lg font-semibold transition-all duration-300 hover:shadow-xl group"
            >
              Mulai Gratis Sekarang
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white hover:bg-white/10 text-white rounded-lg px-8 py-6 text-lg font-semibold transition-all duration-300"
            >
              <Mail className="mr-2 w-5 h-5" />
              Hubungi Sales
            </Button>
          </div>

          {/* Trust Text */}
          <div className="pt-8 border-t border-white/30">
            <p className="text-blue-50 text-sm">
              ✓ Tidak perlu kartu kredit • ✓ Akses penuh ke semua fitur • ✓
              Dukungan gratis 24/7
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
