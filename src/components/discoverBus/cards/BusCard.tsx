"use client";

import { useRef, useState } from "react";
import { Button } from "antd";
import { FaStar, FaChevronLeft, FaWifi, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { MdOutlineAirlineSeatReclineNormal, MdOutlineAccessible, MdOutlineLocationOn } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { LuLuggage } from "react-icons/lu";
import { TbChartBar } from "react-icons/tb";
import { PiBusBold } from "react-icons/pi";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { BusResult, BusAmenity } from "@/app/[locale]/_types/Bus";

// ─── Amenity map ─────────────────────────────────────────────────────────────

const AMENITIES: Record<BusAmenity, { icon: React.ReactNode; label: string }> = {
  seat:       { icon: <MdOutlineAirlineSeatReclineNormal size={16} />, label: "مقاعد مريحة" },
  wifi:       { icon: <FaWifi size={15} />,                            label: "واي فاي" },
  ac:         { icon: <IoTimeOutline size={16} />,                     label: "تكييف" },
  accessible: { icon: <MdOutlineAccessible size={16} />,               label: "ذوي الاحتياجات" },
  luggage:    { icon: <LuLuggage size={16} />,                         label: "أمتعة" },
};

// ─── Stop picker ─────────────────────────────────────────────────────────────

interface StopPickerProps {
  city: string;
  neighborhoods: { id: string; name: string }[];
  selected: string;
  onSelect: (id: string) => void;
}

const StopPicker = ({ city, neighborhoods, selected, onSelect }: StopPickerProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-3 bg-white rounded-2xl p-3">
      {/* Header: city label ↔ nav arrows */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MdOutlineLocationOn className="text-primary shrink-0" size={14} />
          <span>من: <strong className="text-gray-800">{city}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity">
            <FaChevronLeft size={11} className="rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-400 flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
            <FaChevronLeft size={11} className="rotate-180 rtl:rotate-0" />
          </button>
        </div>
      </div>

      {/* Neighborhood pills — 5 equal-width slides */}
      <div className="overflow-hidden w-full">
      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        slidesPerView={5}
        spaceBetween={8}
        dir="rtl"
        className="w-full">
        {neighborhoods.map((n) => (
          <SwiperSlide key={n.id} className="!h-auto">
            <button
              type="button"
              onClick={() => onSelect(n.id)}
              className={`w-full py-2 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${
                selected === n.id
                  ? "bg-primary/10 text-primary border-primary"
                  : "bg-white text-gray-400 border-gray-200"
              }`}>
              {n.name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </div>
  );
};

// ─── Bus Card ─────────────────────────────────────────────────────────────────

export const BusCard = ({ bus }: { bus: BusResult }) => {
  const [fromStop, setFromStop] = useState(bus.from.neighborhoods[0]?.id ?? "");
  const [toStop, setToStop] = useState(bus.to.neighborhoods[0]?.id ?? "");

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(bus.images.length <= 1);
  const syncNav = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const id = bus.id.slice(0, 16);

  return (
    <div className="w-full bg-red-50 rounded-[20px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow px-[18px] py-[28px] space-y-4">

      {/* ── Top Row ────────────────────────────────────────────────────────── */}
      {/*  RTL order: [image] | [info + timeline] | [price]                    */}
      <div className="flex flex-col md:flex-row gap-5">

        {/* 1 ── Image swiper (rightmost in RTL) ─────────────────────────── */}
        <div className="relative shrink-0 w-full md:w-[180px] h-[180px] sm:h-[300px] md:h-[140px] rounded-lg overflow-hidden bg-[#F7F7F7]">
          {bus.images.length > 0 ? (
            <>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  nextEl: `.bus-next-${id}`,
                  prevEl: `.bus-prev-${id}`,
                }}
                pagination={{
                  el: `.bus-dots-${id}`,
                  clickable: false,
                  bulletClass: "swiper-pagination-bullet !w-1 !h-1 !bg-white",
                  bulletActiveClass: "swiper-pagination-bullet-active !w-3 !rounded-md",
                }}
                loop={false}
                onSwiper={syncNav}
                onSlideChange={syncNav}
                className="w-full h-full">
                {bus.images.map((img, i) => (
                  <SwiperSlide key={i} className="relative h-[180px] sm:h-[300px] md:h-[140px]">
                    <Image src={img} alt={`${bus.companyName} ${i + 1}`} fill className="object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Pagination dots */}
              <div className={`bus-dots-${id} absolute !left-1/2 !bottom-2 -translate-x-1/2 z-10 flex items-center justify-center gap-1.5`} />

              {/* Next arrow */}
              <button
                type="button"
                className={`bus-next-${id} absolute end-2 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-all duration-200 ${isEnd ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <FaArrowLeft className="text-gray-600 text-sm ltr:rotate-180" />
              </button>

              {/* Prev arrow */}
              <button
                type="button"
                className={`bus-prev-${id} absolute start-2 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-all duration-200 ${isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <FaArrowRight size={12} className="text-gray-600 ltr:rotate-180" />
              </button>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-200">
              <PiBusBold size={56} />
            </div>
          )}
        </div>

        {/* 2 ── Company info + Timeline (center, flex-1) ─────────────────── */}
        <div className="flex-1 flex flex-col justify-between min-w-0">

          {/* Company: logo + name + rating — all in one row */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative w-[50px] h-[50px] shrink-0 rounded-full overflow-hidden border border-gray-100 bg-[#F7F7F7]">
              <Image src={bus.companyLogo} alt={bus.companyName} fill className="object-contain p-1" />
            </div>
            <p className="font-medium text-xl text-gray-900">{bus.companyName}</p>
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400" size={15} />
              <span className="text-sm text-gray-500 font-medium">({bus.rating})</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-4">
            {/* Departure */}
            <div className="text-center shrink-0">
              <p className="text-sm font-medium text-gray-900 leading-none">{bus.departureTime}</p>
              <p className="text-[10px] text-gray-400 mt-1">{bus.departureDate}</p>
            </div>

            {/* Bus icon + line + duration */}
            <div className="flex-1 flex flex-col items-center gap-1.5">
              <PiBusBold className="text-primary" size={28} />
              <div className="w-full flex items-center">
                <div className="w-2 h-2 rounded-full shrink-0 bg-white border-2 border-gray-300" />
                <div className="flex-1 h-px bg-gray-200" />
                <div className="w-2 h-2 rounded-full shrink-0 bg-primary border-2 border-primary/20" />
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 bg-white rounded-full px-2 py-0.5 shadow-sm border border-gray-100">
                <IoTimeOutline size={13} />
                <span>{bus.duration}</span>
              </div>
            </div>

            {/* Arrival + station link */}
            <div className="text-center shrink-0">
              <p className="text-sm font-medium text-gray-900 leading-none">{bus.arrivalTime}</p>
              <p className="text-[10px] text-gray-400 mt-1">{bus.arrivalDate}</p>
            </div>
          </div>
        </div>

        {/* 3 ── Price boxes (leftmost in RTL) — only when classes provided ── */}
        {bus.classes && bus.classes.length > 0 && (
          <div className="flex sm:flex-col gap-3 shrink-0 sm:justify-center border-t sm:border-t-0 sm:border-s border-gray-100">
            {bus.classes.map((cls) => (
              <div
                key={cls.name}
                className="border border-gray-200 rounded-xl px-4 py-3 min-w-[130px] bg-white">
                <p className={`text-sm font-bold mb-1 ${cls.isFeatured ? "text-[#E07B2A]" : "text-gray-700"}`}>
                  {cls.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-bold text-gray-900 leading-none">{cls.price}</p>
                  <p className="text-[11px] text-gray-400">{cls.currency} / مقعد</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Stop Pickers ───────────────────────────────────────────────────── */}
      <div className="py-4 flex flex-col md:flex-row gap-4">
        <StopPicker city={bus.from.city} neighborhoods={bus.from.neighborhoods} selected={fromStop} onSelect={setFromStop} />
        <div className="hidden sm:block w-px bg-gray-100 self-stretch" />
        <StopPicker city={bus.to.city} neighborhoods={bus.to.neighborhoods} selected={toStop} onSelect={setToStop} />
      </div>

      {/* ── Bottom Bar ─────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between gap-4 flex-wrap">
        {/* Trip features — display only */}
        <div className="flex items-center gap-3">
          {(Object.keys(AMENITIES) as BusAmenity[]).map((a) => {
            const active = bus.amenities.includes(a);
            return (
              <span
                key={a}
                title={AMENITIES[a].label}
                className={active ? "text-primary" : "text-gray-300"}>
                {AMENITIES[a].icon}
              </span>
            );
          })}
        </div>
        <div className="flex items-center gap-[10px]">
          <div className="flex items-center gap-1.5 text-gray-500">
            <TbChartBar className="text-primary" size={16} />
            <span className="text-xs font-medium">متبقي {bus.seatsRemaining} مقاعد</span>
          </div>
          <Button type="primary" className="!py-2 !px-5 !h-auto !rounded-xl !text-sm !font-bold flex items-center gap-2">
            اختيار مقعد
            <FaChevronLeft size={11} className="ltr:rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
};
