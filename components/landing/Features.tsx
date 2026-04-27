import {
  BarChart3,
  Zap,
  Users,
  Lock,
  Clock,
  FileText,
} from "lucide-react";

/**
 * Features Section - Modern Minimalist Design
 * Features: Grid layout with floating cards, icon highlights, smooth animations
 * Typography: Poppins Bold for headings, Inter Regular for descriptions
 */

const features = [
  {
    icon: FileText,
    title: "Buat Kuis Mudah",
    description:
      "Interface yang intuitif memudahkan Anda membuat kuis berkualitas tinggi dalam hitungan menit.",
    color: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Users,
    title: "Bagikan dengan Mudah",
    description:
      "Bagikan kuis kepada siswa melalui link atau kode unik. Kelola peserta dengan dashboard yang jelas.",
    color: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: BarChart3,
    title: "Analitik Mendalam",
    description:
      "Dapatkan insight lengkap tentang performa siswa dengan visualisasi data yang komprehensif.",
    color: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Clock,
    title: "Waktu Terbatas",
    description:
      "Atur durasi kuis dan batas waktu untuk setiap pertanyaan. Monitoring real-time untuk setiap peserta.",
    color: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    icon: Lock,
    title: "Keamanan Terjamin",
    description:
      "Data siswa dilindungi dengan enkripsi tingkat enterprise dan compliance standar internasional.",
    color: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    icon: Zap,
    title: "Performa Cepat",
    description:
      "Platform yang dioptimalkan untuk kecepatan tinggi dengan uptime 99.9% sepanjang tahun.",
    color: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
];

export default function Features() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-30"
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
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Fitur Unggulan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Semua yang Anda butuhkan untuk membuat pengalaman pembelajaran yang
            interaktif dan efektif.
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
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="h-full p-8 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 transition-all duration-300">
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
                  <div className="mt-4 h-1 w-0 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-full transition-all duration-300 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-40 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-50 rounded-full opacity-20 blur-3xl" />
    </section>
  );
}

