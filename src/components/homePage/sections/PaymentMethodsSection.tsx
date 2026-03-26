"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";

interface PaymentMethod {
  id: number;
  name: string;
  logo: string;
}

export const PaymentMethodsSection = () => {
  const swiperRef = useRef<SwiperType>();

  const paymentMethods: PaymentMethod[] = [
    {
      id: 1,
      name: "Tabby | Tamara",
      logo: "/icons/payment-methods/apple-pay.png",
    },
    {
      id: 2,
      name: "Visa",
      logo: "/icons/payment-methods/apple-pay.png",
    },
    {
      id: 3,
      name: "Apple Pay",
      logo: "/icons/payment-methods/apple-pay.png",
    },
    {
      id: 4,
      name: "Mada",
      logo: "/icons/payment-methods/apple-pay.png",
    },
    {
      id: 5,
      name: "STC Pay",
      logo: "/icons/payment-methods/apple-pay.png",
    },
    {
      id: 6,
      name: "Moyasar",
      logo: "/icons/payment-methods/apple-pay.png",
    },
  ];

  return (
    <section className="py-16 bg-[#FBFBFD]">
      <div className="container">
        <div className=" bg-white rounded-[28px] p-10">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              وسائل دفع آمنة ومريحة
            </h2>
            <p className="text-gray-700 text-base md:text-lg max-w-4xl leading-relaxed">
              هدفنا نخلي كل رحلة تجربة مريحة مسلسلة، من أول ضغطة حجز لين توصل
              بالسلامة وعشان كذا صممنا المنصة
              <br />
              بخدمات تدعمك في كل خطوة بطريقتك، عشان تستمتع برحلة بدون أي تعقيد
            </p>
          </div>

          {/* Payment Methods Carousel */}
          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={2}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              dir="rtl"
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 24,
                },
              }}
              className="payment-methods-swiper"
            >
              {paymentMethods.map((method) => (
                <SwiperSlide key={method.id}>
                  <div className="bg-[#F7F7F7] rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center h-32 md:h-36">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={method.logo}
                        alt={method.name}
                        width={150}
                        height={60}
                        className="object-contain max-w-full max-h-full"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="flex items-center gap-3 mt-8 justify-center">
              {/* Next Button - Filled Red */}
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-[#A01830] transition-all duration-300 shadow-md"
                aria-label="Next"
              >
                <FiChevronRight className="text-xl" />
              </button>

              {/* Previous Button - White with Border */}
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-12 h-12 rounded-full bg-white text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-md border-2 border-gray-200"
                aria-label="Previous"
              >
                <FiChevronLeft className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
