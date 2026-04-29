"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, GiftIcon } from "lucide-react";

/**
 * CTA Section - For Fitri 💖
 */

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-400 to-orange-300" />

      {/* Soft Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm">
            <Heart className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-semibold text-white">
              Untuk Fitri yang Lagi Berjuang 🎓
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Kamu Pasti Bisa 💖
          </h2>

          {/* Description */}
          <p className="text-xl text-rose-50 leading-relaxed">
            Aku tau ini nggak mudah. Tapi kamu nggak sendiri.  
            Pelan-pelan aja, yang penting tetap jalan.  
            Aku selalu ada di sini, dukung kamu sampai kamu berhasil.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-pink-600 rounded-lg px-8 py-6 text-lg font-semibold transition-all duration-300 hover:shadow-xl group"
            >
              Lanjut Belajar Hari Ini
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full border-2 border-white hover:bg-white/10 text-white rounded-lg px-8 py-6 text-lg font-semibold transition-all duration-300 gap-2"
            >
              <GiftIcon className="w-5 h-5" />
              Baca Pesan dari Aku
            </Button>
          </div>

          {/* Trust / Emotional Closing */}
          <div className="pt-8 border-t border-white/30">
            <p className="text-rose-50 text-sm">
              ✓ Nggak harus sempurna • ✓ Yang penting konsisten • ✓ Aku bangga sama kamu 💖
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}