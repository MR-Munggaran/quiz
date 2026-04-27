"use client";

import { useState } from "react";
import {
  GitBranchIcon,
  MessageCircle,
  RadioTowerIcon,
  Star,
  GitFork,
  GitPullRequest,
  Bug,
  Heart,
  Users,
  Globe,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Award,
  Zap,
} from "lucide-react";

/**
 * Community Page - Open Source Theme
 * Emerald/teal palette, GitHub-inspired, warm & welcoming
 */

const contributors = [
  { name: "Arif Hidayat", role: "Core Maintainer", commits: 342, avatar: "AH", color: "bg-emerald-500" },
  { name: "Siti Rahayu", role: "Frontend Dev", commits: 218, avatar: "SR", color: "bg-teal-500" },
  { name: "Budi Santoso", role: "Backend Dev", commits: 195, avatar: "BS", color: "bg-cyan-500" },
  { name: "Dewi Lestari", role: "UI/UX Designer", commits: 134, avatar: "DL", color: "bg-emerald-400" },
  { name: "Rizky Pratama", role: "DevOps", commits: 98, avatar: "RP", color: "bg-teal-400" },
  { name: "Nurul Fikri", role: "Contributor", commits: 76, avatar: "NF", color: "bg-green-500" },
  { name: "Hendra Wijaya", role: "Contributor", commits: 64, avatar: "HW", color: "bg-cyan-400" },
  { name: "Anda?", role: "Contributor Baru", commits: 0, avatar: "?", color: "bg-gray-400" },
];

const stats = [
  { icon: Star, label: "GitHub Stars", value: "2.4k", color: "text-yellow-500" },
  { icon: GitFork, label: "Forks", value: "430", color: "text-emerald-500" },
  { icon: Users, label: "Kontributor", value: "87", color: "text-teal-500" },
  { icon: Globe, label: "Pengguna Aktif", value: "10K+", color: "text-cyan-500" },
];

const channels = [
  {
    icon: GitFork,
    name: "GitHub",
    description: "Lihat kode sumber, laporkan bug, dan buka pull request.",
    link: "https://github.com",
    label: "Kunjungi GitHub",
    color: "bg-gray-900 hover:bg-gray-800 text-white",
    badge: "Open Source",
  },
  {
    icon: MessageCircle,
    name: "Discord",
    description: "Bergabung ke server Discord kami untuk diskusi real-time dengan komunitas.",
    link: "#",
    label: "Gabung Discord",
    color: "bg-indigo-600 hover:bg-indigo-700 text-white",
    badge: "1.2k Members",
  },
  {
    icon: RadioTowerIcon,
    name: "RadioTowerIcon / X",
    description: "Ikuti update terbaru, rilis fitur, dan pengumuman dari tim kami.",
    link: "#",
    label: "Follow @QuizOpen",
    color: "bg-sky-500 hover:bg-sky-600 text-white",
    badge: "3.1k Followers",
  },
  {
    icon: BookOpen,
    name: "Dokumentasi",
    description: "Panduan lengkap untuk penggunaan, instalasi, dan kontribusi ke proyek.",
    link: "#",
    label: "Baca Docs",
    color: "bg-emerald-600 hover:bg-emerald-700 text-white",
    badge: "Selalu Update",
  },
];

const ways = [
  { icon: Bug, title: "Laporkan Bug", desc: "Temukan masalah? Buka issue di GitHub kami.", href: "#" },
  { icon: GitPullRequest, title: "Kirim Pull Request", desc: "Punya perbaikan atau fitur baru? PR selalu disambut!", href: "#" },
  { icon: BookOpen, title: "Perbaiki Dokumentasi", desc: "Bantu kami membuat dokumentasi lebih jelas dan lengkap.", href: "#" },
  { icon: Heart, title: "Sebarkan Semangat", desc: "Star repo kami dan ceritakan ke teman-teman guru dan siswa.", href: "#" },
];

export default function CommunityPage() {
  const [hoveredContrib, setHoveredContrib] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full opacity-40 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-100 rounded-full opacity-30 blur-3xl" />
          {/* Dot grid */}
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
            <Heart className="w-4 h-4 text-emerald-600 fill-emerald-500" />
            <span className="text-sm font-semibold text-emerald-700">Dibangun oleh Komunitas</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Bersama Kita Lebih{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Kuat
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
            QuizOpen adalah proyek open source yang hidup dari kontribusi komunitas.
            Setiap baris kode, setiap laporan bug, setiap ide — semuanya berarti bagi kami.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-colors shadow-sm"
            >
              <GitBranchIcon className="w-5 h-5" />
              Star di GitHub
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
            >
              <MessageCircle className="w-5 h-5" />
              Gabung Discord
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-100 bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-2 text-center">
                  <Icon className={`w-6 h-6 ${s.color}`} />
                  <p className="text-3xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-sm text-gray-500">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Hall of Fame</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Kontributor Kami</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Terima kasih kepada semua orang yang telah meluangkan waktu dan tenaga untuk proyek ini.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {contributors.map((c, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300 text-center cursor-pointer bg-white"
                onMouseEnter={() => setHoveredContrib(i)}
                onMouseLeave={() => setHoveredContrib(null)}
              >
                {/* Avatar */}
                <div
                  className={`w-14 h-14 rounded-full ${c.color} flex items-center justify-center text-white font-bold text-lg mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  {c.avatar}
                </div>
                <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{c.role}</p>
                {c.commits > 0 && (
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">
                    <Zap className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-700">{c.commits} commits</span>
                  </div>
                )}
                {c.commits === 0 && (
                  <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-50 border border-gray-200">
                    <span className="text-xs text-gray-500">Bergabung?</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
            >
              Lihat semua kontributor di GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Community Channels */}
      <section className="py-24 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Temukan Kami di Sini</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Bergabunglah ke saluran komunitas kami dan jadilah bagian dari percakapan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {channels.map((ch, i) => {
              const Icon = ch.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-md hover:border-emerald-200 transition-all duration-300 flex flex-col gap-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{ch.name}</p>
                        <span className="text-xs text-emerald-600 font-semibold">{ch.badge}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{ch.description}</p>
                  <a
                    href={ch.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${ch.color}`}
                  >
                    {ch.label}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ways to Contribute */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
              <GitPullRequest className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Kontribusi</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Cara Berkontribusi</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Tidak perlu jadi developer handal. Ada banyak cara untuk membantu proyek ini berkembang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {ways.map((w, i) => {
              const Icon = w.icon;
              return (
                <a
                  key={i}
                  href={w.href}
                  className="group flex items-start gap-4 p-6 rounded-2xl border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all duration-300 bg-white"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                    <Icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">{w.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{w.desc}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Siap Bergabung dengan Komunitas?
          </h2>
          <p className="text-emerald-50 text-lg mb-8 max-w-xl mx-auto">
            Mulai dari yang kecil. Satu issue, satu PR, satu bintang di GitHub — semuanya berarti bagi kami.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-emerald-700 font-bold rounded-lg transition-colors shadow-lg text-lg"
          >
            <GitBranchIcon className="w-5 h-5" />
            Mulai Kontribusi
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}