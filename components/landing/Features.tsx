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
    title: "Buat Kuis Mudah",
    description:
      "Interface yang intuitif memudahkan siapa saja membuat kuis berkualitas tinggi dalam hitungan menit.",
    color: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Users,
    title: "Bagikan dengan Mudah",
    description:
      "Bagikan kuis kepada siapa saja melalui link atau kode unik — tanpa batas pengguna, selamanya gratis.",
    color: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    icon: BarChart3,
    title: "Analitik Mendalam",
    description:
      "Dapatkan insight lengkap tentang performa siswa dengan visualisasi data yang komprehensif.",
    color: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    icon: Clock,
    title: "Waktu Terbatas",
    description:
      "Atur durasi kuis dan batas waktu untuk setiap pertanyaan. Monitoring real-time untuk setiap peserta.",
    color: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: GiftIcon,
    title: "Kode Terbuka",
    description:
      "Seluruh kode sumber tersedia di GitHub. Kontribusi, fork, atau deploy sendiri di server Anda.",
    color: "bg-slate-100",
    iconColor: "text-slate-700",
  },
  {
    icon: Heart,
    title: "Dibangun Komunitas",
    description:
      "Didukung oleh ratusan kontributor di seluruh dunia. Bersama kita bangun platform pendidikan terbaik.",
    color: "bg-rose-100",
    iconColor: "text-rose-500",
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
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Open Source</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Fitur Lengkap, Gratis Selamanya
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Semua fitur tersedia untuk semua orang — tidak ada paket berbayar, tidak ada batasan tersembunyi.
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