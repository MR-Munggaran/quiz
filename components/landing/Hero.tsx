"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Star, GiftIcon } from "lucide-react";
import { useState } from "react";

/**
 * Hero Section - Special for Fitri 💖
 */
export default function Hero() {
  const [openMain, setOpenMain] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
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
          opacity: 0.25,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80 z-1" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              <span className="text-sm font-medium text-pink-600">
                Dibuat khusus untuk Fitri 💖
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Semangat ya{" "}
                <span className="bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-transparent">
                  Fitri
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Aku tau kamu lagi berjuang buat LPDP.  
                Website ini aku buat biar kamu punya tempat buat latihan,  
                pelan-pelan tapi pasti menuju tujuan kamu 🎓
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => setOpenMain(true)}
                size="lg"
                className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg px-8 py-6 text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-pink-200 group"
              >
                Mulai Latihan Hari Ini
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                onClick={() => setOpenMessage(true)}
                variant="outline"
                size="lg"
                className="w-[30%] border-2 border-gray-300 hover:border-pink-400 hover:text-pink-500 text-gray-900 rounded-lg px-8 py-6 text-lg font-semibold transition-all duration-300 gap-2"
              >
                Pesan dari Aku
              </Button>
            </div>

            {/* Overlay */}
              {openMain && (
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Hai Fitri 💖
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Aku tau proses ini nggak mudah.  
                    Ada capeknya, ada ragu juga kadang.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Tapi aku percaya sama kamu.  
                    Kamu lebih kuat dari yang kamu kira.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Nggak harus langsung sempurna,  
                    yang penting kamu tetap jalan.
                  </p>
                  <p className="text-pink-500 font-semibold">
                    Aku di sini, dukung kamu terus 💖
                  </p>
                </div>
              )}

              {openMessage && (
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Pesan Kecil ✨
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Kalau hari ini capek, nggak apa-apa istirahat sebentar.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Tapi jangan berhenti ya.  
                    Mimpi kamu terlalu berharga untuk ditinggalin.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Aku bakal selalu bangga sama kamu,  
                    bahkan dari usaha kecil yang kamu lakuin hari ini.
                  </p>
                  <p className="text-pink-500 font-semibold">
                    Semangat terus ya 💖
                  </p>
                </div>
              )}

              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
                  <span className="font-semibold">Target: LPDP 🎓</span>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                  <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                  <span className="font-semibold">Full Support</span>
                </div>

                <div className="flex items-center gap-1.5 text-sm text-pink-600 bg-pink-50 px-3 py-1.5 rounded-full border border-pink-200">
                  <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                  <span className="font-semibold">Keep Going</span>
                </div>
              </div>

            {/* “Trust” versi hubungan 😄 */}
              <div className="flex items-center gap-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-2xl font-bold text-gray-900">Sedikit Demi Sedikit</p>
                  <p className="text-sm text-gray-600">Yang Penting Konsisten</p>
                </div>
                <div className="w-px h-12 bg-gray-300" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">Nggak Harus Sempurna</p>
                  <p className="text-sm text-gray-600">Yang Penting Jalan</p>
                </div>
                <div className="w-px h-12 bg-gray-300" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">Aku Percaya</p>
                  <p className="text-sm text-gray-600">Kamu Bisa 💖</p>
                </div>
              </div>
          </div>

          {/* Right */}
          <div className="relative h-96 lg:h-full animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663579753178/Yx8gLBghxxtqZrjjXo6MhL/illustration-quiz-NCbJccRm3sCWmMMZnsPUgt.webp"
              alt="For Fitri"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Floating */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-pink-100 rounded-full opacity-30 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-rose-100 rounded-full opacity-20 blur-3xl animate-pulse" />
    </section>
  );
}