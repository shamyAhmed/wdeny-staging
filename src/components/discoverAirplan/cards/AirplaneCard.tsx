"use client";
import { useState } from "react";
import { Button, Divider, Popover } from "antd";
import { FaChevronDown, FaPlane, FaSuitcase } from "react-icons/fa6";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import Image from "next/image";
import { TbPointFilled } from "react-icons/tb";
import { FlightDetailsModal } from "../modals/FlightDetailsModal";
import { useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "@/i18n/navigation";

interface FlightLegInfo {
  departureTime: string;
  departureCity: string;
  arrivalTime: string;
  arrivalCity: string;
  duration: string;
  date: string;
  flightNumber: string;
  class: string;
}

interface AirplaneCardProps {
  flight: {
    id: string;
    airline: string;
    airlineLogo: string;
    flightNumber: string;
    class: string;
    departureTime: string;
    departureCity: string;
    arrivalTime: string;
    arrivalCity: string;
    duration: string;
    price: number;
    currency: string;
    isRefundable: boolean;
    stops: string;
    date: string;
    returnFlight?: FlightLegInfo;
  };
}

type FlightInfoProps = {
  airline: string;
  flightNumber: string;
  flightClass: string;
  stops: string;
  flightInfo: FlightLegInfo;
};

export const FlightInfo = ({
  airline,
  flightNumber,
  flightClass,
  stops,
  flightInfo,
}: FlightInfoProps) => {
  const hasStop =
    Boolean(stops?.trim()) && !/direct|non-stop|مباشر/gi.test(stops);
  const stopCode = stops.match(/\(([^)]+)\)/)?.[1]?.trim() ?? "";
  const locale = useLocale();

  return (
    <div>
      <div className="flex items-center pt-[14px] justify-between mb-4">
        <span className="text-primary font-bold text-base flex items-center gap-2">
          عودة <span className="text-primary font-normal">على {flightInfo.date}</span>
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-10">
        <div className="flex items-center gap-4">
          <div className="flex gap-8">
            <div className="rounded-lg">
              <div className="relative shrink-0 size-[60px] bg-white rounded-sm flex items-center justify-center text-[8px] text-secondary">
                <Image
                  src="/images/saudi-airlines-logo.png"
                  alt="SA Logo"
                  fill
                />
              </div>
            </div>
            <div className="text-right sm:max-w-[80px] text-xs font-normal">
              <p className=" text-sm text-wrap">{airline}</p>
              <p className="text-xs text-gray-400">
                {flightNumber} . {flightClass}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex relative md:max-lg:min-h-[78px] md:max-lg:items-start">
          <div className="text-center min-w-[80px] md:max-lg:absolute md:max-lg:top-0 md:max-lg:start-0 md:max-lg:z-10">
            <p className="text-xl font-bold">{flightInfo.departureTime}</p>
            <p className="text-sm text-gray-500">{flightInfo.departureCity}</p>
          </div>
          <div className="flex-1 px-4 relative flex flex-col items-center justify-center md:max-lg:absolute md:max-lg:inset-x-0 md:max-lg:bottom-0 md:max-lg:px-0">
            <p className="text-xs text-gray-400 mb-1">{hasStop ? stopCode : ""}</p>

            <div className="w-full h-[1px] bg-gray-200 relative">
              <div className={`absolute top-1/2 -translate-y-[46%] start-0 ${locale === "ar" ? "translate-x-1/2" : "-translate-x-1/2"} `}>
                <TbPointFilled className="text-primary text-lg" size={20} />
              </div>
              {hasStop && (
                <Popover
                  trigger="hover"
                  placement="bottom"
                  overlayClassName="flight-stop-popover"
                  content={
                    <div className="rounded-[16px] bg-primary text-white text-center px-4 py-2 leading-tight">
                      <p className="text-xs font-semibold">50 دقيقة عبر</p>
                      <p className="text-base font-bold">{stopCode || "STOP"}</p>
                    </div>
                  }>
                  <button
                    type="button"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 border border-gray-300 h-[10px] rounded-lg min-w-14 text-[10px] text-[#666]">
                  </button>
                </Popover>
              )}
              <div className={`absolute top-1/2 -translate-y-[46%] end-0 ${locale === "ar" ? "translate-x-0" : "-translate-x-1/2"} `}>
                <FaPlane className="text-primary text-xs rotate-180" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">الوقت الكلي : {flightInfo.duration}</p>
          </div>

          <div className="text-center min-w-[80px] md:max-lg:absolute md:max-lg:top-0 md:max-lg:end-0 md:max-lg:z-10">
            <p className="text-xl font-bold">{flightInfo.arrivalTime}</p>
            <p className="text-sm text-gray-500">{flightInfo.arrivalCity}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AirplaneCard = ({ flight }: AirplaneCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const outboundFlightInfo: FlightLegInfo = {
    departureTime: flight.departureTime,
    departureCity: flight.departureCity,
    arrivalTime: flight.arrivalTime,
    arrivalCity: flight.arrivalCity,
    duration: flight.duration,
    date: flight.date,
    flightNumber: flight.flightNumber,
    class: flight.class,
  };

  const bundleOptions = [
    {
      id: `${flight.id}-light-flex`,
      title: "LIGHT FLEX",
      classLabel: "فئة الحجز: سياحية",
      route: `${flight.departureCity} - ${flight.arrivalCity}`,
      baggageAllowance: "Baggage Allowance : 1 * 20 Kg",
      cabinBaggage: "Cabin Baggage Allowance : 7kg",
      fareType: "غير قابل للاسترجاع",
      isChangeable: true,
      seatSelection: "اختيار مقعد مجاني",
      loyaltyPoints: "يضيف نقاط ولاء",
      price: flight.price,
      currency: flight.currency,
    },
    {
      id: `${flight.id}-light`,
      title: "LIGHT",
      classLabel: "فئة الحجز: سياحية",
      route: `${flight.departureCity} - ${flight.arrivalCity}`,
      baggageAllowance: "Baggage Allowance : 1 * 20 Kg",
      cabinBaggage: "Cabin Baggage Allowance : 7kg",
      fareType: "غير قابل للاسترجاع",
      isChangeable: true,
      seatSelection: "اختيار مقعد مدفوع",
      loyaltyPoints: "يضيف نقاط ولاء",
      price: Number((flight.price * 0.96).toFixed(2)),
      currency: flight.currency,
    },
    {
      id: `${flight.id}-basic`,
      title: "BASIC ECO",
      classLabel: "فئة الحجز: سياحية",
      route: `${flight.departureCity} - ${flight.arrivalCity}`,
      baggageAllowance: "Baggage Allowance : 1 * 15 Kg",
      cabinBaggage: "Cabin Baggage Allowance : 7kg",
      fareType: "غير قابل للاسترجاع",
      isChangeable: false,
      seatSelection: "اختيار مقعد مدفوع",
      loyaltyPoints: "لا يضيف نقاط ولاء",
      price: Number((flight.price * 0.92).toFixed(2)),
      currency: flight.currency,
    },
  ];

  return (
    <div className="airplane-card bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm mb-6">
      <div className="flex flex-col min-[896px]:flex-row">
        {/* Main Content */}
        <div className="flex-1 px-5 py-4">
          <FlightInfo
            airline={flight.airline}
            flightNumber={flight.flightNumber}
            flightClass={flight.class}
            stops={flight.stops}
            flightInfo={outboundFlightInfo}
          />

          {/* Return flight if exists */}
          {flight.returnFlight && (
            <FlightInfo
              airline={flight.airline}
              flightNumber={flight.flightNumber}
              flightClass={flight.class}
              stops={flight.stops}
              flightInfo={flight.returnFlight}
            />
          )}
        </div>

        {/* Pricing Actions */}
        <div
          className={`flex flex-col h-full  ${flight.returnFlight ? "min-h-[300px]" : "min-h-[200px]"}`}>
          <div className="w-full flex-1 min-[896px]:w-[220px] bg-primary flex flex-col items-center justify-center p-6 text-white text-center relative">
            <p className="text-lg font-bold mb-1">
              {flight.price} {flight.currency}
            </p>
            <p className="text-[12px] opacity-80 mb-4 font-bold">
              قابل للاسترجاع
            </p>
            <p className="text-[12px]  mb-4">الطيران السعودي</p>
            <Button
              onClick={() => setExpanded(!expanded)}
              className="w-full !border-none rounded-xl !bg-[#936037] !text-white hover:!text-primary font-bold h-10 hover:!bg-gray-100">
              اختيار الرحلة
            </Button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center font-bold text-center gap-1 text-md opacity-90 hover:opacity-100 transition-opacity bg-[#E9EDF0] w-full h-[40px]">
            تفاصيل الرحلة
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="bg-[#FBFAFA] p-8 border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="relative px-6 py-5">
            <button
              type="button"
              className={`bundle-prev-${flight.id} absolute top-1/2 -translate-y-1/2 start-3 z-10 h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center shadow-sm`}>
              <FaChevronDown className="-rotate-90" />
            </button>
            <button
              type="button"
              className={`bundle-next-${flight.id} absolute top-1/2 -translate-y-1/2 end-3 z-10 h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center shadow-sm`}>
              <FaChevronDown className="rotate-90" />
            </button>

            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                992: {
                  slidesPerView: 2,
                },
              }}
              navigation={{
                prevEl: `.bundle-prev-${flight.id}`,
                nextEl: `.bundle-next-${flight.id}`,
              }}
              className="!px-8">
              {bundleOptions.map((bundle) => (
                <SwiperSlide key={bundle.id}>
                  <div className="bg-[#F9F9FA] rounded-[22px] overflow-hidden border border-[#CFCFD3] h-full">
                    <div className="bg-[#EFE5E7] px-5 py-4 text-start border-b border-dashed border-[#CFCFD3]">
                      <h5 className="font-bold text-[22px] leading-none mb-1">{bundle.title}</h5>
                      <p className="text-[13px] text-[#666]">{bundle.classLabel}</p>
                    </div>

                    <div className="px-5 py-4">
                      <div className="flex items-center justify-start mb-3 text-start">
                        <span className="font-normal text-base text-[#4B5563]">{bundle.route}</span>
                      </div>

                      <Divider dashed className="!my-3 !border-gray-300" />

                      <div className="flex flex-col gap-4 text-start items-start">
                        <div>
                          <div className="flex items-center justify-start mb-2">
                            <span className="text-base font-bold text-[#2D3748]">
                              الوزن المسموح به
                            </span>
                          </div>
                          <p className="text-xs text-[#7C7C80] leading-relaxed text-start">
                            {bundle.baggageAllowance}
                            <IoCheckmarkCircle className="inline text-green-600 text-base ms-2" />
                          </p>
                          <p className="text-xs text-[#7C7C80] leading-relaxed text-start mt-1">
                            {bundle.cabinBaggage}
                            <IoCheckmarkCircle className="inline text-green-600 text-base ms-2" />
                          </p>
                        </div>

                        <div>
                          <span className="text-base text-[#2D3748] font-bold">نوع السعر</span>
                          <p className="text-sm text-[#8D8D92] font-medium flex items-center gap-1 mt-1">
                            {bundle.fareType}
                            <IoCloseCircle className="text-base text-red-500" />
                          </p>
                        </div>

                        <div>
                          <span className="text-base text-[#2D3748] font-bold">قابل للتغيير</span>
                          <p className="text-sm text-[#8D8D92] font-medium flex items-center gap-1 mt-1">
                            {bundle.isChangeable ? "قابل للتغيير" : "غير قابل للتغيير"}
                            {bundle.isChangeable ? (
                              <IoCheckmarkCircle className="text-base text-green-600" />
                            ) : (
                              <IoCloseCircle className="text-base text-red-500" />
                            )}
                          </p>
                        </div>

                        <div>
                          <span className="text-base text-[#2D3748] font-bold">اختيار المقعد</span>
                          <p className="text-sm text-[#8D8D92] font-medium flex items-center gap-1 mt-1">
                            {bundle.seatSelection}
                            {bundle.seatSelection.includes("مجاني") ? (
                              <IoCheckmarkCircle className="text-base text-green-600" />
                            ) : (
                              <IoCloseCircle className="text-base text-red-500" />
                            )}
                          </p>
                        </div>

                        <div>
                          <span className="text-base text-[#2D3748] font-bold">نقاط الولاء</span>
                          <p className="text-sm text-[#8D8D92] font-medium flex items-center gap-1 mt-1">
                            {bundle.loyaltyPoints}
                            {bundle.loyaltyPoints.includes("لا") ? (
                              <IoCloseCircle className="text-base text-red-500" />
                            ) : (
                              <IoCheckmarkCircle className="text-base text-green-600" />
                            )}
                          </p>
                        </div>
                      </div>

                      <Divider dashed className="!my-4 !border-gray-300" />

                      <div className="flex flex-col items-center gap-3 pb-1">
                        <p className="text-[30px] font-semibold text-[#101010] leading-none">
                          {bundle.price}
                          <span className="text-sm font-medium text-[#6B7280] ms-2">
                            {bundle.currency}
                          </span>
                        </p>
                        <Link href="/discover-airplan/booking">
                          <Button
                            type="primary"
                            className="!h-11 !px-10 !rounded-full !font-bold !text-base !bg-primary !text-white !border !border-primary hover:!bg-white hover:!text-primary">
                            احجز الان
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* Flight Details Modal */}
      <FlightDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        flight={flight}
      />
    </div>
  );
};
