"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { useLocale, useTranslations } from "next-intl";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import "swiper/css";

interface WhyWodiniSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

export const WhyWodiniSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("homePage.whyWodini");
  const getLink = useLocalizedLink();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleMediaQueryChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsLargeScreen(event.matches);
    };

    handleMediaQueryChange(mediaQuery);

    const listener = (event: MediaQueryListEvent) => {
      handleMediaQueryChange(event);
    };

    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  const slides: WhyWodiniSlide[] = [
    {
      id: 1,
      title: t("slides.1.title"),
      description: t("slides.1.description"),
      image: "/photos/why-wadiny.png",
      buttonText: t("slides.1.buttonText"),
      buttonLink: "/explore",
    },
    {
      id: 2,
      title: t("slides.2.title"),
      description: t("slides.2.description"),
      image: "/photos/why-wadiny.png",
      buttonText: t("slides.2.buttonText"),
      buttonLink: "/contact",
    },
    {
      id: 3,
      title: t("slides.3.title"),
      description: t("slides.3.description"),
      image: "/photos/why-wadiny.png",
      buttonText: t("slides.3.buttonText"),
      buttonLink: "/offers",
    },
    {
      id: 4,
      title: t("slides.1.title"),
      description: t("slides.1.description"),
      image: "/photos/why-wadiny.png",
      buttonText: t("slides.1.buttonText"),
      buttonLink: "/discover",
    },
  ];

  const indicatorSlots = 4;
  const direction = isLargeScreen ? "vertical" : "horizontal";

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className=" mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-700 text-base md:text-lg max-w-4xl leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="relative rounded-[40px] md:rounded-[56px] bg-[#FBF2F2] p-5 md:p-8 lg:p-10">
          <div className={`relative ${isLargeScreen ? "lg:pe-16" : ""}`}>
            {/* Left custom progress indicator */}
            <div className="absolute left-0 top-1/2 z-[1] hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
              <div className="flex flex-col items-center gap-2">
                {Array.from({ length: indicatorSlots }).map((_, index) => (
                  <button
                    key={`why-wodini-dot-${index}`}
                    type="button"
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    className={`rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? "h-14 w-1.5 bg-[#C41E3A]"
                        : "h-5 w-1 bg-white border border-[#E9D9D9]"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <Swiper
              modules={[Autoplay]}
              direction={direction}
              key={direction}
              spaceBetween={18}
              slidesPerView={1}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setActiveIndex(swiper.realIndex % indicatorSlots);
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex % indicatorSlots);
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="why-wodini-swiper h-[500px] md:h-[380px] lg:h-[420px]"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={slide.id}>
                  <div className="relative h-full rounded-[28px] md:rounded-[36px] bg-transparent overflow-hidden">
                    <div className="grid h-full grid-cols-1 md:grid-cols-12 items-center gap-5 md:gap-8">
                      {/* Text Content */}
                      <div className="md:col-span-7 p-2 md:p-4 lg:ps-8">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight border-b border-[#EFDCDC] pb-4">
                          {slide.title}
                        </h3>
                        <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed mb-7">
                          {slide.description}
                        </p>
                        <Button
                          type="primary"
                          size="large"
                          href={getLink(slide.buttonLink)}
                          className="!h-12 !px-9 !rounded-xl"
                        >
                          {slide.buttonText}
                        </Button>
                      </div>

                      {/* Image */}
                      <div className="md:col-span-5">
                        <div className="relative h-[220px] md:h-[300px] lg:h-[340px] w-full">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover rounded-[28px] md:rounded-[32px]"
                            priority={index === 0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-5 flex items-center justify-center gap-2 lg:hidden">
              {Array.from({ length: indicatorSlots }).map((_, index) => (
                <button
                  key={`why-wodini-mobile-dot-${index}`}
                  type="button"
                  onClick={() => swiperRef.current?.slideToLoop(index)}
                  className={`rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "h-1.5 w-10 bg-[#C41E3A]"
                      : "h-1.5 w-5 border border-[#E9D9D9] bg-white"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Custom Navigation Buttons - Bottom Edge */}
            <div className="mt-5 flex items-center justify-center md:justify-end gap-3">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-12 h-12 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-sm border border-gray-200"
                aria-label={t("navigation.previousSlide")}
              >
                {isArabic ? (
                  <FiChevronRight className="text-xl" />
                ) : (
                  <FiChevronLeft className="text-xl" />
                )}
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-12 h-12 rounded-full bg-[#C41E3A] text-white flex items-center justify-center hover:bg-[#A01830] transition-all duration-300 shadow-sm"
                aria-label={t("navigation.nextSlide")}
              >
                {isArabic ? (
                  <FiChevronLeft className="text-xl" />
                ) : (
                  <FiChevronRight className="text-xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
