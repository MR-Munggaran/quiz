import {
  BarChart3,
  Zap,
  Users,
  Lock,
  Clock,
  FileText,
  GiftIcon,
  Heart,
} from "lucide-react";

/**
 * Features Section - Open Source Community Theme
 * Emerald/teal palette, community and open source messaging
 */

const features = [
  {
    icon: FileText,
    title: "Latihan Soal LPDP",
    description:
      "Kumpulan soal latihan untuk persiapan LPDP, mulai dari TPA, logika, hingga pemahaman bacaan.",
    color: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Clock,
    title: "Simulasi Waktu Asli",
    description:
      "Latihan dengan timer seperti ujian sebenarnya, biar kamu terbiasa dan lebih siap saat hari H.",
    color: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    icon: BarChart3,
    title: "Progress Belajar",
    description:
      "Pantau perkembangan kamu setiap hari. Sedikit demi sedikit, tapi pasti naik.",
    color: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    icon: Zap,
    title: "Latihan Cepat",
    description:
      "Mode latihan singkat buat kamu yang lagi capek tapi tetap mau belajar sedikit hari ini.",
    color: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    icon: Heart,
    title: "Support System 💖",
    description:
      "Selalu ada pesan kecil dan semangat buat kamu setiap kali kamu belajar. Kamu nggak sendirian.",
    color: "bg-rose-100",
    iconColor: "text-rose-500",
  },
  {
    icon: Lock,
    title: "Fokus Tanpa Gangguan",
    description:
      "Belajar dengan tenang tanpa distraksi. Fokus kamu cuma satu: lolos LPDP.",
    color: "bg-slate-100",
    iconColor: "text-slate-700",
  },
];

export default function Features() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663579753178/Yx8gLBghxxtqZrjjXo6MhL/features-bg-cSVz9VQCGAUGRqNzsN8twd.webp')",
          backgroundSize: "400px 400px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
            <GiftIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">For Fitri 🎓</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Fitur yang Aku Buat untuk Kamu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Semua ini aku buat supaya kamu lebih siap, lebih tenang, 
              dan lebih percaya diri menghadapi LPDP.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group animate-in fade-in slide-in-from-bottom-4 duration-700 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-full p-8 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 transition-all duration-300">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Indicator */}
                  <div className="mt-4 h-1 w-0 bg-gradient-to-r from-emerald-600 to-teal-400 group-hover:w-full transition-all duration-300 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-40 -right-20 w-40 h-40 bg-emerald-100 rounded-full opacity-20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-50 rounded-full opacity-30 blur-3xl" />
    </section>
  );
}