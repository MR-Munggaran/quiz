"use client";

import { useState } from "react";
import {
  ChevronDown,
  GiftIcon,
  MessageCircle,
  Search,
  BookOpen,
  Zap,
  Lock,
  Globe,
  Heart,
  ArrowRight,
} from "lucide-react";

/**
 * FAQ Page - Open Source Theme
 * Emerald/teal palette, searchable accordion FAQ
 */

const categories = [
  { id: "umum", label: "Umum", icon: Globe },
  { id: "fitur", label: "Fitur", icon: Zap },
  { id: "opensource", label: "Open Source", icon: GiftIcon },
  { id: "privasi", label: "Privasi & Keamanan", icon: Lock },
];

const faqs = [
  // Umum
  {
    category: "umum",
    question: "Apakah QuizOpen benar-benar gratis?",
    answer:
      "Ya, 100% gratis selamanya. QuizOpen adalah proyek open source yang dirilis di bawah lisensi MIT. Tidak ada paket berbayar, tidak ada fitur tersembunyi di balik paywall, dan tidak ada kartu kredit yang dibutuhkan. Semua fitur tersedia untuk semua pengguna tanpa batas.",
  },
  {
    category: "umum",
    question: "Siapa yang bisa menggunakan QuizOpen?",
    answer:
      "Siapa saja! QuizOpen dirancang untuk guru, siswa, trainer perusahaan, komunitas belajar, bahkan individu yang ingin membuat kuis untuk kesenangan. Tidak ada batasan siapa yang boleh mendaftar dan menggunakan platform ini.",
  },
  {
    category: "umum",
    question: "Apakah ada batasan jumlah kuis atau peserta?",
    answer:
      "Tidak ada batasan. Anda bisa membuat kuis sebanyak yang Anda mau dan mengundang peserta sebanyak yang dibutuhkan. Karena open source, kami tidak punya alasan untuk membatasi penggunaan Anda.",
  },
  {
    category: "umum",
    question: "Apakah QuizOpen tersedia dalam Bahasa Indonesia?",
    answer:
      "Ya! Platform kami tersedia dalam Bahasa Indonesia dan terus kami kembangkan. Komunitas kami juga aktif menerjemahkan antarmuka ke berbagai bahasa daerah. Anda bisa berkontribusi dalam penerjemahan melalui repositori GitHub kami.",
  },
  // Fitur
  {
    category: "fitur",
    question: "Tipe pertanyaan apa saja yang tersedia?",
    answer:
      "QuizOpen mendukung berbagai tipe pertanyaan: pilihan ganda (single & multiple answer), essay terbuka, benar/salah, menjodohkan (matching), mengisi titik-titik, dan mengurutkan. Kami terus menambahkan tipe pertanyaan baru berdasarkan request komunitas.",
  },
  {
    category: "fitur",
    question: "Apakah bisa menambahkan gambar atau video ke pertanyaan?",
    answer:
      "Ya, Anda bisa melampirkan gambar ke pertanyaan maupun ke pilihan jawaban. Dukungan untuk video dan audio juga sedang dalam pengembangan aktif oleh tim komunitas kami. Pantau progress-nya di GitHub Issues.",
  },
  {
    category: "fitur",
    question: "Bagaimana cara membagikan kuis kepada siswa?",
    answer:
      "Ada beberapa cara: (1) Salin dan bagikan link unik kuis, (2) Tampilkan kode 6-digit yang bisa dimasukkan siswa di halaman join, atau (3) Embed kuis langsung di website atau LMS Anda menggunakan snippet HTML yang kami sediakan.",
  },
  {
    category: "fitur",
    question: "Apakah ada fitur analitik dan laporan?",
    answer:
      "Ya! Dashboard analitik kami menampilkan skor per siswa, rata-rata nilai kelas, distribusi jawaban per soal, waktu pengerjaan, dan tren performa dari waktu ke waktu. Semua laporan bisa diunduh dalam format CSV atau PDF.",
  },
  {
    category: "fitur",
    question: "Apakah bisa mengatur waktu untuk kuis?",
    answer:
      "Bisa. Anda bisa mengatur durasi total kuis (misalnya 60 menit) maupun batas waktu per soal. Ada juga opsi untuk menampilkan countdown timer kepada peserta agar mereka sadar waktu yang tersisa.",
  },
  // Open Source
  {
    category: "opensource",
    question: "Di mana saya bisa melihat kode sumbernya?",
    answer:
      "Seluruh kode sumber QuizOpen tersedia di GitHub. Anda bisa mengaksesnya di github.com/quizopen. Repositori kami mencakup frontend (Next.js), backend (Node.js), dan dokumentasi lengkap untuk setup lokal maupun deployment.",
  },
  {
    category: "opensource",
    question: "Lisensi apa yang digunakan QuizOpen?",
    answer:
      "QuizOpen menggunakan lisensi MIT, salah satu lisensi open source paling permisif. Ini berarti Anda bebas menggunakan, menyalin, memodifikasi, menggabungkan, mempublikasikan, mendistribusikan, dan bahkan menjual salinan software ini — selama menyertakan kredit ke proyek asli.",
  },
  {
    category: "opensource",
    question: "Bagaimana cara berkontribusi ke proyek ini?",
    answer:
      "Kami menyambut semua jenis kontribusi! Mulai dari melaporkan bug, memperbaiki dokumentasi, menerjemahkan antarmuka, hingga mengirim pull request kode. Baca panduan kontribusi kami di CONTRIBUTING.md di repositori GitHub untuk memulai. Tidak perlu pengalaman open source sebelumnya!",
  },
  {
    category: "opensource",
    question: "Bisakah saya deploy QuizOpen di server sendiri?",
    answer:
      "Tentu! Self-hosting adalah salah satu keunggulan open source. Dokumentasi deployment kami mencakup cara setup di berbagai lingkungan: Docker, VPS, Railway, Vercel, hingga on-premise. Data Anda sepenuhnya di bawah kendali Anda.",
  },
  // Privasi
  {
    category: "privasi",
    question: "Bagaimana QuizOpen mengelola data pengguna?",
    answer:
      "Kami hanya mengumpulkan data yang benar-benar dibutuhkan untuk menjalankan layanan. Data tidak dijual ke pihak ketiga manapun, tidak digunakan untuk iklan, dan Anda bisa meminta penghapusan akun beserta semua data Anda kapan saja.",
  },
  {
    category: "privasi",
    question: "Apakah data siswa aman?",
    answer:
      "Keamanan data siswa adalah prioritas kami. Semua data dienkripsi saat transit (HTTPS/TLS) dan saat disimpan. Kami tidak menyimpan data sensitif yang tidak perlu. Karena kode sumber terbuka, siapa pun bisa mengaudit praktik keamanan kami.",
  },
  {
    category: "privasi",
    question: "Apakah QuizOpen menggunakan cookie atau pelacak?",
    answer:
      "Kami menggunakan cookie sesi yang diperlukan untuk login dan keamanan. Kami tidak menggunakan cookie iklan atau pelacak analitik pihak ketiga. Untuk analitik internal, kami menggunakan solusi self-hosted yang data-nya tidak keluar dari server kami.",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("umum");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = faqs.filter((faq) => {
    const matchCat = faq.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return searchQuery ? matchSearch : matchCat;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-100 rounded-full opacity-40 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-100 rounded-full opacity-30 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, #10b981 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 mb-6">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">Pusat Bantuan</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Pertanyaan yang{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Sering Ditanya
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Temukan jawaban atas pertanyaan umum tentang QuizOpen. Tidak menemukan jawabannya? Tanya di Discord kami!
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent shadow-sm text-base transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-medium"
              >
                Hapus
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Category Tabs — hidden when searching */}
          {!searchQuery && (
            <div className="flex flex-wrap gap-3 mb-10 justify-center">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const active = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setOpenIndex(null);
                    }}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border transition-all duration-200 ${
                      active
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Search results label */}
          {searchQuery && (
            <p className="text-sm text-gray-500 mb-6 text-center">
              Menampilkan{" "}
              <span className="font-semibold text-gray-900">{filtered.length} hasil</span> untuk "
              <span className="text-emerald-600">{searchQuery}</span>"
            </p>
          )}

          {/* Accordion */}
          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-emerald-300 shadow-sm bg-white"
                        : "border-gray-100 bg-white hover:border-emerald-200"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 p-6 text-left"
                    >
                      <span
                        className={`font-semibold text-base leading-snug transition-colors ${
                          isOpen ? "text-emerald-700" : "text-gray-900"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-emerald-500" : ""
                        }`}
                      />
                    </button>

                    {/* Answer */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <div className="h-px bg-emerald-100 mb-4" />
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-gray-400" />
              </div>
              <p className="text-gray-900 font-semibold text-lg mb-2">Tidak ditemukan hasil</p>
              <p className="text-gray-500 text-sm">Coba kata kunci lain atau tanya langsung di Discord kami.</p>
            </div>
          )}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-16 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Heart className="w-7 h-7 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Masih punya pertanyaan?</h2>
            <p className="text-gray-600 mb-8">
              Komunitas kami ramah dan siap membantu. Bergabunglah ke Discord atau buka diskusi di GitHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Tanya di Discord
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors"
              >
                <GiftIcon className="w-5 h-5" />
                Buka Issue di GitHub
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}