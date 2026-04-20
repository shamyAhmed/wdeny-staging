"use client";

import { useState } from "react";
import { Button } from "antd";
import { FaArrowLeft, FaArrowRight, FaStar, FaShare } from "react-icons/fa";
import { FaCalendarDays, FaClock, FaChevronLeft } from "react-icons/fa6";
import { MdDirectionsCar } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BsCheckCircleFill } from "react-icons/bs";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { PrivateTrip } from "@/app/[locale]/_types/PrivateTrip";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/appStore";
import { setSelectedPrivateTrip } from "@/store/slices/private/privateTripSlice";
import { useRouter } from "@/i18n/navigation";

const MOCK_FEATURES: Record<string, string[]> = {
  SUV:     ["محرك 2000 سي سي", "7 مقاعد", "مريحة للرحلات الطويلة", "نظام تعليق مريح", "أوتوماتيك", "مكيف هواء"],
  Sedan:   ["محرك 1800 سي سي", "4 مقاعد", "مريحة للرحلات الطويلة", "نظام تعليق مريح", "أوتوماتيك", "مكيف هواء"],
  Van:     ["محرك 2500 سي سي", "12 مقعد", "مريحة للرحلات الطويلة", "مساحة واسعة", "أوتوماتيك", "مكيف هواء"],
  default: ["مريحة للرحلات الطويلة", "نظام تعليق مريح", "مقاعد قابلة للاستلقاء", "أوتوماتيك", "مكيف هواء", "نظافة عالية"],
};

const getFeatures = (trip: PrivateTrip) => {
  const type = trip.bus.type?.name_en ?? "default";
  return MOCK_FEATURES[type] ?? MOCK_FEATURES.default;
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("ar-EG", { weekday: "long", day: "numeric", month: "long" });

export const PrivateCard = ({ trip }: { trip: PrivateTrip }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd]             = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router   = useRouter();

  const id       = String(trip.id);
  const images   = trip.bus.images?.length > 0 ? trip.bus.images : [];
  const features = getFeatures(trip);

  const syncNav = (s: SwiperType) => {
    setIsBeginning(s.isBeginning);
    setIsEnd(s.isEnd);
  };

  return (
    <div className="w-full bg-red-50 rounded-[20px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow px-[18px] py-[24px]">
      <div className="flex flex-col lg:flex-row gap-5">

        {/* 1 ── Image swiper ───────────────────────────────────────────────── */}
        <div className="relative shrink-0 w-full lg:w-[20%] lg:min-w-[185px] min-h-[200px] self-stretch rounded-[12px] overflow-hidden bg-[#F7F7F7]">
          {images.length > 0 ? (
            <>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  nextEl: `.priv-next-${id}`,
                  prevEl: `.priv-prev-${id}`,
                }}
                pagination={{
                  el: `.priv-dots-${id}`,
                  clickable: false,
                  bulletClass: "swiper-pagination-bullet !w-2 !h-2 !bg-white !opacity-60 !rounded-full",
                  bulletActiveClass: "swiper-pagination-bullet-active !w-2 !h-2 !opacity-100 !rounded-full",
                }}
                loop={images.length > 1}
                onSwiper={syncNav}
                onSlideChange={syncNav}
                className="w-full h-full">
                {images.map((img, i) => (
                  <SwiperSlide key={i} className="relative w-full h-full">
                    <Image src={img} alt={`${trip.bus.name} ${i + 1}`} fill className="object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className={`priv-dots-${id} absolute !left-1/2 !bottom-2 -translate-x-1/2 z-10 flex items-center justify-center gap-1.5`} />

              <button
                type="button"
                className={`priv-next-${id} absolute end-2 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-all duration-200 ${isEnd ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <FaArrowLeft size={11} className="text-gray-600 ltr:rotate-180" />
              </button>

              <button
                type="button"
                className={`priv-prev-${id} absolute start-2 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-all duration-200 ${isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <FaArrowRight size={11} className="text-gray-600 ltr:rotate-180" />
              </button>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-200">
              <MdDirectionsCar size={56} />
            </div>
          )}
        </div>

        {/* 2 ── Journey information ────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-between gap-5 min-w-0">

          {/* Company info + rating */}
          <div className="flex items-center gap-3">
            <div className="relative w-[50px] h-[50px] shrink-0 rounded-full overflow-hidden border border-gray-100 bg-[#F7F7F7]">
              {trip.company_logo ? (
                <Image src={trip.company_logo} alt={trip.company_name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <MdDirectionsCar size={22} className="text-gray-300" />
                </div>
              )}
            </div>
            <p className="font-bold text-base text-gray-900">شركة {trip.company_name}</p>
            <div className="flex items-center gap-1">
              <FaStar size={12} className="text-amber-400" />
              <span className="text-xs font-semibold text-gray-600">4.5</span>
            </div>
            <span className="ms-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg shrink-0">
              {trip.bus.type?.name_ar ?? trip.bus.name}
            </span>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {features.map((f) => (
              <span key={f} className="flex items-center gap-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-full px-3 py-1">
                <BsCheckCircleFill size={14} className="text-gray-400 shrink-0" />
                {f}
              </span>
            ))}
          </div>

          {/* Date + time */}
          <div className="flex items-center gap-3 pt-2">
            <span className="flex items-center gap-1.5 text-sm text-gray-500 bg-white border border-gray-200 rounded-full px-3 py-1">
              <FaCalendarDays size={14} className="text-gray-400" />
              {formatDate(trip.date)}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-500 bg-white border border-gray-200 rounded-full px-3 py-1">
              <FaClock size={14} className="text-gray-400" />
              10:00 صباحاً
            </span>
          </div>
        </div>

        {/* 3 ── Price panel ────────────────────────────────────────────────── */}
        <div className="shrink-0 flex flex-col justify-between items-center gap-4 border border-gray-200 bg-white rounded-xl px-[12px] py-[16px] text-center space-y-4 min-w-[20%]">
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-1">سعر الرحلة</p>
            <div className="flex items-center gap-1 flex-wrap justify-center">
              <span className="text-xl font-semibold text-primary leading-none">{trip.go_price}</span>
              <span className="text-xs text-gray-400 leading-tight whitespace-nowrap">ريال سعودي / مقعد</span>
            </div>
            {trip.rounded && trip.round_price > 0 && (
              <p className="text-xs text-gray-400 mt-1">ذهاب وعودة: {trip.round_price} ر.س</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button
              type="primary"
              className="!w-full !h-[44px] !rounded-xl !font-bold !text-sm flex items-center justify-center gap-2"
              onClick={() => {
                dispatch(setSelectedPrivateTrip(trip));
                router.push(`/discover-private/${trip.id}`);
              }}>
              <FaChevronLeft size={12} className="rtl:rotate-180" />
              احجز رحلتك الآن
            </Button>

            <div className="flex items-center gap-[8px] mt-1">
              <button type="button" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors border border-gray-200 rounded-full p-[10px]">
                <IoInformationCircleOutline size={16} />
                التفاصيل
              </button>
              <button type="button" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors border border-gray-200 rounded-full p-[10px]">
                <FaShare size={13} />
                مشاركة
              </button>
            </div>
          </div>

          <p className="text-[11px] text-green-500 font-medium flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
            متوفر أقل من الحجز
          </p>
        </div>

      </div>
    </div>
  );
};
