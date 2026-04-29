"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Lock } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Mulai dari Hari Ini",
    description: "Mulai pelan-pelan, satu langkah kecil tetap berarti.",
    message: "Yang penting mulai dulu ya, aku selalu dukung kamu 💖",
  },
  {
    number: 2,
    title: "Latihan Soal",
    description: "Biasakan diri dengan pola soal LPDP.",
    message: "Semangat ya belajarnya, kamu pasti bisa!",
  },
  {
    number: 3,
    title: "Konsisten",
    description: "Sedikit tapi rutin lebih baik.",
    message: "Jangan nyerah ya, kamu udah sejauh ini 💪",
  },
  {
    number: 4,
    title: "Finish Line",
    description: "Saatnya kamu sampai di tujuan.",
    message: "Aku bangga banget sama kamu 💖",
  },
];

export default function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(1);

  // Load dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("fitri-progress");
    if (saved) setCurrentStep(Number(saved));
  }, []);

  // Save ke localStorage
  useEffect(() => {
    localStorage.setItem("fitri-progress", currentStep.toString());
  }, [currentStep]);

  const completeStep = (step: number) => {
    if (step === currentStep && step < 5) {
      setCurrentStep(step + 1);
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Perjalanan Kamu ke LPDP 🎓
          </h2>
          <p className="text-gray-600">
            Pelan-pelan ya, aku di sini nemenin kamu.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step) => {
            const isDone = step.number < currentStep;
            const isActive = step.number === currentStep;
            const isLocked = step.number > currentStep;

            return (
              <div
                key={step.number}
                className={`p-6 rounded-2xl border transition-all ${
                  isDone
                    ? "bg-emerald-50 border-emerald-200"
                    : isActive
                    ? "bg-white border-pink-300 shadow-md"
                    : "bg-gray-50 border-gray-200 opacity-70"
                }`}
              >
                <div className="flex items-start gap-4">
                  
                  {/* Icon */}
                  <div>
                    {isDone ? (
                      <CheckCircle2 className="text-emerald-500 w-6 h-6" />
                    ) : isLocked ? (
                      <Lock className="text-gray-400 w-6 h-6" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-pink-500 animate-pulse" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">
                      {step.number}. {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>

                    {/* Message */}
                    {isActive && (
                      <p className="mt-2 text-pink-500 text-sm font-medium">
                        {step.message}
                      </p>
                    )}

                    {/* Button */}
                    {isActive && (
                      <button
                        onClick={() => completeStep(step.number)}
                        className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg text-sm hover:bg-pink-600"
                      >
                        Selesaiin Step Ini
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ending */}
        {currentStep === 5 && (
          <div className="mt-12 text-center p-8 rounded-2xl bg-pink-50 border border-pink-200 animate-in fade-in">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Fitri, you made it. 🎓💖
            </h3>
            <p className="text-gray-600">
              Aku bener-bener bangga sama kamu. Semua usaha kamu nggak sia-sia.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}