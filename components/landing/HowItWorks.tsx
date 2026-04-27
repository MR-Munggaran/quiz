import { CheckCircle2 } from "lucide-react";

/**
 * How It Works Section - Modern Minimalist Design
 * Features: Step-by-step flow, asymmetric layout, smooth animations
 * Typography: Poppins Bold for headings, Inter Regular for descriptions
 */

const steps = [
  {
    number: "01",
    title: "Buat Akun",
    description:
      "Daftar gratis dan buat akun Anda dalam hitungan detik. Tidak perlu kartu kredit.",
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
    title: "Bagikan Kuis",
    description:
      "Bagikan dengan siswa melalui link, kode unik, atau integrasi langsung dengan learning management system Anda.",
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
    <section className="relative py-24 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Cara Kerja Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empat langkah sederhana untuk memulai membuat kuis interaktif yang
            engaging.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div
                  className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  {/* Step Number */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="text-5xl font-bold text-blue-100">
                        {step.number}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 h-1 bg-gradient-to-r from-blue-600 to-transparent" />
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold text-gray-900">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 pt-4">
                    <li className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      Antarmuka yang user-friendly
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      Dukungan 24/7 dari tim kami
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      Integrasi dengan platform populer
                    </li>
                  </ul>
                </div>

                {/* Image */}
                <div
                  className={`relative h-80 lg:h-96 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl" />
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
                  <div className="w-1 h-12 bg-gradient-to-b from-blue-600 to-blue-200 rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-100 rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-blue-100 rounded-full opacity-10 blur-3xl" />
    </section>
  );
}
