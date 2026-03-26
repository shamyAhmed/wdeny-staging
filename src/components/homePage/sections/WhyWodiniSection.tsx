"use client";
import React, { useRef } from "react";
import { Button } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";

interface WhyWodiniSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

export const WhyWodiniSection = () => {
  const swiperRef = useRef<SwiperType>();

  const slides: WhyWodiniSlide[] = [
    {
      id: 1,
      title: "كل وسائل السفر في مكان واحد",
      description:
        "جميعنا لكل كل وسائل السفر في مكان واحد. عشان يوفر عليك الوقت والجهد بختيار الرحلة اللي تناسب بكل سهولة سواء كنت رايح دوامك، مسافر برّا، في محطة رحلة طويلة. ودينى هي رفيقك اللي ينظم رحلتك من أول اختيار وسيلة النقل لين توصل وجهتك بكل راحة وأمان",
      image: "/photos/why-wadiny.png",
      buttonText: "إستكشف",
      buttonLink: "/explore",
    },
    {
      id: 2,
      title: "خدمة عملاء متميزة على مدار الساعة",
      description:
        "فريق الدعم لدينا متاح 24/7 لمساعدتك في أي استفسار أو مشكلة قد تواجهها. نحن هنا لضمان تجربة سفر سلسة وممتعة.",
      image: "/photos/why-wadiny.png",
      buttonText: "تواصل معنا",
      buttonLink: "/contact",
    },
    {
      id: 3,
      title: "أسعار تنافسية وعروض حصرية",
      description:
        "احصل على أفضل الأسعار والعروض الحصرية على جميع وسائل النقل. نقدم لك خيارات متعددة تناسب ميزانيتك مع الحفاظ على جودة الخدمة.",
      image: "/photos/why-wadiny.png",
      buttonText: "عرض العروض",
      buttonLink: "/offers",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className=" mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            لماذا ودينى؟
          </h2>
          <p className="text-gray-700 text-base md:text-lg max-w-4xl leading-relaxed">
            هدفنا نخلي كل رحلة تجربة سهلة ومريحة، من أول ضغطة حجز لين توصل
            بالسلامة وعشان كذا صممنا المنصة بخدمات تدعمك في كل خطوة بطريقك، عشان
            تعيش تجربة سفر بدون تعقيد.{" "}
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="why-wodini-swiper"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <div className="relative bg-[#fbf2f2] rounded-[60px] overflow-hidden p-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
                    {/* Image - Right Side */}
                    <div className="md:col-span-5">
                      <div className="relative h-[250px] md:h-[350px] lg:h-[400px] w-full">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover rounded-[60px]"
                          priority={index === 0}
                        />
                      </div>
                    </div>

                    {/* Text Content - Left Side */}
                    <div className="md:col-span-7 p-8 md:p-12 md:pr-16">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight border-b border-white/20 ">
                        {slide.title}
                      </h3>
                      <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8 ">
                        {slide.description}
                      </p>
                      <Button
                        type="primary"
                        size="large"
                        href={slide.buttonLink}
                      >
                        {slide.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons - Bottom Left */}
          <div className="flex items-center gap-3 mt-6 justify-start">
            {/* Next Button - Filled Red */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 rounded-full bg-[#C41E3A] text-white flex items-center justify-center hover:bg-[#A01830] transition-all duration-300 shadow-md"
              aria-label="Next slide"
            >
              <FiChevronRight className="text-xl" />
            </button>

            {/* Previous Button - White with Border */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-12 h-12 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-md border-2 border-gray-200"
              aria-label="Previous slide"
            >
              <FiChevronLeft className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
