import { CheckCircle2 } from "lucide-react";

/**
 * How It Works Section - Open Source Community Theme
 * Emerald/teal palette, community-focused steps
 */

const steps = [
  {
    number: "01",
    title: "Daftar Gratis",
    description:
      "Buat akun dalam hitungan detik — tanpa kartu kredit, tanpa biaya tersembunyi. Gratis selamanya untuk semua pengguna.",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663579753178/Yx8gLBghxxtqZrjjXo6MhL/illustration-quiz-NCbJccRm3sCWmMMZnsPUgt.webp",
  },
  {
    number: "02",
    title: "Desain Kuis",
    description:
      "Buat kuis dengan berbagai tipe pertanyaan: pilihan ganda, essay, matching, dan lebih banyak lagi.",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663579753178/Yx8gLBghxxtqZrjjXo6MhL/illustration-quiz-NCbJccRm3sCWmMMZnsPUgt.webp",
  },
  {
    number: "03",
    title: "Bagikan kepada Siapa Saja",
    description:
      "Bagikan dengan siswa melalui link atau kode unik. Tanpa batasan jumlah peserta — semua orang bisa ikut.",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663579753178/Yx8gLBghxxtqZrjjXo6MhL/illustration-quiz-NCbJccRm3sCWmMMZnsPUgt.webp",
  },
  {
    number: "04",
    title: "Analisis Hasil",
    description:
      "Lihat hasil secara real-time dengan analitik mendalam dan laporan komprehensif untuk setiap siswa.",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663579753178/Yx8gLBghxxtqZrjjXo6MhL/illustration-success-bbfbar3bPZLewqFFbiNgSL.webp",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-emerald-50 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Cara Kerja Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empat langkah mudah untuk mulai membuat kuis interaktif — gratis tanpa batas.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  {/* Step Number */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="text-5xl font-bold text-emerald-100">
                        {step.number}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      </div>
                    </div>
                    <div className="flex-1 h-1 bg-gradient-to-r from-emerald-600 to-transparent" />
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>

                  {/* Description */}
                  <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>

                  {/* Features List */}
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      Antarmuka yang user-friendly
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      Komunitas aktif siap membantu
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      Integrasi dengan platform populer
                    </li>
                  </ul>
                </div>

                {/* Image */}
                <div className={`relative h-80 lg:h-96 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-50 rounded-2xl" />
                  <img
                    src={step.image}
                    alt={step.title}
                    className="relative w-full h-full object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>

              {/* Divider */}
              {index < steps.length - 1 && (
                <div className="mt-20 flex justify-center">
                  <div className="w-1 h-12 bg-gradient-to-b from-emerald-500 to-emerald-200 rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-emerald-100 rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-teal-100 rounded-full opacity-10 blur-3xl" />
    </section>
  );
}