"use client";
import React from "react";
import Image from "next/image";

interface BookingStep {
  id: number;
  stepNumber: string;
  title: string;
  description?: string;
  image: string;
}

export const HowToBookSection = () => {
  const steps: BookingStep[] = [
    {
      id: 1,
      stepNumber: "01",
      title: "افتح التطبيق",
      image: "/images/step-1.png", // Replace with actual image
    },
    {
      id: 2,
      stepNumber: "02",
      title: "اختر وجهة السفر وتاريخ الرحلة",
      image: "/images/step-2.png", // Replace with actual image
    },
    {
      id: 3,
      stepNumber: "03",
      title: "اختر المقعد المناسب",
      image: "/images/step-3.png", // Replace with actual image
    },
    {
      id: 4,
      stepNumber: "04",
      title: "ادفع بالطريقة التي تناسبك",
      image: "/images/step-4.png", // Replace with actual image
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            احجز تذكرتك في 4 خطوات بس 🎟️{" "}
          </h2>

          <p className="text-gray-700 text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
            اختر وسيلة السفر، حدد وجهتك ووموعدك، وادفع إلكترونيًا — وخلاص،
            تذكرتك جاهزة! كل هذا من مكانك بضغطة واحدة على تطبيق ودينى
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col">
              {/* Step Card */}
              <div className="bg-white rounded-[28px] p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center mb-6">
                {/* Step Number Badge */}
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
                  {step.stepNumber}
                </div>

                {/* Step Title */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>

                {/* Mobile Screenshot */}
                <div className="relative w-full max-w-[200px] h-[350px] md:h-[400px] mx-auto">
                  <div className="relative w-full h-full rounded-[28px] overflow-hidden shadow-lg">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
